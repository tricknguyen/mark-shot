import { MutableRefObject, useRef } from "react";
import Image from "next/image";
import Designer from "../app/Designer.jpeg";

interface ImageHandlerProp {
    domEl?: MutableRefObject<null>
}

export function ImageHandler({ domEl }: ImageHandlerProp) {
    return <div className="p-4 w-full h-full border" id="domEl" ref={domEl}>
        <div className="w-full h-[500px]">
            <div className="p-5 h-full flex justify-center" style={{ backgroundImage: "linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%)" }}>
                <Image
                    src={Designer}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    priority
                />
            </div>
        </div>
    </div>
}