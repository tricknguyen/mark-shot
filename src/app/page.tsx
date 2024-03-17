"use client"

import { ActionButton } from "@/components/ActionButton";
import { ImageHandler } from "@/components/ImageHandler";
import { Settings } from "@/components/Settings";
import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Provider } from "jotai";
import { settingsStore } from "@/store/SettingStore";

export default function Home() {
  const domEl = useRef(null);

  async function fetchImageData(imageUrl: string) {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch image: ${response.statusText}");
    }
    return await response.blob();
  } 

  function createImageFile(blob: Blob, filename: string) {
    const newFile = new File([blob], filename, { type: blob.type });
    return newFile;
  }

  async function handleExportImage() {
    let url = null;
    if (domEl.current) {
      url = await htmlToImage.toPng(domEl.current);
      const link = document.createElement("a");
      link.download = "MarkShotV.png";
      link.href = url;
      link.click();
    }
  }


  async function handleCopyImageToClipBoard() {
    let url = null;
    if (domEl.current) {
      url = await htmlToImage.toPng(domEl.current);
      try {
        const imageData = await fetchImageData(url);
        const imageFile = createImageFile(imageData, "MarkShotV");
        await navigator.clipboard.write([new ClipboardItem({ [imageFile.type]: imageFile })]);
        console.log("Image copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy image to clipboard:", error);
      }
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
          <ActionButton onExport={handleExportImage} onCopy={handleCopyImageToClipBoard}/>
        </div>
      </div>
    </main>
  );
}
