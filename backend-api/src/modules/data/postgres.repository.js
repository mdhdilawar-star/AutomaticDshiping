import { ProductRepository } from "./repository-contract.js";

/**
 * Postgres repository skeleton for future Prisma/SQL implementation.
 */
export class PostgresProductRepository extends ProductRepository {
  constructor({ db }) {
    super();
    this.db = db;
  }

  async createImportedProduct(payload) {
    return { persisted: false, backend: "postgres", payload };
  }

  async listProductsByUser(userId) {
    return { persisted: false, backend: "postgres", userId, products: [] };
  }
}
