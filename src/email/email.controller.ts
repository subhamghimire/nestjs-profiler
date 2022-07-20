import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { EmailDto } from './dto/email.dto';
import { EmailService } from './email.service';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-email')
  @ApiOperation({ summary: 'Send email to user himself' })
  sendEmail(@Req() req: Request) {
    return this.emailService.send(req.user['email']);
  }

  @Post('send-later')
  @ApiOperation({ summary: 'Send email later' })
  scheduleEmail(@Body() emailSchedule: EmailDto) {
    return this.emailService.later(emailSchedule);
  }
}
