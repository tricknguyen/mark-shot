import { Block } from "@/models"

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