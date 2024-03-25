var express = require('express');
var router = express.Router();
var hal = require('../hal');

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.send({
    "_links": {
      "self": hal.halLinkObject('/'),
      "terrains": hal.halLinkObject('/terrains'),
      "creneaux": hal.halLinkObject('/creneaux'),
      "adherents": hal.halLinkObject('/adherents'),
      "admin": hal.halLinkObject('/admin'),
    },
    'description' : 'Un système de réservation de terrains de badminton'
  })
});

module.exports = router;
