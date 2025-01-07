import { Block, BlockType, ItemType, Layout, LayoutItem, Section } from "@/types";
import { emptyGuid, guid } from "@/types/shared";
import { atom } from "jotai";

export const IdDefaultSection = {
    OneColumn: guid("119d8308-9d0d-4787-8d9d-85131ad8f55c"),
    TwoColumn: guid("1a1f0ffd-cd7d-49a2-862f-544726319222"),
    ThreeColumn: guid("44eec634-8c98-4e8c-becc-3e3546ae78f9")
}

export const defaultSelections = [
    {
        title: "2 Column",
        id: IdDefaultSection.TwoColumn,
        itemtype: ItemType.Section,
        items: [
            {
                id: guid(),
                itemtype: ItemType.Section,
                items: [] as Array<LayoutItem>
            },
            {
                id: guid(),
                itemtype: ItemType.Section,
                items: [] as Array<LayoutItem>
            }
        ]
    } as Section,
    {
        title: "3 Column",
        id: IdDefaultSection.ThreeColumn,
        itemtype: ItemType.Section,
        items: [
            {
                id: guid(),
                itemtype: ItemType.Section,
                items: [] as Array<LayoutItem>
            },
            {
                id: guid(),
                itemtype: ItemType.Section,
                items: [] as Array<LayoutItem>
            },
            {
                id: guid(),
                itemtype: ItemType.Section,
                items: [] as Array<LayoutItem>
            }
        ]
    } as Section,
    {
        title: "Image",
        id: guid(),
        itemtype: ItemType.Block,
        blockType: BlockType.Image,
    } as Block,
] as Array<LayoutItem>;

const defaultValueLayout: Layout = {
    title: "Layout",
    id: guid(),
    items: [],
    itemtype: "layout"
};

export const layoutStore = atom<Layout>(defaultValueLayout);

export const idSelecting = atom<guid>(emptyGuid);