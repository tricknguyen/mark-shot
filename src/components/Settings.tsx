import { colors } from "@/models/GradientLibrary";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { useAtom } from "jotai";
import { settingAttom } from "@/store/SettingStore";
import { ColorGradient } from "@/models/ColorGradient";

export function Settings() {
    const [settings, setSettings] = useAtom(settingAttom);

    function onSelectColor(color: ColorGradient) {
        setSettings({ ...settings, backgroundColor: {
            title: color.from,
            value: `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)`
        }})
    }

    function onSelectPadding(val: number) {
        setSettings({ ...settings, padding: val});
    }

    function onSelectCorner(val: number) {
        setSettings({ ...settings, corner: val});
    }

    function onSelectShadow(val: number) {
        setSettings({ ...settings, shadow: val});
    }

    return (
        <div className="py-4 lg:block">
            {/* Setting */}
            <div className="px-3 py-2 border-b">
                <span className="text-lg font-semibold mb-2">Background</span>
                <div className="grid grid-cols-3 pt-2">
                    {
                        colors.map((color, index) => {
                            return <div key={index} className="flex justify-center"> 
                                <Card 
                                    className="w-[80px] h-[80px] mb-2" 
                                    style={{backgroundImage: `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)`  }} 
                                    onClick={() => {onSelectColor(color);}}
                                />
                            </div> 
                        })
                    }
                </div>
            </div>

            <div className="px-3 py-6 border-b ">
                <h2 className="text-lg font-semibold mb-2">Padding</h2>
                <Slider defaultValue={[50]} max={300} step={1} onValueChange={(val) => {
                    onSelectPadding(val[0]);
                }}/>
            </div>

            <div className="px-3 py-6 border-b ">
                <h2 className="text-lg font-semibold mb-2">Corner</h2>
                <Slider defaultValue={[10]} max={100} step={1} onValueChange={(val) => {
                    onSelectCorner(val[0]);
                }}/>
            </div>

            <div className="px-3 py-6">
                <h2 className="text-lg font-semibold mb-2">Shadow</h2>
                <Slider defaultValue={[10]} max={100} step={1} onValueChange={(val) => {
                    onSelectShadow(val[0]);
                }}/>
            </div>
        </div>
    );
}