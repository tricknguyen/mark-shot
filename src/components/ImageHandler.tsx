import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
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
    const [widthWrapper, setWidthWrapper] = useState(0);
    const [isImageScalable, setIsImageScalable] = useState(false);

    const wrapperElementRef = useRef<HTMLDivElement | null>(null);

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
                    setImage(dataURL as string);

                    const imageNew = new Image();
                    imageNew.src = dataURL as string;
                    imageNew.onload = () => {
                        if (imageNew.width > widthWrapper) {
                            setIsImageScalable(true);
                        } else {
                            setIsImageScalable(false);
                        }
                    }
                }
            };
        }
    }

    useEffect(() => {
        if (wrapperElementRef.current) {
            setWidthWrapper(wrapperElementRef.current?.offsetWidth);
        }

        const handlePasteEvent = (event: ClipboardEvent) => handlePaste(event);
        window.addEventListener("paste", handlePasteEvent);

        return () => window.removeEventListener("paste", handlePasteEvent);
    }, []);

    return <div className="p-4 h-[80vh] flex flex-col justify-center">
        <div id="wrapper" className="w-full flex-row items-center p-5 h-full flex justify-center">
            <div style={{
                backgroundImage: settings.backgroundColor,
                padding: settings.padding ? settings.padding : 40,
                transform: isImageScalable ? "scale(0.8)" : ""
            }} id="domEl" ref={domEl}>
                {
                    !image ? <>
                        <Label htmlFor="inputImage">Picture</Label>
                        <Input id="inputImage" type="file" accept="image/*" onChange={handleChange} />
                    </> : <img id="image" src={image} alt="Picture of the author"
                            style={{
                                borderRadius: `${settings.corner}px`,
                                boxShadow: `rgb(0 0 0 / 35%) 0px ${settings.shadow + 15}px ${settings.shadow + 25}px`,
                                objectFit: "cover",
                                transform: isImageScalable ? "scale(0.8)" : ""
                            }}
                        />
                }
            </div>
        </div>
    </div>
}