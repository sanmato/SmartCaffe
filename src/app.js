const express = require('express');
const menuRoutes = require('../routes/menuRoutes');


const app = express();

app.use(express.json())
app.use('/menu', menuRoutes);

const PORT = 3020;

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
});
