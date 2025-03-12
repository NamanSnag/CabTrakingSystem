export const successResponse = (data, message = null) => {
  const response = {
    status: "success",
  };

  if (message) {
    response.message = message;
  }

  if (data) {
    response.data = data;
  }

  return response;
};

export const errorResponse = (message = null) => {
  const response = {
    status: "error",
  };

  if (message) {
    response.error = message;
  }

  return response;
};
