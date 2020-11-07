import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { TemplateService } from './template.service';

@Module({
	providers: [TemplateService, MailService],
	exports: [MailService],
})
export class MailModule {}
