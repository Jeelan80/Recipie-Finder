class RecipeFinder {
    constructor() {
        this.ingredients = [];
        // Use configuration from config.js
        this.backendURL = window.APP_CONFIG.backendURL;
        
        this.initializeElements();
        this.bindEvents();
    }

    initializeElements() {
        this.ingredientInput = document.getElementById('ingredientInput');
        this.addIngredientBtn = document.getElementById('addIngredient');
        this.ingredientsTags = document.getElementById('ingredientsTags');
        this.findRecipesBtn = document.getElementById('findRecipes');
        this.loading = document.getElementById('loading');
        this.recipesSection = document.getElementById('recipesSection');
        this.recipesGrid = document.getElementById('recipesGrid');
    }

    bindEvents() {
        this.addIngredientBtn.addEventListener('click', () => this.addIngredient());
        this.ingredientInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addIngredient();
        });
        this.findRecipesBtn.addEventListener('click', () => this.findRecipes());
    }

    addIngredient() {
        const ingredient = this.ingredientInput.value.trim().toLowerCase();
        
        if (!ingredient) {
            this.showMessage('Please enter an ingredient', 'error');
            return;
        }

        if (this.ingredients.includes(ingredient)) {
            this.showMessage('Ingredient already added', 'warning');
            return;
        }

        this.ingredients.push(ingredient);
        this.ingredientInput.value = '';
        this.updateIngredientsDisplay();
        this.updateFindButton();
    }

    removeIngredient(ingredient) {
        this.ingredients = this.ingredients.filter(item => item !== ingredient);
        this.updateIngredientsDisplay();
        this.updateFindButton();
    }

    updateIngredientsDisplay() {
        this.ingredientsTags.innerHTML = '';
        
        this.ingredients.forEach(ingredient => {
            const tag = document.createElement('div');
            tag.className = 'ingredient-tag';
            tag.innerHTML = `
                <span>${ingredient}</span>
                <button class="remove-ingredient" onclick="recipeFinder.removeIngredient('${ingredient}')">×</button>
            `;
            this.ingredientsTags.appendChild(tag);
        });
    }

    updateFindButton() {
        this.findRecipesBtn.disabled = this.ingredients.length === 0;
    }

    async findRecipes() {
        if (this.ingredients.length === 0) return;

        this.showLoading(true);
        this.recipesSection.style.display = 'none';

        try {
            const ingredientsString = this.ingredients.join(',');
            
            // Make API call to our backend
            const response = await fetch(`${this.backendURL}/recipes/search?ingredients=${ingredientsString}&number=12`);
            
            if (!response.ok) {
                throw new Error(`Backend API Error: ${response.status} - ${response.statusText}`);
            }
            
            const recipes = await response.json();
            console.log('Backend API Response:', recipes); // For debugging
            
            this.displayRecipes(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            this.showMessage(`Failed to fetch recipes: ${error.message}`, 'error');
            
            // Fallback to mock data if backend fails
            const mockRecipes = await this.getMockRecipes();
            this.displayRecipes(mockRecipes);
        } finally {
            this.showLoading(false);
        }
    }

    // Mock data for demonstration - remove when using real API
    async getMockRecipes() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        title: "Chicken Tomato Pasta",
                        image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
                        usedIngredients: this.ingredients.slice(0, 2),
                        readyInMinutes: 30,
                        servings: 4
                    },
                    {
                        id: 2,
                        title: "Fresh Garden Salad",
                        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
                        usedIngredients: this.ingredients.slice(0, 1),
                        readyInMinutes: 15,
                        servings: 2
                    },
                    {
                        id: 3,
                        title: "Herb Roasted Vegetables",
                        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
                        usedIngredients: this.ingredients,
                        readyInMinutes: 45,
                        servings: 6
                    }
                ]);
            }, 1500);
        });
    }

    displayRecipes(recipes) {
        this.recipesGrid.innerHTML = '';

        if (recipes.length === 0) {
            this.recipesGrid.innerHTML = '<p>No recipes found with your ingredients. Try different combinations!</p>';
        } else {
            recipes.forEach(recipe => {
                const recipeCard = this.createRecipeCard(recipe);
                this.recipesGrid.appendChild(recipeCard);
            });
        }

        this.recipesSection.style.display = 'block';
    }

    createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        
        const usedIngredients = recipe.usedIngredients || [];
        const ingredientsHTML = usedIngredients.map(ing => 
            `<span class="ingredient-chip">${typeof ing === 'string' ? ing : ing.name}</span>`
        ).join('');

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" onerror="this.src='https://images.unsplash.com/photo-1546554137-f86b9593a222?w=400&h=300&fit=crop'">
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.title}</h3>
                <div class="recipe-info">
                    <span>⏱️ ${recipe.readyInMinutes || 30} min</span>
                    <span>👥 ${recipe.servings || 4} servings</span>
                </div>
                <div class="recipe-ingredients">
                    <h4>Uses your ingredients:</h4>
                    <div class="used-ingredients">
                        ${ingredientsHTML}
                    </div>
                </div>
                <button class="view-recipe" onclick="recipeFinder.viewRecipe(${recipe.id})">
                    View Full Recipe
                </button>
            </div>
        `;

        return card;
    }

    async viewRecipe(recipeId) {
        try {
            this.showLoading(true);
            
            // Fetch detailed recipe information from our backend
            const response = await fetch(`${this.backendURL}/recipes/${recipeId}`);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch recipe details: ${response.status}`);
            }
            
            const recipeDetails = await response.json();
            this.showRecipeModal(recipeDetails);
            
        } catch (error) {
            console.error('Error fetching recipe details:', error);
            // Fallback: open recipe on Spoonacular website
            window.open(`https://spoonacular.com/recipes/${recipeId}`, '_blank');
        } finally {
            this.showLoading(false);
        }
    }

    showRecipeModal(recipe) {
        // Create a modal to show recipe details
        const modal = document.createElement('div');
        modal.className = 'recipe-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${recipe.title}</h2>
                    <button class="close-modal" onclick="this.closest('.recipe-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <img src="${recipe.image}" alt="${recipe.title}" class="modal-image">
                    <div class="recipe-details">
                        <div class="recipe-meta">
                            <span>⏱️ ${recipe.readyInMinutes} minutes</span>
                            <span>👥 ${recipe.servings} servings</span>
                            <span>💰 $${(recipe.pricePerServing / 100).toFixed(2)} per serving</span>
                        </div>
                        <div class="recipe-summary">
                            <h3>Summary</h3>
                            <p>${recipe.summary.replace(/<[^>]*>/g, '')}</p>
                        </div>
                        <div class="recipe-instructions">
                            <h3>Instructions</h3>
                            <ol>
                                ${recipe.instructions?.map(step => 
                                    `<li>${step.step}</li>`
                                ).join('') || '<li>Instructions not available</li>'}
                            </ol>
                        </div>
                        <div class="recipe-source">
                            <a href="${recipe.sourceUrl}" target="_blank" class="source-link">View Original Recipe</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    showLoading(show) {
        this.loading.style.display = show ? 'block' : 'none';
    }

    showMessage(message, type = 'info') {
        // Simple alert for demo - you could create a proper notification system
        alert(message);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.recipeFinder = new RecipeFinder();
});