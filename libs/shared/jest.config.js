module.exports = {
	name: 'react',
	preset: '../../../jest.config.js',
	globals: {
		'ts-jest': {
			tsConfig: '<rootDir>/tsconfig.spec.json',
		},
	},
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx'],
	coverageDirectory: '../../../coverage/libs/react',
};
