import { Slider } from "./ui/slider";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { settingAtom } from "@/store/SettingStore";
import { useRouter } from "next/navigation";

interface SettingsProps {
    listColor?: Array<string>,
}

export function Settings({ listColor }: SettingsProps) {
    const [settings, setSettings] = useAtom(settingAtom);
    const router = useRouter();
    
    function onSelectColor(color: string) {
        setSettings({
            ...settings, backgroundColor: color
        });
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
            <div className="grid grid-cols-5 pt-2">
                {
                    listColor?.map((color, key) => {
                        return <div key={key} className="flex justify-center">
                            <Button
                                className="w-[50px] h-[50px] mb-2"
                                style={{ backgroundImage: color }}
                                onClick={() => { 
                                    onSelectColor(color); 
                                }}
                            />
                        </div>
                    })
                }
                <div className="flex justify-center">
                    <Button
                        className="w-[50px] h-[50px] mb-2"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                            router.push("/settingcolor");
                        }}
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