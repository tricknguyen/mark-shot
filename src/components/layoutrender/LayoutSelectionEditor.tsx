import useLayoutUpdater from "@/hooks/useLayoutUpdater";
import { LayoutItemSelector } from "./LayoutItemSelector";
import { LayoutItem } from "@/types";

export function LayoutSelectionEditor() {
    const { handleSelectItem } = useLayoutUpdater();

    return <>
    <div className="border-selector-top">
      <LayoutItemSelector small={true} onSelectItem={(item: LayoutItem) => handleSelectItem(item)}/>
    </div>
    <div className="border-selector-bot">
      <LayoutItemSelector small={true} onSelectItem={(item: LayoutItem) => handleSelectItem(item)} />
    </div>
    <div>
      {/* {renderActionToolbar()} */}
    </div>
  </>
}