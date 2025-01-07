import { Block } from "@/types";
import { ImageHandler } from "@/components/ImageHandler";
import { useRef } from "react";

interface ImageBlockProps {
    value: Block;
}

export function ImageBlock({ value }: ImageBlockProps) {
    const domEl = useRef(null);

    return (
        <div className="w-full h-full">
           Render Image
        </div>
    );
}