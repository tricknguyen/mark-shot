"use client"

import { Button } from "@/components/ui/button";
import { Plus, Type } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Block, ItemType, LayoutItem, Section } from "@/models";
import { defaultSelections, layoutStore, IdDefaultSection } from "@/store";
import { useAtom } from "jotai";
import { useCallback, useState } from "react";
import { TextBlock } from "@/components/blocks/TextBlock";

function MainPage() {
  const [layout, setLayout] = useAtom(layoutStore);

  const addItemAtCorrectSibling = useCallback((container: LayoutItem, itemToAdd: LayoutItem) => {
    if (!container.items) {
      container.items = [];
    }

    // for (let i = 0; i < container.items.length; i++) {
    //   const currentItem = container.items[i];
    //   if (currentItem.id === containerSettings.siblingId) {
    //     if (containerSettings.postInsert) {
    //       container.items.splice(i + 1, 0, itemToAdd);
    //       return;
    //     }
    //     else {
    //       container.items.splice(i, 0, itemToAdd);
    //       return;
    //     }
    //   }
    // }
    /*Default push the item to the end of the container*/
    container.items.push(itemToAdd);
  }, [])

  const addItem = useCallback((itemToAdd: LayoutItem, container: LayoutItem): boolean => {
    if (container.id === itemToAdd.containerId) {
      addItemAtCorrectSibling(container, itemToAdd);
      return true;
    } else if (container.items && container.items.length > 0) {
      for (const item of container.items) {
        if (addItem(itemToAdd, item)) {
          return true;
        }
      }
    }
    return false;
  }, [addItemAtCorrectSibling]);

  const handleSelectItem = useCallback((item: LayoutItem, containerId?: string): void => {
    const newItem: LayoutItem = {
      ...item,
      containerId: containerId ? containerId : layout.id
    };
    setLayout((prevValue) => {
      const newLayout = { ...prevValue };
      addItem(newItem, newLayout);
      return newLayout;
    });

  }, [layout.id, addItem, setLayout]);

  const renderLayoutSelector = useCallback((contextItem?: LayoutItem) => {
    if (contextItem?.items?.length === 0) {
      return <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white text-black hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Plus className="h-6 w-6" />
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
                          <div className="flex flex-col items-center py-4 bg-gray-900 rounded-md cursor-pointer" key={index} onClick={() => { handleSelectItem(item, contextItem?.id); }}>
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
                      return <div className="grid grid-cols-3" key={index} onClick={() => { handleSelectItem(item, contextItem?.id); }}>
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
    } return null;
  }, [handleSelectItem]);

  const renderLayoutBlock = useCallback((contextItem: Block) => (
    <div>
      <TextBlock contextBlock={contextItem} />
    </div>
  ), []);



  const renderLayoutColumn = useCallback((column: LayoutItem, index: number) => (
    <div key={index} className="items-center bg-white rounded-md flex h-full w-full min-h-[100px] justify-center layout-column">
      {renderLayoutSelector(column)}
      {
        column.items?.map((item) => {
          if (item.itemtype === ItemType.Block) {
            return renderLayoutBlock(item as Block)
          } else if (item.itemtype === ItemType.Section) {
            return renderLayoutSection(item);
          }
        })
      }
    </div>
  ), [renderLayoutSelector, renderLayoutBlock])

  const renderLayoutSection = useCallback((section: LayoutItem) => (
    <div 
      className="border-box w-full flex flex-1 flex-nowrap min-w-0 justify-center relative transition-all duration-500 py-1 rounded-md cursor-pointer layout-section"
      style={{ boxShadow: "0px 2px 0px 0px white, inset 0px 2px 0px 0px white" }}>
      {
        section.items?.map((column, index: number) => renderLayoutColumn(column, index))
      }
    </div>
  ), [renderLayoutColumn]);
  

  const renderSelectionMarkup = useCallback(() => (
    // let result: Array<JSX.Element> = [];

    // if (layout && layout.items) {
    //   const sections = layout.items.filter((item) => { return item.itemtype === ItemType.Section });

    //   sections.forEach((section) => {
    //     result.push(renderLayoutSection(section))
    //   })
    // }
    // return result;

    layout?.items?.filter((item) => item.itemtype === ItemType.Section).map((section, index: number) => renderLayoutSection(section))
  ), [layout, renderLayoutSection]);

  const renderNewSelectorLayout = useCallback(() => {
    if (!layout.items || layout.items?.length === 0) {
      return renderLayoutSelector(layout);
    }
  }, [layout, renderLayoutSelector]);

  return <div className="flex items-center justify-center overflow-hidden w-full aspect-[16/10] text-[5.5vw] md:text-[3.5vw] 2xl:text-[2vw] layout"
    style={{ backgroundImage: `linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%)` }}>
    {renderNewSelectorLayout()}
    {renderSelectionMarkup()}
  </div>
}

export default function Home() {
  return (
    <main className="container h-dvh overflow-hidden grid grid-cols-1 md:grid-cols-3 md:gap-4 p-0 md:p-4">
      <div className="order-last md:order-first max-h-full overflow-y-auto">
        setting at here
      </div>
      <div className="col-span-2 flex flex-col order-first md:order-last">
        <MainPage />
        <div>
          Action Button
        </div>
      </div>
    </main >
  );
}
