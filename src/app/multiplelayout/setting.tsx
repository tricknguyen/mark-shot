"use client"

import { Block, BlockType, ItemType, LayoutItem, SettingImageBlock } from "@/types";
import useLayoutUpdater from "@/hooks/useLayoutUpdater";
import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { idSelecting } from "@/store";
import { guid } from "@/types/shared";
import { SettingsBlock } from "./blocks/image";

export default function GeneralSetting() {
    const { layout, handleSelectItem } = useLayoutUpdater();
    const idSelect = useAtomValue(idSelecting);

    const findSelectedBlock = useCallback(() => {
        const findBlockById = (items: Array<LayoutItem>, targetId: guid): Block | null => {
            for (const item of items) {
                if (item.id === targetId && item.itemtype === ItemType.Block) {
                    return item as Block;
                }
                if (item.items?.length) {
                    const found = findBlockById(item.items, targetId);
                    if (found) return found;
                }
            }
            return null;
        };

        return layout.items && idSelect ? findBlockById(layout.items, idSelect) : null;
    }, [layout.items, idSelect]);

    const handleUpdateSettings = (settings: SettingImageBlock) => {
        const selectedBlock = findSelectedBlock();
        if (selectedBlock) {
            const updatedBlock = {
                ...selectedBlock,
                settings
            };
            handleSelectItem(updatedBlock, selectedBlock.containerId);
        }
    };

    const selectedBlock = findSelectedBlock();

    function renderLayoutSettings() {
        if (!selectedBlock) {
            return <div className="p-4 text-center text-muted-foreground">
                Select a block to see its settings
            </div>;
        }
        switch (selectedBlock.blockType) {
            case BlockType.Image:
                return <SettingsBlock
                    settings={selectedBlock.settings as SettingImageBlock}
                    onUpdateSettings={handleUpdateSettings}
                />;
            default:
                return <div className="p-4 text-center text-muted-foreground">
                    No settings available for this block type
                </div>;
        }
    }

    return <div className="wrapper-setting">
        {renderLayoutSettings()}
    </div>
}