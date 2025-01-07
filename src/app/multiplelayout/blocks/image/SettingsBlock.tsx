import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { SettingImageBlock } from "@/types";
import { useRef, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SettingsBlockProps {
    settings?: Partial<SettingImageBlock>;
    onUpdateSettings: (settings: SettingImageBlock) => void;
}

const defaultSettings: SettingImageBlock = {
    image: "",
    size: 100,
    corner: 0,
    shadow: 0
};

export function SettingsBlock({ settings, onUpdateSettings }: SettingsBlockProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentSettings, setCurrentSettings] = useState<SettingImageBlock>({
        ...defaultSettings,
        ...settings
    });

    // Update local state when props change
    useEffect(() => {
        setCurrentSettings({
            ...defaultSettings,
            ...settings
        });
    }, [settings]);

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    const newSettings = {
                        ...currentSettings,
                        image: reader.result
                    };
                    setCurrentSettings(newSettings);
                    onUpdateSettings(newSettings);
                }
            };
        }
    };

    const handleClearImage = () => {
        setCurrentSettings(defaultSettings);
        onUpdateSettings(defaultSettings);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="py-4 px-2 lg:block space-y-4">
            <div className="pb-2 border-b">
                <Input 
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                />
                <Button 
                    className="w-full" 
                    variant={currentSettings.image ? "destructive" : "default"}
                    onClick={() => {
                        if (currentSettings.image) {
                            handleClearImage();
                        } else {
                            fileInputRef.current?.click();
                        }
                    }}
                >
                    {currentSettings.image ? 'Clear Image' : 'Load Image'}
                </Button>
            </div>

            {[
                { label: 'Size', max: 300, key: 'size' as const, defaultValue: 100 },
                { label: 'Corner', max: 100, key: 'corner' as const, defaultValue: 0 },
                { label: 'Shadow', max: 100, key: 'shadow' as const, defaultValue: 0 }
            ].map(({ label, max, key, defaultValue }) => (
                <div key={key} className="pt-2 pb-3 border-b">
                    <h3 className="font-semibold leading-none tracking-tight mb-3">
                        {label}
                    </h3>
                    <Slider
                        defaultValue={[currentSettings[key]]}
                        max={max}
                        step={1}
                        onValueChange={([value]) => {
                            const newSettings = {
                                ...currentSettings,
                                [key]: value
                            };
                            setCurrentSettings(newSettings);
                            onUpdateSettings(newSettings);
                        }}
                    />
                </div>
            ))}
        </div>
    );
}