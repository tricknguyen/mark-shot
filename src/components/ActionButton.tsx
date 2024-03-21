import { useState } from "react";
import { Button } from "./ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
interface ActionButtonProps {
    onExport: () => void;
    onCopy: () => void;
}

export function ActionButton({ onExport, onCopy }: ActionButtonProps) {
    const [isCopied, setIsCopied] = useState(false);

    return (
        <>
            <Button className="mr-2" onClick={onExport}>Export</Button>
            <Button className="ml-2" variant="outline" onClick={() => {
                setIsCopied(true);
                onCopy();
            }}>
                {
                    isCopied ? <><CheckIcon /> Copied</> : "Copy"
                }
            </Button>
        </>
    )
}