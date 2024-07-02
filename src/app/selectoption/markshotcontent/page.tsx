"use client"

import { Button } from "@/components/ui/button";
import { Plus, Type } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ItemType, Layout, LayoutItem, Section } from "@/models";
import { defaultSelections, layoutStore } from "@/store";
import { useAtom } from "jotai";
import { IdDefaultSection } from "@/store";
import { useState } from "react";

interface DefaultItemLayout extends Layout {
  display?: JSX.Element
}

function MainPage() {
  const [layout, setLayout] = useAtom(layoutStore);

  const [itemSelected, setItemSelected] = useState<Section>();

  function addItemAtCorrectSibling(container: LayoutItem, itemToAdd: LayoutItem) {
    if (!container.items) {
      container.items = [];
    }
    
    for (let i = 0; i < container.items.length; i++) {
      // const currentItem = container.items[i];
      // if (currentItem.id === containerSettings.siblingId) {
      //   if (containerSettings.postInsert) {
      //     container.items.splice(i + 1, 0, itemToAdd);
      //     return;
      //   }
      //   else {
      //     container.items.splice(i, 0, itemToAdd);
      //     return;
      //   }
      // }
    }
    /*Default push the item to the end of the container*/
    container.items.push(itemToAdd);
  }

  function handleSelectItem(item: LayoutItem) {
    const newItem: LayoutItem = {
      ...item,
      containerId: layout.id
    };

    setLayout((prevValue) => {
      const newLayout = {...prevValue};
      addItem(newItem, newLayout);
      return newLayout;
    });

    console.log(layout);
    
  }

  function addItem(itemToAdd: LayoutItem, container: LayoutItem) {
    if (container.id === itemToAdd.containerId) {
      addItemAtCorrectSibling(container, itemToAdd)
    } else if (container.items && container.items.length > 0) {
      for (let i = 0; i < container.items.length; i++) {
        // if (addItem(itemToAdd, containerSettings, container.items[i])) {
        //   return true;
        // }
      }
    }
  }

  function renderButtonSelector() {
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
                        <div className="flex flex-col items-center py-4 bg-gray-900 rounded-md cursor-pointer" key={index} onClick={() => { handleSelectItem(item); }}>
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
                    return <div className="grid grid-cols-3" key={index}>
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


  function renderSelectorLayout() {
    if (!layout.items || layout.items?.length === 0) {
      return renderButtonSelector();
    }
  }

  function renderSelectionMarkup() {
    let result: Array<JSX.Element> = [];
    if (layout.items && layout.items.length > 0) {
      debugger;
      layout.items.forEach((item) => {
        result.push(
          <div className="border-box w-full flex flex-1 flex-nowrap min-w-0 justify-center relative transition-all duration-500 py-1 rounded-md cursor-pointer"
            style={{ boxShadow: "0px 2px 0px 0px white, inset 0px 2px 0px 0px white" }}>
            {
              item.items?.map((item, index: number) => {
                return <div key={index}
                  className="items-center bg-white rounded-md flex h-full w-full min-h-[100px] justify-center"
                // onClick={() => {
                //   setItemSelected(item);
                // }}
                >
                  {/* {!item.items && renderButtonSelector()} */}
                </div>
              })
            }
          </div>
        )
      })
    }
    return result;
  }


  return <div className="flex items-center justify-center overflow-hidden w-full aspect-[16/10] text-[5.5vw] md:text-[3.5vw] 2xl:text-[2vw]"
    style={{ backgroundImage: `linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%)` }}>
    {renderSelectorLayout()}
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
