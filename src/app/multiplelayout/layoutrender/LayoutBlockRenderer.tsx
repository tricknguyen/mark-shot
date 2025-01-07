import { Block, ItemType, BlockType } from "@/types";
import { ImageBlock } from "../blocks/image/ImageBlock";
import { useCallback } from "react";
import { idSelecting } from "@/store";
import { useSetAtom } from "jotai";

interface LayoutBlockRendererProps {
    value?: Block;
}

export function LayoutBlockRenderer({ value }: LayoutBlockRendererProps) {
    const setIdSelectingSetting = useSetAtom(idSelecting);
    if (!value) return null;

    function renderBlock(block: Block) {
        if (block.itemtype === ItemType.Block) {
            switch (block.blockType) {
                case BlockType.Image:
                    return <ImageBlock value={block} />;
                case BlockType.Text:
                    // TODO: Add TextBlock component when needed
                    return null;
                default:
                    return null;
            }
        }
    }    

    return <div onClick={() => {
        setIdSelectingSetting(value.id);
    }}>
        {renderBlock(value)}
    </div>;
}