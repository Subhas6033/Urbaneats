export const asyncHandeler = (requestHandeler) => async (req, res, next) => {
  try {
    return await requestHandeler(req, res,next);
  } catch (error) {
    console.log('ERR from Async Handeler', error);
    res.status(error.statusCode || 502).json({
      success: false,
      message: error.message,
    });
    next();
  }
};
