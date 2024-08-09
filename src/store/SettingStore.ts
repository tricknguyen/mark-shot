import { colors, SettingImage } from "@/types";
import { atom } from "jotai";

export const settingAtom = atom({} as SettingImage);

export const colorsDefault = colors.map((color) => {
    return `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)`;
});
export const colorSettings = atom<Array<string>>(colorsDefault);

export const imageAtom = atom(null as string | null);

