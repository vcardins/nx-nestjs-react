import create, { State, StateCreator, UseBoundStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { useImmer } from './middleware';

export const createStore = <T extends State>(fn: StateCreator<T>, persistTag?: string, prefix?: string) =>
	!persistTag
		? create(devtools(useImmer(fn), prefix))
		: create(devtools(persist(useImmer(fn), { name: persistTag }), prefix))
