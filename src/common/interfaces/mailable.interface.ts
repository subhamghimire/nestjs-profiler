interface Mailable {
  send: (email: string) => boolean;
  later(email: string, after: number): void; //after in minutes
}
