export const asyncHandeler = async (requestHandeler) => (req, res, next) => {
  try {
    return requestHandeler(req, res);
  } catch (error) {
    console.log('ERR from Async Handeler', error);
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
    next();
  }
};
