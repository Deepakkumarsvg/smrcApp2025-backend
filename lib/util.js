export const sendResponse = (res, statusCode, success, message, data) => {
  res.status(statusCode).json({ success, message, ...data && { data } });
}

export const getEpochTime = () => {
  return Math.floor(new Date().getTime());
};