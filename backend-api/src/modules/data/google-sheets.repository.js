import { ProductRepository } from "./repository-contract.js";

/**
 * Optional lightweight data adapter for early-stage environments.
 * Intentionally kept independent so it can be wired in later without changing current code paths.
 */
export class GoogleSheetsProductRepository extends ProductRepository {
  constructor({ sheetsClient, spreadsheetId, worksheetName = "products" }) {
    super();
    this.sheetsClient = sheetsClient;
    this.spreadsheetId = spreadsheetId;
    this.worksheetName = worksheetName;
  }

  async createImportedProduct(payload) {
    // Placeholder: map payload -> row schema and append via Sheets API.
    return { persisted: false, backend: "google-sheets", payload };
  }

  async listProductsByUser(userId) {
    // Placeholder: read rows and filter by userId.
    return { persisted: false, backend: "google-sheets", userId, products: [] };
  }
}
