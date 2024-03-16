import { MutableRefObject } from "react";
import Image from "next/image";
import Designer from "../app/Designer.jpeg";
import { useAtom } from "jotai";
import { settingAttom } from "@/store/SettingStore";

interface ImageHandlerProp {
    domEl?: MutableRefObject<null>
}

export function ImageHandler({ domEl }: ImageHandlerProp) {
    const [settings, setSettings] = useAtom(settingAttom);


    window.addEventListener("paste", handlePasteEvent);

    function handlePasteEvent(event: ClipboardEvent) {
        if (!event.clipboardData || !event.clipboardData.items.length) {
            return;
        }

        const pastedItem = event.clipboardData.items[0];
        if (pastedItem.type.indexOf('image') === -1) {
            return; // Check for image type
        }

        const blob = pastedItem.getAsFile();

        const reader = new FileReader();
        if (blob) {
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const dataURL = reader.result;
                const imageElement = document.createElement("img");

                if (dataURL) {
                    imageElement.src = dataURL.toString();
                }
                const pasteDiv = document.getElementById("wrapper");
                pasteDiv?.appendChild(imageElement);
            };
        }
    }

    return <div className="p-4 h-[80vh] flex flex-col justify-center">
        <div id="domEl" ref={domEl}>
            <div id="wrapper" className="w-full flex-row items-center p-5 h-full flex justify-center" style={{
                backgroundImage: settings.backgroundColor?.value,
                padding: settings.padding
            }}>
                <Image
                    style={{
                        borderRadius: `${settings.corner}px`,
                        boxShadow: `rgb(0 0 0 / 35%) 0px ${settings.shadow + 15}px ${settings.shadow + 25}px`,
                        objectFit: "cover",
                        maxWidth: 500,
                        maxHeight: 300
                    }}
                    src={Designer}
                    alt="Picture of the author"
                    priority
                />
            </div>
        </div>
    </div>
}