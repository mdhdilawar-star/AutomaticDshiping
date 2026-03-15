import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export function issueToken(user) {
  return jwt.sign({ sub: user.id, email: user.email }, env.jwtSecret, { expiresIn: "1h" });
}
