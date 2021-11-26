import produce, { Draft } from 'immer';
import { State, StateCreator } from 'zustand';
import { NamedSet } from 'zustand/middleware';

export type TImmerConfigFn<T extends State> = (fn: (draft: Draft<T>) => void) => void;
export type TImmerConfig<T extends State> = StateCreator<T, TImmerConfigFn<T>>;

export const useImmer = <T extends State>(config: StateCreator<T, TImmerConfigFn<T>>):
	StateCreator<T, NamedSet<T>> => (set, get, api) => config((fn) => set(produce<T>(fn)), get, api);
