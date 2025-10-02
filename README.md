# Interactive Recipe Finder

A modern web application that helps users find recipes based on available ingredients, reducing food waste and cooking time with smart suggestions.

## 🌟 Features

- **Ingredient Input**: Add multiple ingredients with a clean, intuitive interface
- **Smart Recipe Suggestions**: Find recipes that use your available ingredients
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Visual Recipe Cards**: Beautiful cards showing recipe images, cooking time, and servings
- **Ingredient Matching**: See which of your ingredients are used in each recipe
- **Secure API**: Backend handles API keys securely

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and API integration
- **GitHub Pages**: Static hosting

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web framework
- **Spoonacular API**: Recipe data and ingredient matching
- **Vercel/Render/Railway**: Backend deployment

## 🚀 Live Demo

- **Frontend**: [https://jeelan80.github.io/Recipie-Finder](https://jeelan80.github.io/Recipie-Finder)
- **Backend API**: [Your deployed backend URL]

## 📁 Project Structure

```
recipe-finder/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # Frontend JavaScript
├── README.md           # Project documentation
└── backend/            # Backend API
    ├── server.js       # Express server
    ├── package.json    # Dependencies
    ├── vercel.json     # Vercel deployment config
    └── README.md       # Backend documentation
```

## 🔧 Setup Instructions

### 1. Get a Spoonacular API Key
- Visit [Spoonacular API](https://spoonacular.com/food-api)
- Sign up for a free account
- Get your API key from the dashboard

### 2. Deploy the Backend

#### Option A: Deploy to Vercel (Recommended)
1. Fork this repository
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Set the root directory to `backend`
5. Add environment variable: `SPOONACULAR_API_KEY` = your API key
6. Deploy!

#### Option B: Deploy to Render
1. Go to [Render](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variable: `SPOONACULAR_API_KEY`

### 3. Update Frontend Configuration
1. Open `script.js`
2. Replace the backend URL:
   ```javascript
   this.backendURL = 'https://your-backend-url.vercel.app/api';
   ```

### 4. Deploy Frontend to GitHub Pages

**✅ Automated deployment is configured!**

This repository includes GitHub Actions that automatically deploy to GitHub Pages when changes are pushed to the main branch.

**The site is available at:** [https://jeelan80.github.io/Recipie-Finder](https://jeelan80.github.io/Recipie-Finder)

**For first-time setup:**
1. Ensure repository settings → Pages is set to "GitHub Actions" as source
2. Push to main branch to trigger automatic deployment
3. Or manually trigger from Actions tab → "Deploy to GitHub Pages"

### 5. Local Development
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
# Open index.html in browser or use Live Server
```

## How to Use

1. **Add Ingredients**: Type ingredients in the input field and click "Add" or press Enter
2. **Remove Ingredients**: Click the × button on any ingredient tag to remove it
3. **Find Recipes**: Click "Find Recipes" to search for recipes using your ingredients
4. **View Results**: Browse through recipe suggestions with images and details
5. **Get Full Recipe**: Click "View Full Recipe" to see complete cooking instructions

## API Integration

The app uses the Spoonacular API for:
- Finding recipes by ingredients
- Getting recipe details and images
- Nutritional information (can be extended)

### API Endpoints Used:
- `/recipes/findByIngredients` - Find recipes by available ingredients
- `/recipes/{id}/information` - Get detailed recipe information

## File Structure

```
recipe-finder/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality and API calls
└── README.md           # Project documentation
```

## Customization Ideas

- Add dietary filters (vegetarian, vegan, gluten-free)
- Include nutritional information display
- Add recipe rating and reviews
- Implement recipe saving/favorites
- Add cooking difficulty levels
- Include preparation time filters

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Demo Mode

The app includes mock data for demonstration purposes. When you get your API key, simply:
1. Replace the API key in `script.js`
2. Uncomment the real API calls
3. Comment out or remove the mock data functions

## License

This project is for educational purposes as part of a frontend development internship.