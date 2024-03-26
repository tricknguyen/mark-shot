import { colors } from "@/models/GradientLibrary";
import { Slider } from "./ui/slider";
import { useAtom } from "jotai";
import { settingAttom } from "@/store/SettingStore";
import { ColorGradient } from "@/models/ColorGradient";
import { Button } from "./ui/button";
import { Plus } from 'lucide-react';

export function Settings() {
    const [settings, setSettings] = useAtom(settingAttom);

    function onSelectColor(color: ColorGradient) {
        setSettings({
            ...settings, backgroundColor: {
                title: color.from,
                value: `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)`
            }
        })
    }

    function onSelectPadding(val: number) {
        setSettings({ ...settings, padding: val });
    }

    function onSelectCorner(val: number) {
        setSettings({ ...settings, corner: val });
    }

    function onSelectShadow(val: number) {
        setSettings({ ...settings, shadow: val });
    }

    function renderGradientSetting() {
        return <div className="py-2 border-b">
            <h3 className="font-semibold leading-none tracking-tight">
                Gradient
            </h3>
            <div className="grid grid-cols-4 pt-2">
                {
                    colors.map((color, key) => {
                        return <div key={key} className="flex justify-center">
                            <Button
                                className="w-[50px] h-[50px] mb-2"
                                style={{ backgroundImage: `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)` }}
                                onClick={() => { onSelectColor(color); }}
                            />
                        </div>
                    })
                }
                <div className="flex justify-center">
                    <Button
                        className="w-[50px] h-[50px] mb-2"
                        variant="outline"
                        size="icon"
                    >
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    }

    return (
        <div className="py-4 px-2 lg:block">
            <div className="pb-2 border-b">
                <Button className="w-full">None</Button>
            </div>

            {renderGradientSetting()}

            <div className="px-3 py-6 border-b ">
                <h2 className="text-lg font-semibold mb-2">Padding</h2>
                <Slider defaultValue={[50]} max={300} step={1} onValueChange={(val) => {
                    onSelectPadding(val[0]);
                }} />
            </div>

            <div className="px-3 py-6 border-b ">
                <h2 className="text-lg font-semibold mb-2">Corner</h2>
                <Slider defaultValue={[10]} max={100} step={1} onValueChange={(val) => {
                    onSelectCorner(val[0]);
                }} />
            </div>

            <div className="px-3 py-6">
                <h2 className="text-lg font-semibold mb-2">Shadow</h2>
                <Slider defaultValue={[10]} max={100} step={1} onValueChange={(val) => {
                    onSelectShadow(val[0]);
                }} />
            </div>
        </div>
    );
}