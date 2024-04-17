const validateCreneauId = (req, res, next) => {
    const creneauId = req.params.id;
  
    if (!creneauId || !/^\d+$/.test(creneauId) || parseInt(creneauId) <= 0) {
      return res.status(400).json({ error: 'Invalid creneauId' });
    }
  
    next();
  };
  
  module.exports = validateCreneauId;
  