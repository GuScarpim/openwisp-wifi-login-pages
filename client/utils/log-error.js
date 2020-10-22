const logError = (error, errorText = "") => {
  try {
    console.error(
      'Status',
      error.response.status,
      error.response.statusText,
      ':',
      errorText
    );
  } catch (err) {
    console.error(err);
  }
};
export default logError;
