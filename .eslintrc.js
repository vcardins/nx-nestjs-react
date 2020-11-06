/* eslint-disable immutable/no-mutation */
module.exports = {
	env: {
		browser: true,
		node: true,
		jest: true,
		es6: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		project: './tsconfig.*?.json',
	},
	plugins: [
		'@typescript-eslint',
		'sonarjs',
		'immutable',
	],
	globals: {
		globalThis: false, // means it is not writeable
	},
	extends: [
		'eslint:all',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	rules: {
		// TypeScript
		// These rules are powered by the @typescript-eslint plugin and may affect Javascript files.

		indent: 'off', // This ESLint rule needs to be disabled for the next TSLint rule os same name to work properly.
		'@typescript-eslint/indent': ['error', 'tab', { SwitchCase: 1 }], // Enforce consistent indentation (indent from TSLint)
		'@typescript-eslint/adjacent-overload-signatures': 'off', // Require that member overloads be consecutive (adjacent-overload-signatures from TSLint)
		'@typescript-eslint/array-type': 'off', // Requires using either T[] or Array<T> for arrays (array-type from TSLint)
		'@typescript-eslint/ban-types': 'off', // Enforces that types will not to be used (ban-types from TSLint)
		'@typescript-eslint/ban-ts-ignore': 'off', // Bans “// @ts-ignore” comments from being used (ban-ts-ignore from TSLint)
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/camelcase': 'off', // Enforce camelCase naming convention
		'@typescript-eslint/class-name-casing': 'off', // Require PascalCased class and interface names (class-name from TSLint)
		'@typescript-eslint/explicit-function-return-type': 'off', // Require explicit return types on functions and class methods
		'@typescript-eslint/explicit-member-accessibility': 'off', // Require explicit accessibility modifiers on class properties and methods (member-access from TSLint)
		'@typescript-eslint/generic-type-naming': 'off', // Enforces naming of generic type variables
		'@typescript-eslint/no-empty-function': 'off', // Empty functions can reduce readability because readers need to guess whether it’s intentional or not.
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
		'@typescript-eslint/no-parameter-properties': 'off', // Disallow the use of parameter properties in class constructors. (no-parameter-properties from TSLint)
		'@typescript-eslint/no-require-imports': 'off', // Disallows invocation of require() (no-require-imports from TSLint)
		'@typescript-eslint/no-this-alias': 'off', // Disallow aliasing this (no-this-assignment from TSLint)
		'@typescript-eslint/no-triple-slash-reference': 'off', // Disallow /// <reference path="" /> comments (no-reference from TSLint)
		'@typescript-eslint/no-type-alias': 'off', // Disallow the use of type aliases (interface-over-type-literal from TSLint)
		'@typescript-eslint/no-unnecessary-qualifier': 'off', // Warns when a namespace qualifier is unnecessary (no-unnecessary-qualifier from TSLint)
		'@typescript-eslint/no-unnecessary-type-assertion': 'off', // Warns if a type assertion does not change the type of an expression (no-unnecessary-type-assertion from TSLint)
		// '@typescript-eslint/no-unused-vars': 'error', // Disallow unused variables (no-unused-variable from TSLint)
		'@typescript-eslint/no-use-before-define': 'off', // Disallow the use of variables before they are defined
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
		'@typescript-eslint/unified-signatures': 'off', // Warns for any two overloads that could be unified into one. (unified-signatures from TSLint): "off", // ": "off", //

		// Possible Errors
		// These rules relate to possible syntax or logic errors in JavaScript code:

		'for-direction': 'off', // enforce “for” loop update clause moving the counter in the right direction.
		'getter-return': 'off', // enforce return statements in getters
		'no-async-promise-executor': 'off', // disallow using an async function as a Promise executor
		'no-await-in-loop': 'off', // disallow await inside of loops
		'no-compare-neg-zero': 'off', // disallow comparing against -0
		'no-cond-assign': ['error', 'except-parens'], // disallow assignment operators in conditional expressions
		'no-console': ['error', { allow: ['error'] }], // disallow the use of console
		'no-constant-condition': 'off', // disallow constant expressions in conditions
		'no-control-regex': 'off', // disallow control characters in regular expressions
		'no-debugger': 'error', // disallow the use of debugger
		'no-dupe-args': 'error', // disallow duplicate arguments in function definitions
		'no-dupe-keys': 'error', // disallow duplicate keys in object literals
		'no-duplicate-case': 'error', // disallow duplicate case labels
		'no-empty': 'off', // disallow empty block statements
		'no-empty-character-class': 'off', // disallow empty character classes in regular expressions
		'no-ex-assign': 'off', // disallow reassigning exceptions in catch clauses
		'no-extra-boolean-cast': 'off', // disallow unnecessary boolean casts
		'no-extra-parens': 'off', // disallow unnecessary parentheses
		'no-extra-semi': 'off', // disallow unnecessary semicolons
		'no-func-assign': 'off', // disallow reassigning function declarations
		'no-inner-declarations': 'off', // disallow variable or function declarations in nested blocks
		'no-invalid-regexp': 'off', // disallow invalid regular expression strings in RegExp constructors
		'no-irregular-whitespace': 'off', // disallow irregular whitespace
		'no-misleading-character-class': 'off', // disallow characters which are made with multiple code points in character class syntax
		'no-obj-calls': 'off', // disallow calling global object properties as functions
		'no-prototype-builtins': 'off', // disallow calling some Object.prototype methods directly on objects
		'no-regex-spaces': 'off', // disallow multiple spaces in regular expressions
		'no-sparse-arrays': 'off', // disallow sparse arrays
		'no-template-curly-in-string': 'off', // disallow template literal placeholder syntax in regular strings
		'no-unexpected-multiline': 'off', // disallow confusing multiline expressions
		'no-unreachable': 'error', // disallow unreachable code after return, throw, continue, and break statements
		'no-unsafe-finally': 'off', // disallow control flow statements in finally blocks
		'no-unsafe-negation': 'off', // disallow negating the left operand of relational operators
		'require-atomic-updates': 'off', // disallow assignments that can lead to race conditions due to usage of await or yield
		'use-isnan': 'off', // require calls to isNaN() when checking for NaN
		'valid-typeof': 'error', // enforce comparing typeof expressions against valid strings

		// Best Practices
		// These rules relate to better ways of doing things to help you avoid problems:

		'accessor-pairs': 'off', // enforce getter and setter pairs in objects
		'array-callback-return': 'off', // enforce return statements in callbacks of array methods
		'block-scoped-var': 'off', // enforce the use of variables within the scope they are defined
		'class-methods-use-this': 'off', // enforce that class methods utilize this
		complexity: 'off', // enforce a maximum cyclomatic complexity allowed in a program
		'consistent-return': 'off', // require return statements to either always or never specify values
		curly: 'off', // enforce consistent brace style for all control statements
		'default-case': 'off', // require default cases in switch statements
		'dot-location': ['error', 'property'], // enforce consistent newlines before and after dots
		'dot-notation': 'off', // enforce dot notation whenever possible
		eqeqeq: ['error', 'allow-null'], // require the use of === and !==
		'guard-for-in': 'off', // require for-in loops to include an if statement
		'max-classes-per-file': 'off', // enforce a maximum number of classes per file
		'no-alert': 'off', // disallow the use of alert, confirm, and prompt
		'no-caller': 'off', // disallow the use of arguments.caller or arguments.callee
		'no-case-declarations': 'off', // disallow lexical declarations in case clauses
		'no-div-regex': 'off', // disallow division operators explicitly at the beginning of regular expressions
		'no-else-return': 'error', // disallow else blocks after return statements in if statements
		'no-empty-function': 'off', // disallow empty functions
		'no-empty-pattern': 'off', // disallow empty destructuring patterns
		'no-eq-null': 'off', // disallow null comparisons without type-checking operators
		'no-eval': 'off', // disallow the use of eval()
		'no-extend-native': 'off', // disallow extending native types
		'no-extra-bind': 'off', // disallow unnecessary calls to .bind()
		'no-extra-label': 'off', // disallow unnecessary labels
		'no-fallthrough': 'off', // disallow fallthrough of case statements
		'no-floating-decimal': 'off', // disallow leading or trailing decimal points in numeric literals
		'no-global-assign': 'off', // disallow assignments to native objects or read-only global variables
		'no-implicit-coercion': 'off', // disallow shorthand type conversions
		'no-implicit-globals': 'off', // disallow variable and function declarations in the global scope
		'no-implied-eval': 'off', // disallow the use of eval()-like methods
		'no-invalid-this': 'off', // disallow this keywords outside of classes or class-like objects
		'no-iterator': 'off', // disallow the use of the __iterator__ property
		'no-labels': 'off', // disallow labeled statements
		'no-lone-blocks': 'off', // disallow unnecessary nested blocks
		'no-loop-func': 'off', // disallow function declarations and expressions inside loop statements
		'no-magic-numbers': 'off', // disallow magic numbers
		'no-multi-spaces': 'off', // disallow multiple spaces
		'no-multi-str': 'off', // disallow multiline strings
		'no-new': 'off', // disallow new operators outside of assignments or comparisons
		'no-new-func': 'off', // disallow new operators with the Function object
		'no-new-wrappers': 'off', // disallow new operators with the String, Number, and Boolean objects
		'no-octal': 'off', // disallow octal literals
		'no-octal-escape': 'off', // disallow octal escape sequences in string literals
		'no-param-reassign': 'error', // disallow reassigning function parameters
		'no-proto': 'off', // disallow the use of the __proto__ property
		'no-redeclare': 'off', // disallow variable redeclaration
		'no-restricted-properties': 'off', // disallow certain properties on certain objects
		'no-return-assign': 'off', // disallow assignment operators in return statements
		'no-return-await': 'off', // disallow unnecessary return await
		'no-script-url': 'off', // disallow javascript: urls
		'no-self-assign': 'off', // disallow assignments where both sides are exactly the same
		'no-self-compare': 'off', // disallow comparisons where both sides are exactly the same
		'no-sequences': 'off', // disallow comma operators
		'no-throw-literal': 'off', // disallow throwing literals as exceptions
		'no-unmodified-loop-condition': 'off', // disallow unmodified loop conditions
		'no-unused-expressions': 'off', // disallow unused expressions
		'no-unused-labels': 'off', // disallow unused labels
		'no-useless-call': 'off', // disallow unnecessary calls to .call() and .apply()
		'no-useless-catch': 'off', // disallow unnecessary catch clauses
		'no-useless-concat': 'off', // disallow unnecessary concatenation of literals or template literals
		'no-useless-escape': 'off', // disallow unnecessary escape characters
		'no-useless-return': 'off', // disallow redundant return statements
		'no-void': 'off', // disallow void operators
		'no-warning-comments': 'off', // disallow specified warning terms in comments
		'no-with': 'off', // disallow with statements
		'prefer-named-capture-group': 'off',
		'prefer-promise-reject-errors': 'off', // require using Error objects as Promise rejection reasons
		radix: 'error', // enforce the consistent use of the radix argument when using parseInt()
		'require-await': 'off', // disallow async functions which have no await expression
		'require-unicode-regexp': 'off', // enforce the use of u flag on RegExp
		'vars-on-top': 'off', // require var declarations be placed at the top of their containing scope
		'wrap-iife': 'off', // require parentheses around immediate function invocations
		yoda: 'off', // require or disallow “Yoda” conditions

		// Strict Mode
		// These rules relate to strict mode directives:

		strict: ['error', 'global'], // require or disallow strict mode directives

		// Variables
		// These rules relate to variable declarations:

		'init-declarations': 'off', // require or disallow initialization in variable declarations
		'no-delete-var': 'off', // disallow deleting variables
		'no-label-var': 'off', // disallow labels that share a name with a variable
		'no-restricted-globals': 'off', // disallow specified global variables
		'no-shadow': 'off', // disallow variable declarations from shadowing variables declared in the outer scope
		'no-shadow-restricted-names': 'off', // disallow identifiers from shadowing restricted names
		'no-undef': 'error', // disallow the use of undeclared variables unless mentioned in /*global */ comments
		'no-undef-init': 'off', // disallow initializing variables to undefined
		'no-undefined': 'off', // disallow the use of undefined as an identifier
		'no-unused-vars': 'error', // disallow unused variables
		'no-use-before-define': ['error', 'nofunc'], // disallow the use of variables before they are defined

		// Node.js and CommonJS
		// These rules relate to code running in Node.js, or in browsers with CommonJS:

		'callback-return': 'off', // require return statements after callbacks
		'global-require': 'off', // require require() calls to be placed at top-level module scope
		'handle-callback-err': 'off', // require error handling in callbacks
		'no-buffer-constructor': 'off', // disallow use of the Buffer() constructor
		'no-mixed-requires': 'off', // disallow require calls to be mixed with regular variable declarations
		'no-new-require': 'off', // disallow new operators with calls to require
		'no-path-concat': 'off', // disallow string concatenation with __dirname and __filename
		'no-process-env': 'off', // disallow the use of process.env
		'no-process-exit': 'off', // disallow the use of process.exit()
		'no-restricted-modules': 'off', // disallow specified modules when loaded by require
		'no-sync': 'off', // disallow synchronous methods

		// Stylistic Issues
		// These rules relate to style guidelines, and are therefore quite subjective:

		'array-bracket-newline': 'off', // enforce linebreaks after opening and before closing array brackets
		'array-bracket-spacing': ['error', 'never'], // enforce consistent spacing inside array brackets
		'array-element-newline': 'off', // enforce line breaks after each array element
		'block-spacing': ['error', 'always'], // disallow or enforce spaces inside of blocks after opening block and before closing block
		'brace-style': ['error', 'stroustrup'], // enforce consistent brace style for blocks
		camelcase: ['error', { properties: 'always', allow: ['^UNSAFE_'] }], // enforce camelcase naming convention
		'capitalized-comments': 'off', // enforce or disallow capitalization of the first letter of a comment
		'comma-dangle': ['error', 'always-multiline'], // require or disallow trailing commas
		'comma-spacing': ['error', { before: false, after: true }], // enforce consistent spacing before and after commas
		'comma-style': ['error', 'last'], // enforce consistent comma style
		'computed-property-spacing': 'off', // enforce consistent spacing inside computed property brackets
		'consistent-this': ['error', '_this'], // enforce consistent naming when capturing the current execution context
		'eol-last': 'off', // require or disallow newline at the end of files
		'func-call-spacing': 'off', // require or disallow spacing between function identifiers and their invocations
		'func-name-matching': 'off', // require function names to match the name of the variable or property to which they are assigned
		'prefer-exponentiation-operator': 'off',
		'default-param-last': 'off',
		'func-names': 'error', // require or disallow named function expressions
		'func-style': ['error', 'declaration', { allowArrowFunctions: true }], // enforce the consistent use of either function declarations or expressions
		'function-paren-newline': 'off', // enforce consistent line breaks inside function parentheses
		'function-call-argument-newline': 'off', // enforce consistent line breaks inside function parentheses
		'id-blacklist': 'off', // disallow specified identifiers
		'id-length': 'off', // enforce minimum and maximum identifier lengths
		'id-match': 'off', // require identifiers to match a specified regular expression
		'implicit-arrow-linebreak': 'off', // enforce the location of arrow function bodies
		// "indent": ["error", "tab", { "SwitchCase": 1 }], // enforce consistent indentation
		'jsx-quotes': ['error', 'prefer-double'], // enforce the consistent use of either double or single quotes in JSX attributes
		'key-spacing': 'off', // enforce consistent spacing between keys and values in object literal properties
		'keyword-spacing': ['error', { before: true, after: true }], // enforce consistent spacing before and after keywords
		'line-comment-position': 'off', // enforce position of line comments
		'linebreak-style': 'off', // enforce consistent linebreak style
		'lines-around-comment': 'off', // require empty lines around comments
		'lines-between-class-members': 'off', // require or disallow an empty line between class members
		'max-depth': 'off', // enforce a maximum depth that blocks can be nested
		'max-len': 'off', // enforce a maximum line length
		'max-lines': 'off', // enforce a maximum number of lines per file
		'max-lines-per-function': 'off', // enforce a maximum number of line of code in a function
		'max-nested-callbacks': 'off', // enforce a maximum depth that callbacks can be nested
		'max-params': 'off', // enforce a maximum number of parameters in function definitions
		'max-statements': 'off', // enforce a maximum number of statements allowed in function blocks
		'max-statements-per-line': 'off', // enforce a maximum number of statements allowed per line
		'multiline-comment-style': 'off', // enforce a particular style for multiline comments
		'multiline-ternary': 'off', // enforce newlines between operands of ternary expressions
		'new-cap': 'off', // require constructor names to begin with a capital letter
		'new-parens': 'off', // require parentheses when invoking a constructor with no arguments
		'newline-per-chained-call': 'off', // require a newline after each call in a method chain
		'no-array-constructor': 'off', // disallow Array constructors
		'no-bitwise': 'off', // disallow bitwise operators
		'no-continue': 'off', // disallow continue statements
		'no-inline-comments': 'off', // disallow inline comments after code
		'no-lonely-if': 'off', // disallow if statements as the only statement in else blocks
		'no-mixed-operators': 'off', // disallow mixed binary operators
		'no-mixed-spaces-and-tabs': 'error', // disallow mixed spaces and tabs for indentation
		'no-multi-assign': 'off', // disallow use of chained assignment expressions
		'no-multiple-empty-lines': 'off', // disallow multiple empty lines
		'no-negated-condition': 'off', // disallow negated conditions
		'no-nested-ternary': 'off', // disallow nested ternary expressions
		'no-new-object': 'off', // disallow Object constructors
		'no-plusplus': 'off', // disallow the unary operators ++ and --
		'no-restricted-syntax': 'off', // disallow specified syntax
		'no-tabs': 'off', // disallow all tabs
		'no-ternary': 'off', // disallow ternary operators
		'no-trailing-spaces': 'error', // disallow trailing whitespace at the end of lines
		'no-underscore-dangle': 'off', // disallow dangling underscores in identifiers
		'no-unneeded-ternary': 'off', // disallow ternary operators when simpler alternatives exist
		'no-whitespace-before-property': 'off', // disallow whitespace before properties
		'nonblock-statement-body-position': 'off', // enforce the location of single-line statements
		'object-curly-newline': 'off', // enforce consistent line breaks inside braces
		'object-curly-spacing': 'off', // enforce consistent spacing inside braces
		'object-property-newline': 'off', // enforce placing object properties on separate lines
		'one-var': 'off', // enforce variables to be declared either together or separately in functions
		'one-var-declaration-per-line': 'off', // require or disallow newlines around variable declarations
		'operator-assignment': 'off', // require or disallow assignment operator shorthand where possible
		'operator-linebreak': 'off', // enforce consistent linebreak style for operators
		'padded-blocks': ['error', 'never'], // require or disallow padding within blocks
		'padding-line-between-statements': 'off', // require or disallow padding lines between statements
		'prefer-object-spread': 'off', // disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.
		'quote-props': ['error', 'as-needed'], // require quotes around object literal property names
		quotes: ['error', 'single'], // enforce the consistent use of either backticks, double, or single quotes
		semi: ['error', 'always'], // require or disallow semicolons instead of ASI
		'semi-spacing': 'off', // enforce consistent spacing before and after semicolons
		'semi-style': 'off', // enforce location of semicolons
		'sort-keys': 'off', // require object keys to be sorted
		'sort-vars': 'off', // require variables within the same declaration block to be sorted
		'space-before-blocks': 'off', // enforce consistent spacing before blocks
		'space-before-function-paren': 'off', // enforce consistent spacing before function definition opening parenthesis
		'space-in-parens': 'off', // enforce consistent spacing inside parentheses
		'space-infix-ops': 'error', // require spacing around infix operators
		'space-unary-ops': ['error', { words: true, nonwords: false }], // enforce consistent spacing before or after unary operators
		'spaced-comment': 'off', // enforce consistent spacing after the // or /* in a comment
		'switch-colon-spacing': 'off', // enforce spacing around colons of switch statements
		'template-tag-spacing': 'off', // require or disallow spacing between template tags and their literals
		'unicode-bom': 'off', // require or disallow Unicode byte order mark (BOM)
		'wrap-regex': 'off', // require parenthesis around regex literals

		// ECMAScript 6
		// These rules relate to ES6, also known as ES2015:

		'arrow-body-style': 'off', // require braces around arrow function bodies
		'arrow-parens': ['error', 'always'], // require parentheses around arrow function arguments
		'arrow-spacing': ['error', { before: true, after: true }], // enforce consistent spacing before and after the arrow in arrow functions
		'constructor-super': 'off', // require super() calls in constructors
		'generator-star-spacing': 'off', // enforce consistent spacing around * operators in generator functions
		'no-class-assign': 'off', // disallow reassigning class members
		'no-confusing-arrow': 'off', // disallow arrow functions where they could be confused with comparisons
		'no-const-assign': 'error', // disallow reassigning const variables
		'no-dupe-class-members': 'off', // disallow duplicate class members
		'no-duplicate-imports': 'off', // disallow duplicate module imports
		'no-new-symbol': 'off', // disallow new operators with the Symbol object
		'no-restricted-imports': 'off', // disallow specified modules when loaded by import
		'no-this-before-super': 'off', // disallow this/super before calling super() in constructors
		'no-useless-computed-key': 'off', // disallow unnecessary computed property keys in object literals
		'no-useless-constructor': 'off', // disallow unnecessary constructors
		'no-useless-rename': 'off', // disallow renaming import, export, and destructured assignments to the same name
		'no-var': 'error', // require let or const instead of var
		'object-shorthand': 'error', // require or disallow method and property shorthand syntax for object literals
		'prefer-arrow-callback': 'off', // require using arrow functions for callbacks
		'prefer-const': 'error', // require const declarations for variables that are never reassigned after declared
		'prefer-destructuring': 'off', // require destructuring from arrays and/or objects
		'prefer-numeric-literals': 'off', // disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals
		'prefer-rest-params': 'off', // require rest parameters instead of arguments
		'prefer-spread': 'off', // require spread operators instead of .apply()
		'prefer-template': 'error', // require template literals instead of string concatenation
		'require-yield': 'off', // require generator functions to contain yield
		'rest-spread-spacing': 'off', // enforce spacing between rest and spread operators and their expressions
		'sort-imports': 'off', // enforce sorted import declarations within modules
		'symbol-description': 'off', // require symbol descriptions
		'template-curly-spacing': 'off', // require or disallow spacing around embedded expressions of template strings
		'yield-star-spacing': 'off', // require or disallow spacing around the * in yield* expressions

		// Plugin: SonarJS
		// Rules for ESLint detecting bugs and suspicious patterns in your code.

		// Bug Detection
		// Rules in this category aim to find places in code which have a high chance to be bugs, i.e. don't work as indented.

		'sonarjs/no-all-duplicated-branches': 'warn', // All branches in a conditional structure should not have exactly the same implementation
		'sonarjs/no-element-overwrite': 'warn', // Collection elements should not be replaced unconditionally
		'sonarjs/no-extra-arguments': 'warn', // Function calls should not pass extra arguments
		'sonarjs/no-identical-conditions': 'warn', // Related "if/else if" statements should not have the same condition
		'sonarjs/no-identical-expressions': 'warn', // Identical expressions should not be used on both sides of a binary operator
		'sonarjs/no-one-iteration-loop': 'warn', // Loops with at most one iteration should be refactored
		'sonarjs/no-use-of-empty-return-value': 'warn', // The output of functions that don't return anything should not be used

		// Code Smell Detection
		// Code Smells, or maintainability issues, are raised for places of code which might be costly to change in the future. These rules also help to keep the high code quality and readability. And finally some rules report issues on different suspicious code patters.

		'sonarjs/cognitive-complexity': 'warn', // Cognitive Complexity of functions should not be too high
		'sonarjs/max-switch-cases': 'warn', // "switch" statements should not have too many "case" clauses
		'sonarjs/no-duplicate-string': 'warn', // String literals should not be duplicated
		'sonarjs/no-duplicated-branches': 'warn', // Two branches in a conditional structure should not have exactly the same implementation
		'sonarjs/no-identical-functions': 'warn', // Functions should not have identical implementations
		'sonarjs/no-inverted-boolean-check': 'warn', // Boolean checks should not be inverted
		'sonarjs/no-redundant-boolean': 'warn', // Boolean literals should not be redundant
		'sonarjs/no-small-switch': 'warn', // "switch" statements should have at least 3 "case" clauses
		'sonarjs/no-useless-catch': 'warn', // "catch" clauses should do more than rethrow
		'sonarjs/prefer-immediate-return': 'warn', // Local variables should not be declared and then immediately returned or thrown
		'sonarjs/prefer-object-literal': 'warn', // Object literal syntax should be used
		'sonarjs/prefer-single-boolean-return': 'warn', // Return of boolean expressions should not be wrapped into an "if-then-else" statement
		'sonarjs/prefer-while': 'warn', // A "while" loop should be used instead of a "for" loop
		'immutable/no-let': 'off',
		'immutable/no-this': 'off',
		'immutable/no-mutation': 'error',
	},
	overrides: [
		{
			files: ['*.js', '*.test.ts'],
			globals: {
				shallow: false,
				mount: false,
				render: false,
				toJson: false,
			},
		},
		{
			files: ['*.js', '*.ts'],
			rules: {
				'default-param-last': 'off',
				'prefer-exponentiation-operator': 'off',
			},
		},
		{
			files: ['*.ts'],
		},
	],
};
