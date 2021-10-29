
import create from 'zustand';
import { devtools } from 'zustand/middleware';

import { useImmer } from './immer';

export const createStore: typeof create = <TState = any>(fn: TState) => create(devtools(useImmer(fn)));

