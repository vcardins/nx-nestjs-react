const rules = {
	'@typescript-eslint/explicit-member-accessibility': 'off',
	'@typescript-eslint/explicit-module-boundary-types': 'off',
	'@typescript-eslint/explicit-function-return-type': 'off',
	'@typescript-eslint/no-parameter-properties': 'off',
	'@typescript-eslint/no-use-before-define': 'warn',
	'@typescript-eslint/indent': ['error', 'tab', { 'SwitchCase': 1 }], // Enforce consistent indentation (indent from TSLint)
	'@typescript-eslint/adjacent-overload-signatures': 'off', // Require that member overloads be consecutive (adjacent-overload-signatures from TSLint)
	'@typescript-eslint/array-type': 'off', // Requires using either T[] or Array<T> for arrays (array-type from TSLint)
	'@typescript-eslint/ban-types': 'off', // Enforces that types will not to be used (ban-types from TSLint)
	'@typescript-eslint/ban-ts-ignore': 'off', // Bans “// @ts-ignore” comments from being used (ban-ts-ignore from TSLint)
	'@typescript-eslint/camelcase': 'off', // Enforce camelCase naming convention
	'@typescript-eslint/class-name-casing': 'off', // Require PascalCased class and interface names (class-name from TSLint)
	'@typescript-eslint/generic-type-naming': 'off', // Enforces naming of generic type variables
	'@typescript-eslint/no-empty-function': 'off', // Empty functions can reduce readability because readers need to guess whether it’s intentional or not.
	'@typescript-eslint/ban-ts-comment': 'off',
	'@typescript-eslint/interface-name-prefix': 'off', // Require that interface names be prefixed with I (interface-name from TSLint)
	'@typescript-eslint/member-delimiter-style': 'off', // Require a specific member delimiter style for interfaces and type literals
	'@typescript-eslint/member-naming': 'off', // Enforces naming conventions for class members by visibility.
	'@typescript-eslint/member-ordering': 'off', // Require a consistent member declaration order (member-ordering from TSLint)
	'@typescript-eslint/no-angle-bracket-type-assertion': 'off', // Enforces the use of as Type assertions instead of <Type> assertions (no-angle-bracket-type-assertion from TSLint)
	'@typescript-eslint/no-array-constructor': 'off', // Disallow generic Array constructors
	'@typescript-eslint/no-empty-interface': 'off', // Disallow the declaration of empty interfaces (no-empty-interface from TSLint)
	'@typescript-eslint/no-explicit-any': 'off', // Disallow usage of the any type (no-any from TSLint)
	'@typescript-eslint/no-extraneous-class': 'off', // Forbids the use of classes as namespaces (no-unnecessary-class from TSLint)
	'@typescript-eslint/no-for-in-array': 'off', // Disallow iterating over an array with a for-in loop (no-for-in-array from TSLint)
	'@typescript-eslint/no-inferrable-types': 'off', // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean. (no-inferrable-types from TSLint)
	'@typescript-eslint/no-misused-new': 'off', // Enforce valid definition of new and constructor. (no-misused-new from TSLint)
	'@typescript-eslint/no-namespace': 'off', // Disallow the use of custom TypeScript modules and namespaces (no-namespace from TSLint)
	'@typescript-eslint/no-non-null-assertion': 'off', // Disallows non-null assertions using the ! postfix operator (no-non-null-assertion from TSLint)
	'@typescript-eslint/no-object-literal-type-assertion': 'off', // Forbids an object literal to appear in a type assertion expression (no-object-literal-type-assertion from TSLint)
	'@typescript-eslint/no-require-imports': 'off', // Disallows invocation of require() (no-require-imports from TSLint)
	'@typescript-eslint/no-this-alias': 'off', // Disallow aliasing this (no-this-assignment from TSLint)
	'@typescript-eslint/no-triple-slash-reference': 'off', // Disallow /// <reference path='' /> comments (no-reference from TSLint)
	'@typescript-eslint/no-type-alias': 'off', // Disallow the use of type aliases (interface-over-type-literal from TSLint)
	'@typescript-eslint/no-unnecessary-qualifier': 'off', // Warns when a namespace qualifier is unnecessary (no-unnecessary-qualifier from TSLint)
	'@typescript-eslint/no-unnecessary-type-assertion': 'off', // Warns if a type assertion does not change the type of an expression (no-unnecessary-type-assertion from TSLint)
	'@typescript-eslint/no-useless-constructor': 'off', // Disallow unnecessary constructors
	'@typescript-eslint/no-var-requires': 'off', // Disallows the use of require statements except in import statements (no-var-requires from TSLint)
	'@typescript-eslint/prefer-for-of': 'off', // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated.
	'@typescript-eslint/prefer-function-type': 'off', // Use function types instead of interfaces with call signatures (callable-types from TSLint)
	'@typescript-eslint/prefer-interface': 'off', // Prefer an interface declaration over a type literal (type T = { ... }) (interface-over-type-literal from TSLint)
	'@typescript-eslint/prefer-namespace-keyword': 'off', // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules. (no-internal-module from TSLint)
	'@typescript-eslint/promise-function-async': 'off', // Requires any function or method that returns a Promise to be marked async. (promise-function-async from TSLint)
	'@typescript-eslint/restrict-plus-operands': 'off', // When adding two variables, operands must both be of type number or of type string. (restrict-plus-operands from TSLint)
	'@typescript-eslint/type-annotation-spacing': 'off', // Require consistent spacing around type annotations (typedef-whitespace from TSLint)
	'@typescript-eslint/unbound-method': 'off', // Enforces unbound methods are called with their expected scope. (no-unbound-method from TSLint)
	'@typescript-eslint/unified-signatures': 'off', // Warns for any two overloads that could be unified into one. (unified-signatures from TSLint): 'off', // ': 'off', //
	'@nrwl/nx/enforce-module-boundaries': [
		'warn',
		{
			'enforceBuildableLibDependency': true,
			'allow': [],
			'depConstraints': [{ 'sourceTag': '*', 'onlyDependOnLibsWithTags': ['*'] }]
		}
	],
	'for-direction': 'off',
	'getter-return': 'off',
	'no-async-promise-executor': 'off',
	'no-await-in-loop': 'off',
	'no-compare-neg-zero': 'off',
	'no-cond-assign': ['error', 'except-parens'],
	'no-console': ['error', { 'allow': ['error'] }],
	'no-constant-condition': 'off',
	'no-control-regex': 'off',
	'no-debugger': 'error',
	'no-dupe-args': 'error',
	'no-dupe-keys': 'error',
	'no-duplicate-case': 'error',
	'no-empty': 'off',
	'no-empty-character-class': 'off',
	'no-ex-assign': 'off',
	'no-extra-boolean-cast': 'off',
	'no-extra-parens': 'off',
	'no-extra-semi': 'off',
	'no-func-assign': 'off',
	'no-inner-declarations': 'off',
	'no-invalid-regexp': 'off',
	'no-irregular-whitespace': 'off',
	'no-misleading-character-class': 'off',
	'no-obj-calls': 'off',
	'no-prototype-builtins': 'off',
	'no-regex-spaces': 'off',
	'no-sparse-arrays': 'off',
	'no-template-curly-in-string': 'off',
	'no-unexpected-multiline': 'off',
	'no-unreachable': 'error',
	'no-unsafe-finally': 'off',
	'no-unsafe-negation': 'off',
	'require-atomic-updates': 'off',
	'use-isnan': 'off',
	'valid-typeof': 'error',

	// Best Practices
	// These rules relate to better ways of doing things to help you avoid problems:

	'accessor-pairs': 'off',
	'array-callback-return': 'off',
	'block-scoped-var': 'off',
	'class-methods-use-this': 'off',
	'complexity': 'off',
	'consistent-return': 'off',
	'curly': 'off',
	'default-case': 'off',
	'dot-location': ['error', 'property'],
	'dot-notation': 'off',
	'eqeqeq': ['error', 'allow-null'],
	'guard-for-in': 'off',
	'max-classes-per-file': 'off',
	'no-alert': 'off',
	'no-caller': 'off',
	'no-case-declarations': 'off',
	'no-div-regex': 'off',
	'no-else-return': 'error',
	'no-empty-function': 'off',
	'no-empty-pattern': 'off',
	'no-eq-null': 'off',
	'no-eval': 'off',
	'no-extend-native': 'off',
	'no-extra-bind': 'off',
	'no-extra-label': 'off',
	'no-fallthrough': 'off',
	'no-floating-decimal': 'off',
	'no-global-assign': 'off',
	'no-implicit-coercion': 'off',
	'no-implicit-globals': 'off',
	'no-implied-eval': 'off',
	'no-invalid-this': 'off',
	'no-iterator': 'off',
	'no-labels': 'off',
	'no-lone-blocks': 'off',
	'no-loop-func': 'off',
	'no-magic-numbers': 'off',
	'no-multi-spaces': 'off',
	'no-multi-str': 'off',
	'no-new': 'off',
	'no-new-func': 'off',
	'no-new-wrappers': 'off',
	'no-octal': 'off',
	'no-octal-escape': 'off',
	'no-param-reassign': 'error',
	'no-proto': 'off',
	'no-redeclare': 'off',
	'no-restricted-properties': 'off',
	'no-return-assign': 'off',
	'no-return-await': 'off',
	'no-script-url': 'off',
	'no-self-assign': 'off',
	'no-self-compare': 'off',
	'no-sequences': 'off',
	'no-throw-literal': 'off',
	'no-unmodified-loop-condition': 'off',
	'no-unused-expressions': 'off',
	'no-unused-labels': 'off',
	'no-useless-call': 'off',
	'no-useless-catch': 'off',
	'no-useless-concat': 'off',
	'no-useless-escape': 'off',
	'no-useless-return': 'off',
	'no-void': 'off',
	'no-warning-comments': 'off',
	'no-with': 'off',
	'prefer-named-capture-group': 'off',
	'prefer-promise-reject-errors': 'off',
	'radix': 'error',
	'require-await': 'off',
	'require-unicode-regexp': 'off',
	'vars-on-top': 'off',
	'wrap-iife': 'off',
	'yoda': 'off',

	// Strict Mode
	// These rules relate to strict mode directives:

	'strict': ['error', 'global'],

	// Variables
	// These rules relate to variable declarations:

	'init-declarations': 'off',
	'no-delete-var': 'off',
	'no-label-var': 'off',
	'no-restricted-globals': 'off',
	'no-shadow': 'off',
	'no-shadow-restricted-names': 'off',
	'no-undef': 'error',
	'no-undef-init': 'off',
	'no-undefined': 'off',
	'no-unused-vars': 'error',

	// Node.js and CommonJS
	// These rules relate to code running in Node.js, or in browsers with CommonJS:

	'callback-return': 'off',
	'global-require': 'off',
	'handle-callback-err': 'off',
	'no-buffer-constructor': 'off',
	'no-mixed-requires': 'off',
	'no-new-require': 'off',
	'no-path-concat': 'off',
	'no-process-env': 'off',
	'no-process-exit': 'off',
	'no-restricted-modules': 'off',
	'no-sync': 'off',

	// Stylistic Issues
	// These rules relate to style guidelines, and are therefore quite subjective:

	'array-bracket-newline': 'off',
	'array-bracket-spacing': ['error', 'never'],
	'array-element-newline': 'off',
	'block-spacing': ['error', 'always'],
	'brace-style': ['error', 'stroustrup'],
	'camelcase': ['warn', { 'properties': 'always' }],
	'capitalized-comments': 'off',
	'comma-dangle': ['error', 'always-multiline'],
	'comma-spacing': ['error', { 'before': false, 'after': true }],
	'comma-style': ['error', 'last'],
	'computed-property-spacing': 'off',
	'consistent-this': ['error', '_this'],
	'eol-last': 'off',
	'func-call-spacing': 'off',
	'func-name-matching': 'off',
	'prefer-exponentiation-operator': 'off',
	'default-param-last': 'off',
	'func-names': 'error',
	'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
	'function-paren-newline': 'off',
	'function-call-argument-newline': 'off',
	'id-blacklist': 'off',
	'id-length': 'off',
	'id-match': 'off',
	'implicit-arrow-linebreak': 'off',
	// 'indent': ['error', 'tab', { 'SwitchCase': 1 }],
	'jsx-quotes': ['error', 'prefer-double'],
	'key-spacing': 'off',
	'keyword-spacing': ['error', { 'before': true, 'after': true }],
	'line-comment-position': 'off',
	'linebreak-style': 'off',
	'lines-around-comment': 'off',
	'lines-between-class-members': 'off',
	'max-depth': 'off',
	'max-len': 'off',
	'max-lines': 'off',
	'max-lines-per-function': 'off',
	'max-nested-callbacks': 'off',
	'max-params': 'off',
	'max-statements': 'off',
	'max-statements-per-line': 'off',
	'multiline-comment-style': 'off',
	'multiline-ternary': 'off',
	'new-cap': 'off',
	'new-parens': 'off',
	'newline-per-chained-call': 'off',
	'no-array-constructor': 'off',
	'no-bitwise': 'off',
	'no-continue': 'off',
	'no-inline-comments': 'off',
	'no-lonely-if': 'off',
	'no-mixed-operators': 'off',
	'no-mixed-spaces-and-tabs': 'error',
	'no-multi-assign': 'off',
	'no-multiple-empty-lines': 'off',
	'no-negated-condition': 'off',
	'no-nested-ternary': 'off',
	'no-new-object': 'off',
	'no-plusplus': 'off',
	'no-restricted-syntax': 'off',
	'no-tabs': 'off',
	'no-ternary': 'off',
	'no-trailing-spaces': 'error',
	'no-underscore-dangle': 'off',
	'no-unneeded-ternary': 'off',
	'no-whitespace-before-property': 'off',
	'nonblock-statement-body-position': 'off',
	'object-curly-newline': 'off',
	'object-curly-spacing': 'off',
	'object-property-newline': 'off',
	'one-var': 'off',
	'one-var-declaration-per-line': 'off',
	'operator-assignment': 'off',
	'operator-linebreak': 'off',
	'padded-blocks': ['error', 'never'],
	'padding-line-between-statements': 'off',
	'prefer-object-spread': 'off',
	'quote-props': ['error', 'as-needed'],
	'quotes': ['error', 'single'],
	'semi': ['error', 'always'],
	'semi-spacing': 'off',
	'semi-style': 'off',
	'sort-keys': 'off',
	'sort-vars': 'off',
	'space-before-blocks': 'off',
	'space-before-function-paren': 'off',
	'space-in-parens': 'off',
	'space-infix-ops': 'error',
	'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],
	'spaced-comment': 'off',
	'switch-colon-spacing': 'off',
	'template-tag-spacing': 'off',
	'unicode-bom': 'off',
	'wrap-regex': 'off',

	// ECMAScript 6
	// These rules relate to ES6, also known as ES2015:

	'arrow-body-style': 'off',
	'arrow-parens': ['error', 'always'],
	'arrow-spacing': ['error', { 'before': true, 'after': true }],
	'constructor-super': 'off',
	'generator-star-spacing': 'off',
	'no-class-assign': 'off',
	'no-confusing-arrow': 'off',
	'no-const-assign': 'error',
	'no-dupe-class-members': 'off',
	'no-duplicate-imports': 'off',
	'no-new-symbol': 'off',
	'no-restricted-imports': [
		'error',
		{
		  'paths': [
			{
			  'name': 'react-icons-kit/entypo',
			  'message': 'Please use react-icons-kit/entypo/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/fa',
			  'message': 'Please use react-icons-kit/fa/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/feather',
			  'message': 'Please use react-icons-kit/feather/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/icomoon',
			  'message': 'Please use react-icons-kit/icomoon/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/iconic',
			  'message': 'Please use react-icons-kit/iconic/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/ikons',
			  'message': 'Please use react-icons-kit/ikons/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/ionicons',
			  'message': 'Please use react-icons-kit/ionicons/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/linea',
			  'message': 'Please use react-icons-kit/linea/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/md',
			  'message': 'Please use react-icons-kit/md/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/metrize',
			  'message': 'Please use react-icons-kit/metrize/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/noto_emoji_regular',
			  'message': 'Please use react-icons-kit/noto_emoji_regular/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/oct',
			  'message': 'Please use react-icons-kit/oct/your-icon instead.'
			},
			{
			  'name': 'react-icons-kit/typicons',
			  'message': 'Please use react-icons-kit/typicons/your-icon instead.'
			}
		  ]
		}
	  ],
	'no-this-before-super': 'off',
	'no-useless-computed-key': 'off',
	'no-useless-constructor': 'off',
	'no-useless-rename': 'off',
	'no-var': 'error',
	'object-shorthand': 'error',
	'prefer-arrow-callback': 'off',
	'prefer-const': 'error',
	'prefer-destructuring': 'off',
	'prefer-numeric-literals': 'off',
	'prefer-rest-params': 'off',
	'prefer-spread': 'off',
	'prefer-template': 'error',
	'require-yield': 'off',
	'rest-spread-spacing': 'off',
	'sort-imports': 'off',
	'symbol-description': 'off',
	'template-curly-spacing': 'off',
	'yield-star-spacing': 'off',

	'react/jsx-newline': 'off',
	'react/jsx-no-constructed-context-values': 'warn', // TODO: Should be addressed asap
	'react/boolean-prop-naming': 'off', // Enforces consistent naming for boolean props
	'react/button-has-type': 'off', // Forbid 'button' element without an explicit 'type' attribute
	'react/default-props-match-prop-types': 'off', // Prevent extraneous defaultProps on components
	'react/destructuring-assignment': 'off', // Rule enforces consistent usage of destructuring assignment in component
	'react/display-name': 'error', // Prevent missing displayName in a React component definition
	'react/forbid-component-props': 'off', // Forbid certain props on Components
	'react/forbid-dom-props': 'off', // Forbid certain props on DOM Nodes
	'react/forbid-elements': 'off', // Forbid certain elements
	'react/forbid-prop-types': 'off', // Forbid certain propTypes
	'react/forbid-foreign-prop-types': 'off', // Forbid foreign propTypes
	'react/no-access-state-in-setstate': 'off', // Prevent using this.state inside this.setState
	'react/no-array-index-key': 'off', // Prevent using Array index in key props
	'react/no-children-prop': 'off', // Prevent passing children as props
	'react/no-danger': 'off', // Prevent usage of dangerous JSX properties
	'react/no-danger-with-children': 'off', // Prevent problem with children and props.dangerouslySetInnerHTML
	'react/no-deprecated': 'off', // Prevent usage of deprecated methods, including component lifecyle methods
	'react/no-did-mount-set-state': 'error', // Prevent usage of setState in componentDidMount
	'react/no-did-update-set-state': 'error', // Prevent usage of setState in componentDidUpdate
	'react/no-direct-mutation-state': 'off', // Prevent direct mutation of this.state
	'react/no-find-dom-node': 'off', // Prevent usage of findDOMNode
	'react/no-is-mounted': 'off', // Prevent usage of isMounted
	'react/no-multi-comp': 'off', // Prevent multiple component definition per file
	'react/no-redundant-should-component-update': 'off', // Prevent usage of shouldComponentUpdate when extending React.PureComponent
	'react/no-render-return-value': 'off', // Prevent usage of the return value of React.render
	'react/no-set-state': 'off', // Prevent usage of setState
	'react/no-typos': 'off', // Prevent common casing typos
	'react/no-string-refs': 'off', // Prevent using string references in ref attribute.
	'react/no-this-in-sfc': 'off', // Prevent using this in stateless functional components
	'react/no-unescaped-entities': 'off', // Prevent invalid characters from appearing in markup
	'react/no-unknown-property': 'error', // Prevent usage of unknown DOM property (fixable)
	'react/no-unsafe': 'off', // Prevent usage of unsafe lifecycle methods
	'react/no-unused-prop-types': 'off', // Prevent definitions of unused prop types
	'react/no-unused-state': 'off', // Prevent definitions of unused state properties
	'react/no-will-update-set-state': 'off', // Prevent usage of setState in componentWillUpdate
	'react/prefer-es6-class': 'off', // Enforce ES5 or ES6 class for React Components
	'react/prefer-stateless-function': 'off', // Enforce stateless React Components to be written as a pure function
	'react/prop-types': 'error', // Prevent missing props validation in a React component definition
	'react/react-in-jsx-scope': 'off', // Prevent missing React when using JSX
	'react/jsx-props-no-spreading': 'off',
	'react/jsx-curly-newline': 'off',
	'react/static-property-placement': 'off',
	'react/require-default-props': 'off', // Enforce a defaultProps definition for every prop that is not a required prop
	'react/require-optimization': 'off', // Enforce React components to have a shouldComponentUpdate method
	'react/require-render-return': 'off', // Enforce ES5 or ES6 class for returning value in render function
	'react/self-closing-comp': 'off', // Prevent extra closing tags for components without children (fixable)
	'react/sort-comp': [ // Enforce component methods order (fixable)
		'error',
		{
			'order': [
				'lifecycle',
				'/^memoized.+$/',
				'render',
				'/^render.+$/',
				'everything-else'
			],
			'groups': {
				'lifecycle': [
					'statics',
					'displayName',
					'mixins',
					'permissions',
					'cursors',
					'facets',
					'validationSchema',
					'propTypes',
					'defaultProps',
					'contextType',
					'childContextTypes',
					'state',
					'constructor',
					'getDefaultProps',
					'getDefaultState',
					'getInitialState',
					'getChildContext',
					'componentWillMount',
					'componentWillReceiveProps',
					'UNSAFE_componentWillMount',
					'UNSAFE_componentWillReceiveProps',
					'UNSAFE_componentWillUpdate',
					'componentDidMount',
					'getDerivedStateFromProps',
					'shouldComponentUpdate',
					'componentWillUpdate',
					'componentDidUpdate',
					'componentWillUnmount'
				]
			}
		}
	],
	'react/sort-prop-types': 'off', // Enforce propTypes declarations alphabetical sorting
	'react/state-in-constructor': 'off', // Enforce the state initialization style to be either in a constructor or with a class property
	'react/style-prop-object': 'off', // Enforce style prop value being an object
	'react/void-dom-elements-no-children': 'off', // Prevent void DOM elements (e.g. <img />, <br />) from receiving children

	// Plugin: React (JSX-specific rules)

	'react/jsx-boolean-value': 'off', // Enforce boolean attributes notation in JSX (fixable)
	'react/jsx-child-element-spacing': 'off', // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions.
	'react/jsx-closing-bracket-location': 'off', // Validate closing bracket location in JSX (fixable)
	'react/jsx-closing-tag-location': 'off', // Validate closing tag location in JSX (fixable)
	'react/jsx-curly-spacing': 'off', // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions (fixable)
	'react/jsx-equals-spacing': 'off', // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
	'react/jsx-filename-extension': 'off', // Restrict file extensions that may contain JSX
	'react/jsx-first-prop-new-line': ['error', 'multiline'], // Enforce position of the first prop in JSX (fixable)
	'react/jsx-handler-names': 'off', // Enforce event handler naming conventions in JSX
	'react/jsx-indent': 'off', // Validate JSX indentation (fixable)
	'react/jsx-indent-props': 'off', // Validate props indentation in JSX (fixable)
	'react/jsx-key': 'off', // Validate JSX has key prop when in array or iterator
	'react/jsx-max-depth': 'off', // Validate JSX maximum depth
	'react/jsx-max-props-per-line': 'off', // Limit maximum of props on a single line in JSX (fixable)
	'react/jsx-no-bind': 'off', // Prevent usage of .bind() and arrow functions in JSX props
	'react/jsx-no-comment-textnodes': 'off', // Prevent comments from being inserted as text nodes
	'react/jsx-no-duplicate-props': 'error', // Prevent duplicate props in JSX
	'react/jsx-no-literals': 'off', // Prevent usage of unwrapped JSX strings
	'react/jsx-no-target-blank': 'off', // Prevent usage of unsafe target='_blank'
	'react/jsx-no-useless-fragment': 'off', // Prevent usage of unsafe target='_blank'
	'react/jsx-no-undef': 'error', // Disallow undeclared variables in JSX
	'react/jsx-one-expression-per-line': 'off', // Limit to one expression per line in JSX
	'react/jsx-curly-brace-presence': 'off', // Enforce curly braces or disallow unnecessary curly braces in JSX
	'react/jsx-fragments': 'off', // Enforce shorthand or standard form for React fragments
	'react/jsx-pascal-case': 'off', // Enforce PascalCase for user-defined JSX components
	'react/jsx-props-no-multi-spaces': 'off', // Disallow multiple spaces between inline JSX props (fixable)
	'react/jsx-sort-default-props': 'off', // Enforce default props alphabetical sorting
	'react/jsx-sort-props': 'off', // Enforce props alphabetical sorting (fixable)
	'react/jsx-space-before-closing': 'off', // Validate spacing before closing bracket in JSX (fixable)
	'react/jsx-tag-spacing': 'off', // Validate whitespace in and around the JSX opening and closing brackets (fixable)
	'react/jsx-uses-react': 'error', // Prevent React to be incorrectly marked as unused
	'react/jsx-uses-vars': 'error', // Prevent variables used in JSX to be incorrectly marked as unused
	'react/jsx-wrap-multilines': ['error',
		{
			'declaration': 'parens-new-line',
			'assignment': 'parens-new-line',
			'return': 'parens-new-line',
			'arrow': 'parens-new-line',
			'condition': 'ignore',
			'logical': 'ignore',
			'prop': 'ignore'
		}
	], // Prevent missing parentheses around multi-lines JSX (fixable)

	'immutable/no-let': 'off',
	'immutable/no-this': 'off',
	'immutable/no-mutation': 'error'
};

module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		'ecmaVersion': 2020,
		'sourceType': 'module',
		'project': './tsconfig.*?.json'
	},
	ignorePatterns: ['node_modules/*', '!.prettierrc.js'], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
	plugins: [
		'@typescript-eslint',
		'react',
		'@nrwl/nx'
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint'
	],
	overrides: [
		{
			files: ['*.specs.ts', '*.specs.tsx'],
			globals: {
				'shallow': false,
				'mount': false,
				'render': false,
				'toJson': false
			}
		},
		{
			files: ['*.ts', '*.tsx'],
			plugins: [
				'@typescript-eslint'
			],
			rules
		}
	]
}
