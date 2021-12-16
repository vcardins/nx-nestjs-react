import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

import { IMail } from './mail.type';
import { TemplateService } from './template.service';

@Injectable()
export class MailService {
	transporter: Transporter;

	constructor(
		private readonly configService: ConfigService,
		private readonly templateService: TemplateService,
	) {
		this.transporter = createTransport({
			host: configService.get('mail.host'),
			port: configService.get('mail.port'),
			secure: configService.get('mail.secure'),
			auth: {
				user: configService.get('mail.username'),
				pass: configService.get('mail.password'),
			},
		});
	}

	async send(to: string, sub: string, mail: IMail | string): Promise<void> {
		let content: string;
		let subject: string;

		if (typeof mail !== 'string') {
			const mailTemplate = mail.build();
			content = this.templateService.compile(mailTemplate.templatePath, mailTemplate.context);
			subject = mailTemplate.subject;
		}
		else {
			content = mail;
			subject = sub;
		}

		await this.sendMail(to, subject, content);
	}

	async sendMail(to: string, subject: string, html: string): Promise<void> {
		await this.transporter.sendMail({
			from: this.configService.get('mail.from'),
			to,
			subject,
			html,
		});
	}
}
