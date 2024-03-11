import { Button } from "./ui/button";
interface ActionButtonProps {
    onExport?: () => void;
    onCopy?: () => void;
}

export function ActionButton({ onExport, onCopy }: ActionButtonProps) {
    return (
        <>
            <Button className="mr-2" onClick={onExport}>Export</Button>
            <Button className="ml-2" variant="outline" onClick={onCopy}>Copy</Button>
        </>
    )
}