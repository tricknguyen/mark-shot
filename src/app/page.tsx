"use client"

import { ActionButton } from "@/components/ActionButton";
import { ImageHandler } from "@/components/ImageHandler";
import { Settings } from "@/components/Settings";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { Provider } from "jotai";
import { settingsStore } from "@/store/SettingStore";

export default function Home() {
  const domEl = useRef(null);

  async function handleExportImage() {
    let url = null;
    if (domEl.current) {
      url = await htmlToImage.toPng(domEl.current);
      const link = document.createElement("a");
      link.download = "html-to-img.png";
      link.href = url;
      link.click();
    }
  }

  return (
    <main className="container py-3 100vh">
      <div className="grid">

        <div className="grid items-stretch gap-6 grid-cols-4">
          <Provider store={settingsStore}>
            <div className="col-span-1 border-r ">
              <Settings />
            </div>
            <div className="col-span-3 border">
              <ImageHandler domEl={domEl} />
            </div>
          </Provider>
        </div>

        <div className="flex justify-end mt-4 h-1/2">
          <ActionButton onExport={handleExportImage} />
        </div>
      </div>
    </main>
  );
}
