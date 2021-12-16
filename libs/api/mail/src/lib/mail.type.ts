export interface IMailTemplate {
	templatePath: string;
	subject: string;
	context: any;
}

export interface IMail {
	build(): IMailTemplate;
}
