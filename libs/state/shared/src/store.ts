
import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from './immer';

export const createStore: typeof create = <TState = any>(fn: TState) => create(devtools(immer(fn)));

