import { EmailDto } from '../dto/email.dto';

export interface Mailable {
  send: (email: string) => Promise<boolean>;
  later(emailschedule: EmailDto): void; //after in minutes
}
