export class ProductRepository {
  async createImportedProduct(_payload) {
    throw new Error("createImportedProduct not implemented");
  }

  async listProductsByUser(_userId) {
    throw new Error("listProductsByUser not implemented");
  }
}

export class AutomationConfigRepository {
  async upsertRule(_rule) {
    throw new Error("upsertRule not implemented");
  }

  async listRules(_scope) {
    throw new Error("listRules not implemented");
  }
}

export class IntegrationCredentialRepository {
  async saveCredential(_credential) {
    throw new Error("saveCredential not implemented");
  }

  async getCredential(_storeId, _provider) {
    throw new Error("getCredential not implemented");
  }
}
