import { LayoutItem } from "@/types"
import { LayoutColumnRenderer } from "./LayoutColumnRenderer";

interface LayoutSectionRendererProps {
    value?: LayoutItem
}

export function LayoutSectionRenderer({ value }: LayoutSectionRendererProps) {
    return <div
        className="border-box w-full flex flex-1 flex-nowrap min-w-0 justify-center relative transition-all duration-500 py-5 rounded-md cursor-pointer layout-section"
        style={{ boxShadow: "0px 2px 0px 0px white, inset 0px 2px 0px 0px white" }}
    >
        {
            value?.items?.map((column, index: number) => {
                return <LayoutColumnRenderer value={column} key={index} />
            })
        }
        {/* <LayoutSelectionEditor /> */}
    </div>;
}