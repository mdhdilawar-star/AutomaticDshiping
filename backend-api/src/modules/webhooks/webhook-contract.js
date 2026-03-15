export class WebhookProvider {
  verifySignature(_headers, _rawBody) {
    throw new Error("verifySignature not implemented");
  }

  parseEvent(_payload) {
    throw new Error("parseEvent not implemented");
  }
}
