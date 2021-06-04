import produce from 'immer';

export const immer = (config: any) => (set, get) =>
	config((fn: any) => set(produce(fn)), get)
