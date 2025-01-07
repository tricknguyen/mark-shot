import { guid } from "./shared"

export enum ItemType  {
    Section = "section",
    Block =  "block"
}

interface SectionSettings extends LayoutItemSettings {

}

interface BlockSettings extends LayoutItemSettings {

}

export interface SettingImageBlock extends BlockSettings {
    image: string;
    size: number;
    corner: number;
    shadow: number;
}


interface BaseItem {
    title: string,
    id: guid
}

export interface Section<T extends SectionSettings = SectionSettings> extends BaseItem, LayoutItem {
    settings: T
}

export interface Block<T extends BlockSettings = BlockSettings> extends BaseItem, LayoutItem {
    settings: T
    blockType: BlockType
}

export enum BlockType {
    Image,
    Text
}

export interface Layout extends BaseItem {
    itemtype: string;
    items: Array<LayoutItem>;
}

export interface LayoutItem extends BaseItem {    
    containerId?: string;
    itemtype: string;
    items?: Array<LayoutItem>;
    settings?: LayoutItemSettings;
}


interface LayoutItemSettings {

}