import { Slider } from "./ui/slider";
import { useAtom } from "jotai";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { settingAtom } from "@/store/SettingStore";
import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { ChangeEvent, useRef, useState } from "react";

interface SettingsProps {
    listColor?: Array<string>,
}

export function SettingsImage({ listColor }: SettingsProps) {
    const [settings, setSettings] = useAtom(settingAtom);
    const [wallPapers, setWallpapers] = useState<Array<string>>([]);
    const wrapperImg = useRef<HTMLInputElement>(null);
    const router = useRouter();

    function onSelectBackground(background: string) {
        setSettings({
            ...settings, background: background
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

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        console.log(event);
        const url = event.target.files?.[0];
        if (url) {
            const reader = new FileReader();
            reader.readAsDataURL(url);
            reader.onloadend = () => {
                setSettings({ ...settings, background: reader.result as string });
                setWallpapers([...wallPapers, reader.result as string]);
            }
        }
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
                                    onSelectBackground(color);
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
            <div className="grid grid-cols-5 pt-2">
                {
                    wallPapers?.map((wallpaper, index) => {
                        return <div className="flex justify-center" key={index}>
                            <Button
                                className="w-[50px] h-[50px] mb-2"
                                style={{ backgroundImage: `url(${wallpaper})` }}
                                onClick={() => {
                                    onSelectBackground(wallpaper);
                                }}
                            />
                        </div>
                    })
                }
                <div className="flex justify-center">
                    <Input ref={wrapperImg} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <Button className="w-[50px] h-[50px] mb-2" variant="outline" size="icon" onClick={() => {
                        wrapperImg.current?.click();
                    }}>
                        <Plus />
                    </Button>
                </div>
            </div>
        </div>
    }

    function handleRemovingImage() {
        //clear All Setting for image
    }

    return (
        <div className="py-4 px-2 lg:block">
            <div className="pb-2 border-b">
                <Button className="w-full" onClick={handleRemovingImage}>Clear Content</Button>
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