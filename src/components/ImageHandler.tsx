import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { settingAtom } from "@/store/SettingStore";
import { SettingImage } from "@/types";

interface ImageHandlerProps {
    domEl?: MutableRefObject<null>;
}

interface ImageState {
    url: string;
    width: number;
    height: number;
    aspectRatio: number;
}

const useImageLoader = (wrapperRef: React.RefObject<HTMLDivElement>) => {
    const [imageState, setImageState] = useState<ImageState | null>(null);
    const [settings, setSettings] = useAtom(settingAtom);

    useEffect(() => {
        if (!settings.image) {
            setImageState(null);
        }
    }, [settings.image]);

    const processImage = (dataUrl: string) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const wrapperWidth = wrapperRef.current?.offsetWidth || 0;
            const wrapperHeight = wrapperRef.current?.offsetHeight || 0;

            let finalWidth = img.width;
            let finalHeight = img.height;

            if (img.width > wrapperWidth * 0.8 || img.height > wrapperHeight * 0.8) {
                if (wrapperWidth / wrapperHeight > aspectRatio) {
                    finalHeight = wrapperHeight * 0.8;
                    finalWidth = finalHeight * aspectRatio;
                } else {
                    finalWidth = wrapperWidth * 0.8;
                    finalHeight = finalWidth / aspectRatio;
                }
            }

            setImageState({
                url: dataUrl,
                width: finalWidth,
                height: finalHeight,
                aspectRatio
            });
            setSettings(prev => ({ ...prev, image: dataUrl }));
        };
    };

    return { imageState, processImage };
};

const ImageDisplay = ({
    imageState,
    settings
}: {
    imageState: ImageState;
    settings: SettingImage;
}) => {
    const containerStyle: React.CSSProperties = {
        width: imageState.width,
        height: imageState.height,
        transform: `scale(${settings.size ? settings.size / 100 : 1}) translate(0%, 0%) rotate(0deg)`
    };

    const imageStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: `${settings.corner}px`,
        boxShadow: `rgb(0 0 0 / 35%) 0px ${settings.shadow + 15}px ${settings.shadow + 25}px`,
    };

    return (
        <div style={containerStyle}>
            <img
                src={imageState.url}
                alt="Uploaded content"
                style={imageStyle}
            />
        </div>
    );
};

export function ImageHandler({ domEl }: ImageHandlerProps) {
    const settings = useAtomValue(settingAtom);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { imageState, processImage } = useImageLoader(wrapperRef);

    const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    processImage(reader.result);
                }
            };
        }
    };

    const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        const imageItem = Array.from(items).find(item => item.type.startsWith('image'));
        if (!imageItem) return;

        const blob = imageItem.getAsFile();
        if (blob) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (reader.result && typeof reader.result === 'string') {
                    processImage(reader.result);
                }
            };
        }
    };

    useEffect(() => {
        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, []);

    return (
        <div className="p-4 h-[80vh] flex flex-col justify-center"
            id="domEl"
            ref={domEl}>
            <div
                className="w-full flex-row items-center p-5 h-full flex justify-center" style={{
                    backgroundImage: settings.background?.includes('data:')
                        ? `url(${settings.background})`
                        : settings.background,
                }}
                ref={wrapperRef}
            >
                <div

                    className="flex items-center justify-center"
                >
                    {!imageState ? (
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="inputImage">
                                Drop an image here or paste from clipboard
                            </Label>
                            <Input
                                id="inputImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileInput}
                                className="cursor-pointer"
                            />
                        </div>
                    ) : (
                        <ImageDisplay
                            imageState={imageState}
                            settings={settings}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}