import { colors } from "@/models/GradientLibrary";
import { Slider } from "./ui/slider";
import { useAtom } from "jotai";
import { ColorGradient } from "@/models/ColorGradient";
import { Button } from "./ui/button";
import { Plus } from 'lucide-react';
import { settingAtom } from "@/store/SettingStore";

export function Settings() {
    const [settings, setSettings] = useAtom(settingAtom);

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

    function renderWallPaperSetting() {
        return <div className="py-2 border-b">
            <h3 className="font-semibold leading-none tracking-tight">
                Wallpapers
            </h3>
            <div className="grid grid-cols-4 pt-2">
                {/* List all wallpapers like colors */}
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

    function handleRemovingImage() {

    }

    return (
        <div className="py-4 px-2 lg:block">
            <div className="pb-2 border-b">
                <Button className="w-full" onClick={handleRemovingImage}>None</Button>
            </div>

            {renderGradientSetting()}

            {renderWallPaperSetting()}

            <div className="pt-2 pb-3 border-b">
                <h3 className="font-semibold leading-none tracking-tight mb-3">
                    Padding
                </h3>
                <Slider defaultValue={[0]} max={300} step={1} onValueChange={(val) => {
                    onSelectPadding(val[0]);
                }} />
            </div>

            <div className="pt-2 pb-3 border-b">
                <h3 className="font-semibold leading-none tracking-tight mb-3">
                    Corner
                </h3>
                <Slider defaultValue={[0]} max={100} step={1} onValueChange={(val) => {
                    onSelectCorner(val[0]);
                }} />
            </div>

            <div className="pt-2 pb-3 border-b">
                <h3 className="font-semibold leading-none tracking-tight mb-3">Shadow</h3>
                <Slider defaultValue={[0]} max={100} step={1} onValueChange={(val) => {
                    onSelectShadow(val[0]);
                }} />
            </div>
        </div>
    );
}