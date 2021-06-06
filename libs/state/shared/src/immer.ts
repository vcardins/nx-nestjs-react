import produce from 'immer';

export const useImmer = (config: any) => (set, get) =>
	config((fn: any) => set(produce(fn)), get);
