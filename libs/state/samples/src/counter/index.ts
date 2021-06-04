import { StateCreator } from 'zustand';

export type CounterState = {
	count: number;
	increment: () => void;
	decrement: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createCounter: StateCreator<CounterState> = (set, get, api) => ({
	count: 0,
	increment: () => set(({ count }) => ({ count: count + 1 })),
	decrement: () => set(({ count }) => ({ count: count - 1 })),
});
