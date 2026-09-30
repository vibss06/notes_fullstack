import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const createAccessToken = ({ userId }) => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const createRefreshToken = ({ userId }) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const readAccessToken = (accessToken) => {
  return jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
};

export const readRefreshToken = (refreshToken) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
};
