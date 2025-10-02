const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5500',
        'https://musical-unicorn-cd83ea.netlify.app',  // Your Netlify frontend URL
        'https://jeelan80.github.io'  // Replace with your GitHub Pages URL if needed
    ]
}));
app.use(express.json());

// Spoonacular API configuration
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        message: 'Recipe Finder Backend API is running!',
        endpoints: {
            'GET /': 'Health check',
            'GET /api/recipes/search': 'Search recipes by ingredients',
            'GET /api/recipes/:id': 'Get recipe details by ID'
        }
    });
});

// Search recipes by ingredients
app.get('/api/recipes/search', async (req, res) => {
    try {
        const { ingredients, number = 12 } = req.query;
        
        if (!ingredients) {
            return res.status(400).json({ 
                error: 'Ingredients parameter is required' 
            });
        }

        if (!SPOONACULAR_API_KEY) {
            return res.status(500).json({ 
                error: 'API key not configured' 
            });
        }

        const url = `${SPOONACULAR_BASE_URL}/findByIngredients?ingredients=${ingredients}&number=${number}&ranking=1&ignorePantry=true&apiKey=${SPOONACULAR_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Spoonacular API error: ${response.status} ${response.statusText}`);
        }
        
        const recipes = await response.json();
        
        // Transform the data to include only what we need
        const transformedRecipes = recipes.map(recipe => ({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            usedIngredients: recipe.usedIngredients?.map(ing => ({
                name: ing.name,
                original: ing.original
            })) || [],
            missedIngredients: recipe.missedIngredients?.map(ing => ({
                name: ing.name,
                original: ing.original
            })) || [],
            usedIngredientCount: recipe.usedIngredientCount || 0,
            missedIngredientCount: recipe.missedIngredientCount || 0
        }));
        
        res.json(transformedRecipes);
        
    } catch (error) {
        console.error('Error searching recipes:', error);
        res.status(500).json({ 
            error: 'Failed to search recipes',
            message: error.message 
        });
    }
});

// Get recipe details by ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!SPOONACULAR_API_KEY) {
            return res.status(500).json({ 
                error: 'API key not configured' 
            });
        }

        const url = `${SPOONACULAR_BASE_URL}/${id}/information?apiKey=${SPOONACULAR_API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Spoonacular API error: ${response.status} ${response.statusText}`);
        }
        
        const recipe = await response.json();
        
        // Transform the data to include only what we need
        const transformedRecipe = {
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            readyInMinutes: recipe.readyInMinutes,
            servings: recipe.servings,
            pricePerServing: recipe.pricePerServing,
            summary: recipe.summary,
            instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => ({
                number: step.number,
                step: step.step
            })) || [],
            sourceUrl: recipe.sourceUrl,
            spoonacularSourceUrl: recipe.spoonacularSourceUrl
        };
        
        res.json(transformedRecipe);
        
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        res.status(500).json({ 
            error: 'Failed to fetch recipe details',
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something went wrong!',
        message: err.message 
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ 
        error: 'Endpoint not found' 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Recipe Finder Backend running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}`);
});

module.exports = app;