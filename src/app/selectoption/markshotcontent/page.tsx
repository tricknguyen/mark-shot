"use client"

import { ItemType, LayoutItem } from "@/types";
import { useCallback } from "react";
import GeneralSetting from "./setting";
import "../../../styles/markshotcontent.css";
import { LayoutItemSelector } from "@/components/layoutrender/LayoutItemSelector";
import { LayoutSectionRenderer } from "@/components/layoutrender/LayoutSectionRenderer";
import useLayoutUpdater from "@/hooks/useLayoutUpdater";

function MainPage() {
  const { layout, handleSelectItem } = useLayoutUpdater();

  function renderSelectionMarkup() {
    const result: Array<JSX.Element> = [];
    layout.items.filter((item) => item.itemtype === ItemType.Section).forEach((section, index) => {
      result.push(<LayoutSectionRenderer value={section} key={index}/>)
    })

    return result;
  }

  const renderNewSelectorLayout = useCallback(() => {
    if (!layout.items || layout.items?.length === 0) {
      return <LayoutItemSelector small={false} contextItem={layout} onSelectItem={(item: LayoutItem) => handleSelectItem(item, layout.id)} />
    }
  }, [handleSelectItem, layout]);

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
        <GeneralSetting />
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
