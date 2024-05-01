import { colors } from "@/models/GradientLibrary";
import { SettingImage } from "@/models/Setting";
import { atom } from "jotai";

export const settingAtom = atom({} as SettingImage);

const colorsDefault = colors.map((color) => {
    return `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)`;
});
export const colorSettings = atom<Array<string>>(colorsDefault);

export const imageAtom = atom(null as string | null);

