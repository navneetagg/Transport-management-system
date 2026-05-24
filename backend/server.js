const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Logistics Management API is running');
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(' MongoDB Connected Successfully'))
    .catch((err) => console.error(' Database Connection Error:', err));


app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});