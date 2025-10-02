# Recipe Finder Backend

A Node.js/Express backend API for the Recipe Finder application that securely handles Spoonacular API calls.

## Features

- **Secure API Key Management**: Keeps your Spoonacular API key server-side
- **CORS Enabled**: Configured for GitHub Pages frontend
- **Error Handling**: Comprehensive error handling and logging
- **RESTful API**: Clean API endpoints for recipe operations

## API Endpoints

### GET /
Health check endpoint

### GET /api/recipes/search
Search recipes by ingredients
- **Query Parameters:**
  - `ingredients` (required): Comma-separated list of ingredients
  - `number` (optional): Number of recipes to return (default: 12)

### GET /api/recipes/:id
Get detailed recipe information by ID
- **Path Parameters:**
  - `id` (required): Recipe ID

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your Spoonacular API key.

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Test the API:**
   - Health check: http://localhost:3000
   - Search recipes: http://localhost:3000/api/recipes/search?ingredients=chicken,tomato

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables in Vercel dashboard:**
   - Go to your project settings
   - Add `SPOONACULAR_API_KEY` with your API key

### Deploy to Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variable: `SPOONACULAR_API_KEY`

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Add environment variable: `SPOONACULAR_API_KEY`
3. Railway will auto-deploy

## Environment Variables

- `SPOONACULAR_API_KEY`: Your Spoonacular API key
- `PORT`: Server port (default: 3000)

## Security Features

- CORS configured for specific origins
- API key hidden from frontend
- Input validation
- Error message sanitization