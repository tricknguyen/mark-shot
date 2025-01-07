"use client"

import { ItemType, LayoutItem } from "@/types";
import { useCallback } from "react";
import GeneralSetting from "./setting";
import "../../styles/markshotcontent.css";
import { LayoutItemSelector } from "@/app/multiplelayout/layoutrender/LayoutItemSelector";
import { LayoutSectionRenderer } from "@/app/multiplelayout/layoutrender/LayoutSectionRenderer";
import useLayoutUpdater from "@/hooks/useLayoutUpdater";
import { Provider } from "jotai";

function MainPage() {
  const { layout, handleSelectItem } = useLayoutUpdater();

  function renderSelectionMarkup() {
    const result: Array<JSX.Element> = [];
    layout.items.filter((item) => item.itemtype === ItemType.Section).forEach((section, index) => {
      result.push(<LayoutSectionRenderer value={section} key={index} />)
    })

    return result;
  }

  const renderNewSelectorLayout = useCallback(() => {
    if (!layout.items || layout.items?.length === 0) {
      return <LayoutItemSelector small={false} contextItem={layout} onSelectItem={(item: LayoutItem) => handleSelectItem(item, layout.id)} />
    }
  }, [handleSelectItem, layout]);

  return <div className="flex items-center justify-center overflow-hidden w-full aspect-[16/10] text-[5.5vw] md:text-[3.5vw] 2xl:text-[2vw] layout h-full"
    style={{ backgroundImage: `linear-gradient(90deg, #ffafbd 0%, #ffc3a0 100%)` }}>
    {renderNewSelectorLayout()}
    {renderSelectionMarkup()}
  </div>
}

export default function Home() {
  return (
    <Provider>
      <div className="grid h-full">
        <div className="grid items-stretch gap-6 grid-cols-5 h-full">
          <div className="col-span-1 border h-full">
            <GeneralSetting />
          </div>
          <div className="col-span-4 border h-full">
            <MainPage />
          </div>
        </div>
        <div className="flex justify-end mt-4 h-1/2">
          Action Button
        </div>
      </div>
    </Provider>
  );
}
