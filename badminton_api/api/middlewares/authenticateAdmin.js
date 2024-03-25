const authenticateAdmin = (req, res, next) => {
  const { username, password } = req.query;
  const adminUsername = 'admybad';
  const adminPassword = 'admybad';

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  if (username === adminUsername && password === adminPassword) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateAdmin;
