import { Router } from "express";
import { issueToken } from "../modules/auth/service.js";

const router = Router();

router.post("/login", (req, res) => {
  const email = req.body?.email || "demo@example.com";
  const token = issueToken({ id: "demo-user", email });
  res.json({ token });
});

export default router;
