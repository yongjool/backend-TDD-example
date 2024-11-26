const express = require('express');

//APIs
const quoteRoutes = require('./routes/quote.routes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', quoteRoutes);

// Export the app (for testing)
module.exports = app;

const PORT = process.env.PORT || 4000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
    }).on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error('Port is already in use');
        } else {
            console.error('Server Error:', error);
        }
    });
}
