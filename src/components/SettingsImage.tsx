import { Slider } from "./ui/slider";
import { useAtom, useSetAtom } from "jotai";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { settingAtom } from "@/store/SettingStore";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { ChangeEvent, useRef, useState } from "react";
import { SettingImage } from "@/types";

interface SettingsProps {
    listColor: Array<string>;
}

const useImageUpload = () => {
    const [wallPapers, setWallpapers] = useState<string[]>([]);
    const setSettings = useSetAtom(settingAtom);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const imageUrl = reader.result as string;
            setWallpapers(prev => [...prev, imageUrl]);
            setSettings(prev => ({ ...prev, background: imageUrl }));
        };
    };

    return { wallPapers, fileInputRef, handleImageChange };
};

const GradientSection = ({ listColor, onSelectBackground, onAddGradient }: {
    listColor: string[];
    onSelectBackground: (color: string) => void;
    onAddGradient: () => void;
}) => (
    <div className="py-2 border-b">
        <h3 className="font-semibold leading-none tracking-tight">Gradient</h3>
        <div className="grid grid-cols-5 pt-2">
            {listColor.map((color, index) => (
                <div key={index} className="flex justify-center">
                    <Button
                        className="w-[50px] h-[50px] mb-2"
                        style={{ backgroundImage: color }}
                        onClick={() => onSelectBackground(color)}
                    />
                </div>
            ))}
            <div className="flex justify-center">
                <Button
                    className="w-[50px] h-[50px] mb-2"
                    variant="outline"
                    size="icon"
                    onClick={onAddGradient}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    </div>
);

const WallpaperSection = ({ wallPapers, onSelectBackground, fileInputRef, onAddWallpaper }: {
    wallPapers: string[];
    onSelectBackground: (url: string) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    onAddWallpaper: () => void;
}) => (
    <div className="py-2 border-b">
        <h3 className="font-semibold leading-none tracking-tight">Wallpapers</h3>
        <div className="grid grid-cols-5 pt-2">
            {wallPapers.map((wallpaper, index) => (
                <div className="flex justify-center" key={index}>
                    <Button
                        className="w-[50px] h-[50px] mb-2"
                        style={{ backgroundImage: `url(${wallpaper})` }}
                        onClick={() => onSelectBackground(wallpaper)}
                    />
                </div>
            ))}
            <div className="flex justify-center">
                <Input 
                    ref={fileInputRef} 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                />
                <Button 
                    className="w-[50px] h-[50px] mb-2" 
                    variant="outline" 
                    size="icon" 
                    onClick={onAddWallpaper}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    </div>
);

export function SettingsImage({ listColor }: SettingsProps) {
    const [settings, setSettings] = useAtom(settingAtom);
    const router = useRouter();
    const { wallPapers, fileInputRef, handleImageChange } = useImageUpload();

    const updateSetting = (key: keyof SettingImage, value: number | string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleRemovingImage = () => {
        setSettings(prev => ({
            ...prev,
            background: '',
            image: '',
            size: 100,
            padding: 0,
            corner: 0,
            shadow: 0
        }));
    };

    return (
        <div className="py-4 px-2 lg:block">
            <div className="pb-2 border-b">
                <Button className="w-full" onClick={handleRemovingImage}>
                    Clear Content
                </Button>
            </div>

            <GradientSection
                listColor={listColor}
                onSelectBackground={(color) => updateSetting('background', color)}
                onAddGradient={() => router.push("/settingcolor")}
            />

            <WallpaperSection
                wallPapers={wallPapers}
                onSelectBackground={(url) => updateSetting('background', url)}
                fileInputRef={fileInputRef}
                onAddWallpaper={() => fileInputRef.current?.click()}
            />

            <Input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="hidden" 
            />

            {[
                { label: 'Size', max: 300, key: 'size' as const },
                { label: 'Corner', max: 100, key: 'corner' as const },
                { label: 'Shadow', max: 100, key: 'shadow' as const }
            ].map(({ label, max, key }) => (
                <div key={key} className="pt-2 pb-3 border-b">
                    <h3 className="font-semibold leading-none tracking-tight mb-3">
                        {label}
                    </h3>
                    <Slider
                        defaultValue={[0]}
                        max={max}
                        step={1}
                        onValueChange={([value]) => updateSetting(key as keyof SettingImage, value)}
                    />
                </div>
            ))}
        </div>
    );
}