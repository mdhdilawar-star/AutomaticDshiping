import { Router } from "express";
import { productImportSchema } from "../modules/products/schema.js";
import { importProduct, listProducts } from "../modules/products/service.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/import", authRequired, (req, res) => {
  const parsed = productImportSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const record = importProduct(parsed.data, req.user.sub);
  res.status(201).json({ product: record });
});

router.get("/", authRequired, (req, res) => {
  res.json({ products: listProducts(req.user.sub) });
});

export default router;
