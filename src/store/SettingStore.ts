import { Setting } from "@/models/Setting";
import { atom, createStore } from "jotai";

export const settingAttom = atom({} as Setting);

export const settingsStore = createStore();
