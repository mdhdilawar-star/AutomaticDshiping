export class Notifier {
  async send(_message) {
    throw new Error("send not implemented");
  }
}

export class NotificationMessage {
  constructor({ type, severity = "info", title, body, recipients = [], metadata = {} }) {
    this.type = type;
    this.severity = severity;
    this.title = title;
    this.body = body;
    this.recipients = recipients;
    this.metadata = metadata;
  }
}
