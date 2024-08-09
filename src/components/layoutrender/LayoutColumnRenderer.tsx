import { Block, ItemType, LayoutItem } from "@/types"
import { LayoutItemSelector } from "./LayoutItemSelector";
import { LayoutBlockRenderer } from "./LayoutBlockRenderer";
import { LayoutSectionRenderer } from "./LayoutSectionRenderer";
import useLayoutUpdater from "@/hooks/useLayoutUpdater";

interface LayoutColumnRendererProps {
    value: LayoutItem
}

export function LayoutColumnRenderer({ value }: LayoutColumnRendererProps) {
    const { handleSelectItem } = useLayoutUpdater();


    return <div className="items-center bg-white rounded-md flex h-full w-full min-h-[120px] justify-center layout-column">
        <LayoutItemSelector small={false} contextItem={value} onSelectItem={(item: LayoutItem) => handleSelectItem(item, value.id)} />
        {
            value?.items?.map((item, index) => {
                if (item.itemtype === ItemType.Block) {
                    return <LayoutBlockRenderer value={item as Block} key={index} />
                } else if (item.itemtype === ItemType.Section) {
                    return <LayoutSectionRenderer value={item} key={index}/>;
                }
            })
        }
    </div>;
}