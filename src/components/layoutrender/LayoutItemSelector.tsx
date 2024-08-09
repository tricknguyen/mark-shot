import { ItemType, LayoutItem } from "@/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus, Type } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { defaultSelections, IdDefaultSection } from "@/store";

interface LayoutItemSelectorProps {
    small?: boolean,
    contextItem?: LayoutItem,
    onSelectItem: (item: LayoutItem) => void
}

export function LayoutItemSelector({ small, contextItem, onSelectItem }: LayoutItemSelectorProps) {
    if (contextItem?.items?.length === 0 || small) {
        return <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className={`rounded-full bg-white text-black hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${small ? 'h-8 w-8' : ''}`}
                >
                    <Plus className={`${small ? 'h-4 w-4' : 'h-6 w-6'}`} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Content</DialogTitle>
                </DialogHeader>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Layouts</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-3 gap-2">
                                {
                                    defaultSelections.map((item, index: number) => {
                                        if (item.itemtype === ItemType.Section) {
                                            const title: JSX.Element = <span className="text-white">{item.title}</span>;
                                            return (
                                                <div className="flex flex-col items-center py-4 bg-gray-900 rounded-md cursor-pointer" key={index}
                                                    onClick={() => {
                                                        onSelectItem?.(item);
                                                    }}>
                                                    {
                                                        item.id === IdDefaultSection.OneColumn && <>
                                                            <div className="w-16 h-6 mb-2 bg-white rounded-md" />
                                                            {title}
                                                        </>
                                                    }
                                                    {
                                                        item.id === IdDefaultSection.TwoColumn && <>
                                                            <div className="flex space-x-2 mb-2">
                                                                <div className="w-8 h-6 bg-white rounded-md" />
                                                                <div className="w-8 h-6 bg-white rounded-md" />
                                                            </div>
                                                            {title}
                                                        </>
                                                    }
                                                    {
                                                        item.id === IdDefaultSection.ThreeColumn && <>
                                                            <div className="flex space-x-2 mb-2">
                                                                <div className="w-6 h-6 bg-white rounded-md" />
                                                                <div className="w-6 h-6 bg-white rounded-md" />
                                                                <div className="w-6 h-6 bg-white rounded-md" />
                                                            </div>
                                                            {title}
                                                        </>
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Blocks</AccordionTrigger>
                        <AccordionContent>
                            {
                                defaultSelections.map((item, index: number) => {
                                    if (item.itemtype === ItemType.Block) {
                                        return <div className="grid grid-cols-3" key={index} onClick={() => {
                                            onSelectItem?.(item);
                                        }}>
                                            <div className="flex flex-col items-center p-4 bg-gray-900 rounded-md cursor-pointer">
                                                <Type className="text-white" />
                                                <span className="text-white">{item.title}</span>
                                            </div>
                                        </div>
                                    }
                                })
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </DialogContent>
        </Dialog>
    }
    return null;
}