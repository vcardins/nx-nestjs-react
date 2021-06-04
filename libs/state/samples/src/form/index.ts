import React from 'react';
import { StateCreator } from 'zustand';

interface IFormState {
	data: Record<string, any>;
	isReady: Record<string, boolean>;
	defaultValues: Record<string, any>;
	setForm: (formData: any, formId: string) => void;
	setField: (id: string, value: any, formId: string) => void;
	setDefaults: (formData: any, formId: string) => void;
	register: (formData: any, formId: string) => void;
	unregister: (formId: string)  => void;
	registerField: (fieldId: string, defaultValue: any, formId: string) => void;
	resetForm: (formId: string) => void;
}

// Woof on theses types.
// TODO fix these types
export const createForm: StateCreator<IFormState> = (set, get, api) => ({
	data: {},
	isReady: {},
	defaultValues: {},
	setForm: (formData: any, formId: string) =>
		set((state: IFormState) => {
			state.data[formId] = { ...formData };
		}),
	setField: (id: string, value: any, formId: string) =>
		set((state: any) => {
			state.data[formId][id] = value;
		}),
	setDefaults: (formData: any, formId: string) =>
		set((state: any) => {
			state.defaultValues[formId] = { ...formData };
		}),
	register: (formData: any, formId: string) =>
		set((state: any) => {
			state.data[formId] = { ...formData };
			state.defaultValues[formId] = { ...formData };
			state.isReady[formId] = true;
		}),
	unregister: (formId: string) =>
		set((state: any) => {
			state.isReady[formId] = false;
		}),
	registerField: (fieldId: string, defaultValue: any, formId: string) =>
		set((state: any) => {
			state.data[formId][fieldId] = defaultValue;
		}),
	resetForm: (formId: string) =>
		set((state: any) => {
			state.data[formId] = state.defaultValues[formId];
		}),
});

// export const useForm = create(immer(store));

export const FormContext = React.createContext(null);
