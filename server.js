const express = require('express'); // Import Express for building the server

// APIs
const quoteRoutes = require('./routes/quote.routes'); // Import Quote API routes
const riskRoutes = require('./routes/risk.routes');  // Import Risk Rating API routes

const app = express(); // Initialize the Express app

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api', quoteRoutes); // Mount Quote API routes at /api
app.use('/api', riskRoutes); // Mount Risk Rating API routes at /api

// Export the app (for testing)
module.exports = app;

// Set the port from environment variables or default to 4000
const PORT = process.env.PORT || 4000;

// Start the server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    }).on('error', (error) => {
        // Handle port-related errors
        if (error.code === 'EADDRINUSE') {
            console.error('Port is already in use');
        } else {
            console.error('Server Error:', error);
        }
    });
}
