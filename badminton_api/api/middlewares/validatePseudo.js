const validatePseudo = (req, res, next) => {
    const pseudo = req.params.pseudo;
  
    if (!pseudo || !/^[a-zA-Z0-9_]+$/.test(pseudo)) {
      return res.status(400).json({ error: 'Invalid pseudo' });
    }
  
    next();
  };
  
  module.exports = validatePseudo;
  