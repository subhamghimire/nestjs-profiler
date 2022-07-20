import { User } from '@/users/entities/user.entity';
import { IUser } from '@/users/interfaces/user.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailDto } from './dto/email.dto';
import { Mailable } from './interfaces/mailable.interface';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class EmailService implements Mailable {
  constructor(
    private mailService: MailerService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async send(email: string): Promise<boolean> {
    try {
      const send = await this.mailService.sendMail({
        to: email,
        from: 'shekharghimire@kilroyblockchain.com',
        subject: 'Test',
        text: 'Welcome to test email',
      });
    } catch (err) {
      return false;
    }
    return true;
  }

  later(emailschedule: EmailDto): void {
    const date = new Date(emailschedule.date);
    const job = new CronJob(date, () => {
      this.mailService.sendMail({
        to: emailschedule.recipient,
        subject: emailschedule.subject,
        text: emailschedule.content,
      });
    });

    this.schedulerRegistry.addCronJob(
      `${Date.now()}-${emailschedule.subject}`,
      job,
    );
    job.start();
  }
}
