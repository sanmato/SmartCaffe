const db = require('../db/db')

exports.getAllMenu = (req, res) => {
    const sql = 'SELECT * FROM menu';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};