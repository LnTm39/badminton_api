const validateReservationId = (req, res, next) => {
    const reservationId = req.params.reservationId;
  
    if (!reservationId || !/^\d+$/.test(reservationId) || parseInt(reservationId) <= 0) {
      return res.status(400).json({ error: 'Invalid reservationId' });
    }
  
    next();
  };
  
  module.exports = validateReservationId;
  