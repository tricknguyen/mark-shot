import { ChangeEvent, MutableRefObject, useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { settingAtom } from "@/store/SettingStore";

interface ImageHandlerProp {
    domEl?: MutableRefObject<null>
}

export function ImageHandler({ domEl }: ImageHandlerProp) {
    const [settings] = useAtom(settingAtom);
    const [image, setImage] = useState<string | null>(null);
    const [isImageScalable, setIsImageScalable] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const url = e.target.files?.[0];
        if (url) {
            setImage(URL.createObjectURL(url));
        }
    }

    function handlePaste(event: ClipboardEvent) {
        if (!event.clipboardData || !event.clipboardData.items.length) {
            return;
        }

        const pastedItem = event.clipboardData.items[0];
        if (pastedItem.type.indexOf("image") === -1) {
            return; // Check for image type
        }

        const blob = pastedItem.getAsFile();

        const reader = new FileReader();
        if (blob) {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (!image) {
                    const dataURL = reader.result;
                    setImage(dataURL as string)
                }
            };
        }
    }

    useEffect(() => {
        const handlePasteEvent = (event: ClipboardEvent) => handlePaste(event);
        window.addEventListener("paste", handlePasteEvent);

        return () => window.removeEventListener("paste", handlePasteEvent);
    }, []);

    return <div className="p-4 h-[80vh] flex flex-col justify-center">
        <div id="wrapper" className="w-full flex-row items-center p-5 h-full flex justify-center">
            <div style={{
                backgroundImage: settings.backgroundColor,
                padding: settings.padding ? settings.padding : 40
            }} id="domEl" ref={domEl}>
                {
                    !image ? <>
                        <Label htmlFor="inputImage">Picture</Label>
                        <Input id="inputImage" type="file" accept="image/*" onChange={handleChange} />
                    </> : <img id="image" src={image} alt="Picture of the author"
                            style={{
                                borderRadius: `${settings.corner}px`,
                                boxShadow: `rgb(0 0 0 / 35%) 0px ${settings.shadow + 15}px ${settings.shadow + 25}px`,
                                objectFit: "cover"
                            }}
                        />
                }
            </div>
        </div>
    </div>
}