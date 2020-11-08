
import { Request } from 'express';
import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Req, Logger, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { OAuthProvider } from '@xapp/shared/enums';
import { CORE_CONFIG_TOKEN, ICoreConfig, /*AccountOutput, GroupDto, */Public, SocketGateway } from '@xapp/api/core';
import { UserDto } from '@xapp/api/users';

// import { FacebookTokenOutput } from '../dto/facebook-token.output';
// import { FacebookSignInInput } from '../dto/facebook-signIn.input';
// import { GoogleSignInInput } from '../dto/google-signIn.input';

import { RedirectUriOutput } from './dto/redirect-uri.output';
import { SignInInput } from './dto/signin.input';
import { AuthService } from './auth.service';
import { JwtTokenService } from './auth-tokens/jwt-token.service';
import { UserTokenOutput } from './auth-tokens/dto/user-token.output';
import { OAuthSignInInput } from './auth-tokens/dto/oauth-signIn.input';


@ApiTags('auth')
@Controller('/auth')
@Public()
export class AuthController {
	constructor(
		@Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
		private readonly authService: AuthService,
		private readonly tokenService: JwtTokenService,
		private readonly socketService: SocketGateway,
	) {}

	private getUserTokenDto(user: UserDto): UserTokenOutput {
		const accessToken = this.tokenService.create(user);
		// eslint-disable-next-line camelcase
		return plainToClass(UserTokenOutput, { user, access_token: accessToken });
	}

	private emit(event: string, data?: any) {
		this.socketService?.server.emit('events', { module: 'Auth', event, data });
	}

	private getHost(req: Request) {
		return req.get('origin') || `${this.coreConfig.protocol}://${req.get('host')}`;
	}

	@HttpCode(HttpStatus.OK)
	@Post('signin')
	@ApiResponse({
		status: HttpStatus.OK,
		type: UserTokenOutput,
		description: 'API View that checks the veracity of a token, returning the token if it is valid.',
	})
	async signIn(@Body() signInDto: SignInInput): Promise<UserTokenOutput> {
		const user = await this.authService.signIn(signInDto);

		return this.getUserTokenDto(user);
	}

	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: '{provider}/uri',
	})
	@Get(':provider/uri')
	requestGoogleRedirectUri(@Param('provider') provider: string,
		@Req() req: Request,
	): RedirectUriOutput {
		Logger.log(req.get('origin'), `${AuthController.name}:request-${provider}RedirectUri#origin`);

		return this.authService.requestProviderRedirectUri(provider as OAuthProvider, this.getHost(req));
	}

	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({
	// 	status: HttpStatus.OK,
	// 	description: '{provider}/redirect',
	// })
	// @Post(':provider/redirect')
	// async requestJsonWebTokenAfterOauthSignIn(@Param('provider') provider: string,
	// 	@Req() req: Request,
	// 	@Body() tokenDto: TokenOutput,
	// ): Promise<UserTokenOutput> {
	// 	Logger.log(JSON.stringify(req.body), `[requestJsonWebTokenAfterOauthSignIn] ${provider}`);
	// 	this.emit('oauth', { provider, data: tokenDto });
	// 	return plainToClass(UserTokenOutput, { token: tokenDto.access_token });

	// 	// const token = await this.tokenService.create(req.user);
	// 	// return plainToClass(UserTokenOutput, { user: req.user, token });
	// }

	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: ':provider/signin',
	})
	@Post(':provider/signin')
	async oauthProviderSignIn(
		@Param('provider') provider: string,
			@Req() req: Request,
			@Body() oauthSignInDto: OAuthSignInInput,
	): Promise<UserTokenOutput> {
		Logger.log(req.get('origin'), `${AuthController.name}:${provider}SignIn#origin`);
		return this.authService[`${provider}SignIn`](
			oauthSignInDto.code,
			this.getHost(req),
		);
	}

	@HttpCode(HttpStatus.OK)
	@ApiResponse({
		status: HttpStatus.OK,
		description: ':provider/token',
	})
	@Post(':provider/token')
	async oauthProviderToken(
		@Param('provider') provider: string,
			@Req() req: any,
	): Promise<UserTokenOutput> {
		const token = this.tokenService.create(req.user);
		return plainToClass(UserTokenOutput, { user: req.user, token });
	}

	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({
	// 	status: HttpStatus.OK,
	// 	description: 'refresh-token',
	// })
	// @Get('refresh-token')
	// refresh(@Req() request: Request) {
	// 	const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);

	// 	request.res.setHeader('Set-Cookie', accessTokenCookie);
	// 	return request.user;
	// }

	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({
	// 	status: HttpStatus.OK,
	// 	description: 'google/signin',
	// })
	// @Post('google/signin')
	// async googleSignIn(@Req() req: Request, @Body() googleSignInDto: GoogleSignInInput): Promise<any> {
	// 	Logger.log(req.get('origin'), `${AuthController.name}:googleSignIn#origin`);
	// 	const userToken = await this.authService.googleSignIn(
	// 		googleSignInDto.code,
	// 		this.getHost(req),
	// 	);

	// 	this.emit('oauth', { provider: 'google', data: userToken });

	// 	return userToken;
	// }

	// @HttpCode(HttpStatus.OK)
	// @ApiResponse({
	// 	status: HttpStatus.OK,
	// 	description: 'facebook/signin',
	// })
	// @Post('facebook/signin')
	// async facebookSignIn(@Req() req: Request, @Body() facebookSignInDto: FacebookSignInInput): Promise<UserTokenOutput> {
	// 	// Logger.log(req.get('origin'), AuthController.name + ':facebookSignIn#origin');
	// 	const userToken = await this.authService.facebookSignIn(
	// 		facebookSignInDto.code,
	// 		this.getHost(req),
	// 	);

	// 	this.emit('oauth', { provider: 'facebook', data: userToken });

	// 	return userToken;
	// }
}
