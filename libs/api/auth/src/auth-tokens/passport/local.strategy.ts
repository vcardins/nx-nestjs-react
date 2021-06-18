import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../../auth.service';

const credentials = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
};
@Injectable()
export class LocalStrategySignIn extends PassportStrategy(Strategy, 'signin') {
	constructor(private readonly authService: AuthService) {
		super(credentials);
	}

	public async validate(req, email: string, password: string) {
		return this.authService.signIn({ email, password });
	}
}
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class LocalStrategySignUp extends PassportStrategy(Strategy, 'signup') {
	constructor(private readonly authService: AuthService) {
		super(credentials);
	}

	public async validate(req, email: string, password: string) {
		if (req.user) {
			return req.user;
		}
		return await this.authService.signUp({
			email,
			password,
		});
	}
}
