const validateDisponible = (req, res, next) => {
    const disponible = req.query.disponible;
  
    if (disponible && ![0, 1].includes(parseInt(disponible))) {
      return res.status(400).json({ error: 'Invalid value for disponible' });
    }
  
    next();
  };
  
  module.exports = validateDisponible;
  