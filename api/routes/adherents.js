// adherents.js
const express = require('express');
const router = express.Router();
const hal = require('../hal');
const pool = require('../db'); // Import the db.js file
const validateAdherentId = require('../middlewares/validateCreneauId');
const validatePseudo = require('../middlewares/validatePseudo');
const validateDisponible = require('../middlewares/validateDisponible');

/* GET adherents page. */
router.get('/adherents', 
validatePseudo,
validateDisponible,
async function (req, res, next) {
  try {
    const disponible = req.query.disponible;
    const end= '';
    if(disponible){
        end = ' WHERE disponible = ' + disponible;
    }
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM adherent' + end + ';';

    const [rows] = await connection.query(sql, [disponible]);

    if (rows.length === 0) {
        res.status(404).json({ "msg": "Aucun adhérent" });
        return;
    }

    const ressourceObject = {
      "self": { 
        "href": `/adherents`
      },
      "_embedded": {
        "adherents": rows.map(row => hal.mapAdherentToResourceObject(row, req.baseUrl))
      }
    };

    res.set('Content-Type', 'application/hal+json');
    res.status(200);
    res.json(ressourceObject);

    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

router.get('/adherents/:id', 
validatePseudo,
validateAdherentId,
async function (req, res, next) {
  try {
    const creneauId = req.params.id;
    const connection = await pool.getConnection();
    const sql = 'SELECT * FROM adherent WHERE id = ?;';

    const [rows] = await connection.query(sql, [creneauId]);

    if (rows.length === 0) {
        res.status(404).json({ "msg": "Adhérent inexistant" });
        return;
    }

    const ressourceObject = {
      "self": { 
        "href": `/adherents/${req.params.id}`},
        "adherent": hal.mapAdherentToResourceObject(rows[0], req.baseUrl)
      };

    res.set('Content-Type', 'application/hal+json');
    res.status(200);
    res.json(ressourceObject);

    connection.release();
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": "Nous rencontrons des difficultés, merci de réessayer plus tard." });
  }
});

module.exports = router;