import { JwtStrategy } from './jwt.strategy';
import { LocalStrategySignIn, LocalStrategySignUp } from './local.strategy';
// import { GoogleStrategy } from './google.strategy';
// import { FacebookStrategy } from './facebook.strategy';

export const AUTH_PASSPORT_STRATEGIES = [
	LocalStrategySignIn,
	LocalStrategySignUp,
	JwtStrategy,
	// FacebookStrategy,
	// GoogleStrategy,
];
