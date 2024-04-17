const validateTerrainName = (req, res, next) => {
    const allowedNames = ['a', 'b', 'c', 'd'];
    const terrainName = req.params.name.toLowerCase();
  
    if (!terrainName || !allowedNames.includes(terrainName)) {
      return res.status(400).json({ error: 'Invalid terrain name' });
    }
  
    next();
  };
  
  module.exports = validateTerrainName;
  