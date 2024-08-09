import { Block } from "@/types"
import { TextBlock } from "../blocks/TextBlock"

interface LayoutBlockRendererProps {
    value?: Block
}

export function LayoutBlockRenderer({ value }: LayoutBlockRendererProps) {
    //check type value then render exact block

    return <div >
        <TextBlock contextBlock={value} />
    </div>
}