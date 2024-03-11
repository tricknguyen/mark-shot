import { Setting } from "@/models/Setting";
import { atom, createStore } from "jotai";

export const settingStore = createStore();

const settingAttom = atom({} as Setting);
settingStore.set