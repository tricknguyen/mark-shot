import { Setting } from "@/models/Setting";
import { atom, createStore } from "jotai";

export const settingAtom = atom({} as Setting);

export const imageAtom = atom(null as string | null);

export const settingsStore = createStore();
