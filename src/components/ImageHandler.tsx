import { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { settingAtom } from "@/store/SettingStore";

interface ImageHandlerProp {
    domEl?: MutableRefObject<null>
}

interface Image {
    url?: string;
    width?: number;
}

export function ImageHandler({ domEl }: ImageHandlerProp) {
    const [settings] = useAtom(settingAtom);

    const [image, setImage] = useState<Image | null>(null);
    const [isImageScalable, setIsImageScalable] = useState(false);
    const [widthWrapper, setWidthWrapper] = useState(0);

    const wrapperElementRef = useRef<HTMLDivElement | null>(null);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const url = event.target.files?.[0];
        if (url) {
            const reader = new FileReader();
            reader.readAsDataURL(url);
            reader.onloadend = () => setImage({ url: reader.result as string });
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

        if (blob) {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (!image) {
                    const dataURL = reader.result as string;
                    const imageNew = new Image();
                    imageNew.src = dataURL;
                    imageNew.onload = () => {
                        const imageWidth = imageNew.width;
                        setImage({ url: dataURL, width: imageWidth });
                        const shouldScale = (imageWidth > (wrapperElementRef.current?.offsetWidth || 0)) || (imageNew.height > (wrapperElementRef.current?.offsetHeight || 0));
                        if (shouldScale && wrapperElementRef.current) {
                            setWidthWrapper(wrapperElementRef.current.offsetWidth * 40 / 100);
                        }
                        setIsImageScalable(shouldScale);
                    };
                }
            };
        }
    }

    useEffect(() => {
        const handlePasteEvent = (event: ClipboardEvent) => handlePaste(event);
        window.addEventListener("paste", handlePasteEvent);
        return () => window.removeEventListener("paste", handlePasteEvent);
    }, [wrapperElementRef, image]);

    return <div className="p-4 h-[80vh] flex flex-col justify-center">
        <div id="wrapper" className="w-full flex-row items-center p-5 h-full flex justify-center" ref={wrapperElementRef}>
            <div style={image ? {
                backgroundImage: `url(${settings.wallPaper})`,
                padding: settings.padding ? settings.padding : 40,
            } : undefined} id="domEl" ref={domEl}>
                {
                    !image ? <>
                        <Label htmlFor="inputImage">Picture</Label>
                        <Input id="inputImage" type="file" accept="image/*" onChange={handleImageChange} />
                    </> : <img id="image" src={image.url} alt="Picture of the author"
                        style={{
                            borderRadius: `${settings.corner}px`,
                            boxShadow: `rgb(0 0 0 / 35%) 0px ${settings.shadow + 15}px ${settings.shadow + 25}px`,
                            objectFit: "cover",
                            display: isImageScalable ? "inline-block" : "block",
                            width: isImageScalable ? `${widthWrapper}px` : "",
                            height: isImageScalable ? "auto" : "",
                        }}
                    />
                }
            </div>
        </div>
    </div>
}