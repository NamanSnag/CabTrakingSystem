import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key";

/**
 * Function to encode a JWT token.
 * @param {string} userId - The user ID to include in the token payload.
 * @param {string} [expiresIn] - Optional expiration time for the token.
 * @returns {string} - The encoded JWT token.
 */
export const encode = (userId, expiresIn = "24h") => {
  // Payload for the JWT
  const payload = {
    user: {
      uuid: userId,
    },
  };

  // Options for the JWT token
  const options = {};

  // Set expiration time if provided
  if (expiresIn) {
    options.expiresIn = expiresIn;
  }

  // Sign the token
  const token = jwt.sign(payload, secretKey, options);

  return token;
};

/**
 * Function to decode a JWT token and extract the userId.
 * @param {string} token - The JWT token to decode.
 * @returns {string|null} - The decoded user ID or null if decoding fails.
 */
export const decode = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.user.uuid;
    return userId;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      console.error("Token has expired");
    } else {
      console.error("Error decoding token:", error.message);
    }
    return null;
  }
};