"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { colorSettings } from "@/store/SettingStore";
import { Utils } from "@/utils/ConvertColor";
import { useAtom } from "jotai";
import { ChevronLeft, Dices, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    modelValue?: string,
    onUpdatedModelValue?: (val: string) => void;
}

function ColorPicker({ modelValue, onUpdatedModelValue }: ColorPickerProps) {
    function isValid(val: string) {
        return !val.includes("NaN");
    }

    return (<div className="flex flex-col">
        <div className="grid grid-rows-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="w-full h-full aspect-square border-4 border-solid border-slate-500 hover:border-slate-950 p-0 bg-white hover:bg-white z-10"
                    >
                        {
                            modelValue ? <div style={{
                                width: "calc(100% - 4px)",
                                height: "calc(100% - 4px)",
                                backgroundColor: modelValue,
                            }} ></div> : <Plus className="text-black" />
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2">
                    <Input placeholder="color" className="text-center pr-0 mb-2" value={modelValue} onChange={(val) => { onUpdatedModelValue?.(val.target.value); }} />
                    <HexColorPicker color={modelValue} onChange={(val) => {
                        if (isValid(val)) {
                            onUpdatedModelValue?.(val);
                        }
                    }} />
                </DropdownMenuContent>

            </DropdownMenu>
        </div>
        <div className="grid grid-rows-1">
            {
                modelValue && <div className="flex justify-center">
                    <Button variant="ghost" size="icon" className="p-0 hover:bg-none" onClick={() => { onUpdatedModelValue?.(""); }}>
                        <X />
                    </Button>
                </div>
            }
        </div>
    </div>
    );
}

export default function Page() {
    const router = useRouter();
    const [colorsBase, setColorsBase] = useState<{
        [key: string]: any
    }>({
        firstColor: "",
        secondColor: "",
        thirdColor: "",
        fourthColor: "",
        fifthColor: ""
    });

    const [gradientColor, setGradientColor] = useState("");

    const [settingColors, setSettingColors] = useAtom(colorSettings);

    function updateColor(key: string, val: string) {
        setColorsBase({
            ...colorsBase,
            [key]: val
        });
        
        const values = Object.values({...colorsBase, [key]: val}).filter((color) => color !== "");
        setGradientColor(Utils.generateGradient(values));
    }

    function renderColor() {
        return <div
            className="h-full m-2 p-2 rounded-3xl border-8 border-slate-500"
            style={{
                minHeight: "min(860px, 100vh - 40px)",
                background: gradientColor
            }}
        />;
    }

    function renderSetting() {
        return <div>
            <header className="flex flex-col items-center">
                <Button variant="outline" size="icon">
                    <Dices className="h-[32px]" />
                </Button>
                <h1 className="text-3xl text-amber-200 font-semibold">Gradient Generator</h1>
                <p className="text-neutral-500 text-lg">Beautiful, lush gradients ✨</p>
            </header>
            <div>
                <div>
                    <h3 className="font-semibold leading-none tracking-tight">
                        Colors
                    </h3>
                    <div className="grid grid-cols-5 gap-3 pt-2">
                        {
                            Object.keys(colorsBase).map((color, index) => {
                                return <ColorPicker
                                    modelValue={colorsBase[color]}
                                    onUpdatedModelValue={(val) => {
                                        updateColor(color, val);
                                    }}
                                    key={index}
                                />
                            })
                        }
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="flex flex-col h-full mx-2">
            <header className="p-4">
                <div className="flex items-center">
                    <Button variant="outline" className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => {
                        setSettingColors([...settingColors, gradientColor]);
                        router.push("./");
                    }}>
                        <ChevronLeft />
                    </Button>
                    <h1 className="text-xl font-bold leading-none ml-2">Generator Gradient Color</h1>
                </div>
            </header>

            <div className="p-4 grid grid-cols-2 gap-9 max-w-[1200px] container">
                {renderColor()}
                {renderSetting()}
            </div>
        </div>
    )
}