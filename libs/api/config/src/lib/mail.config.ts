export const MailConfig = () => ({
	/*
	|--------------------------------------------------------------------------
	| Mail Configurations
	|--------------------------------------------------------------------------
	|
	| In our case we decided to use the GMail SMTP Server. Just add your credentials
	| below or in the .env file.
	|
	*/
	secure: process.env.MAIL_SECURE === 'true',
	service: process.env.MAIL_SERVICE,
	host: process.env.MAIL_HOST,
	port: parseInt(process.env.MAIL_PORT, 10) || 465,
	from: process.env.MAIL_FROM,
	username: process.env.MAIL_USERNAME,
	password: process.env.MAIL_PASSWORD,
  })
