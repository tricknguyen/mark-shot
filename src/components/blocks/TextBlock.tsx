import { Block } from "@/types"

interface TextBlockProps {
    contextBlock: Block
}

export function TextBlock({contextBlock}: TextBlockProps) {
    return (
        <>
            Test Text Block
        </>
    )
}