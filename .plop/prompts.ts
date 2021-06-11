import {
	Question,
	CheckboxQuestion,
	ListQuestion,
	ConfirmQuestion,
	InputQuestion,
	ExpandQuestion,
	EditorQuestion,
	RawListQuestion,
	PasswordQuestion,
	NumberQuestion,
	Inquirer,
	Answers,
} from 'inquirer';
import { isReactNative } from './helpers';

type DynamicPromptsFunction = (inquirer: Inquirer) => Promise<Answers>;

type PromptQuestion =
	| Question
	| CheckboxQuestion
	| ListQuestion
	| ExpandQuestion
	| ConfirmQuestion
	| EditorQuestion
	| RawListQuestion
	| PasswordQuestion
	| NumberQuestion
	| InputQuestion;

export type Prompts = DynamicPromptsFunction | PromptQuestion[];
export enum ModuleType {
	Solution = 'solution',
	Module = 'module',
	Component = 'component',
	Container = 'container',
} ;

export const prompts: Prompts = [
	{
		name: 'type',
		type: 'list',
		message: 'What\'s the module type?',
		choices: Object.keys(ModuleType).map((name) => ({ name, value: ModuleType[name] })),
	},
	{
		name: 'name',
		type: 'input',
		message: ({ type }) => {
			switch (type) {
				case ModuleType.Solution: return 'What\'s the solution name';
				case ModuleType.Module: return 'What\'s the module name';
				default: return 'What\'s the file name';
			}
		},
	},
	{
		name: 'options',
		type: 'checkbox',
		when: ({ type }) => type === ModuleType.Component,
		choices: [
			{
				name: 'SCSS module',
				value: 'scss',
				disabled: isReactNative,
			},
			{
				name: 'CSS module',
				value: 'css',
				disabled: isReactNative,
			},
			{
				name: 'A test file[Enzyme]',
				value: 'test',
			},
			{
				name: 'Styleguidist file [React-Styleguidist]',
				value: 'readme',
			},
			{
				name: 'Append Index[!You need to have index file]',
				value: 'append',
			},
			{
				name: 'Storybook file [React-Storybook]',
				value: 'story',
			},
		],
	},
	{
		name: 'containerOptions',
		type: 'checkbox',
		default: ['state'],
		when: ({ type }) => type === ModuleType.Container,
		choices: [
			{
				name: 'State',
				value: 'state',
				checked: true,
			},
			{
				name: 'Zustand State',
				value: 'zustand',
			},
		],
	},
];
