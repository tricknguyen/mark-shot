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

  function fetchImageData(imageUrl: string) {
    return new Promise<Blob>((resolve, reject) => {
      fetch(imageUrl).then((response) => {
        if (!response.ok) {
          reject();
          throw new Error(`Failed to fetch image: ${response.statusText}`);
        } else {
          resolve(response.blob());
        }
      })
    });
  }

  function handleExportImage() {
    return new Promise<void>((resolve, reject) => {
      if (domEl.current) {
        htmlToImage.toPng(domEl.current).then((url) => {
          const link = document.createElement("a");
          link.download = "MarkShotV.png";
          link.href = url;
          link.click();
          resolve();
        });
      }
    })

  }

  function handleCopyImageToClipBoard() {
    return new Promise<void>((resolve, reject) => {
      if (domEl.current) {
        htmlToImage.toPng(domEl.current).then((url) => {
          try {
            fetchImageData(url).then((imageData) => {
              navigator.clipboard.write([new ClipboardItem({ [imageData.type]: imageData })]).then(() => {
                resolve();
              })
            })
          } catch (error) {
            reject(error);
          }
        })
      }
    });
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
          <ActionButton onExport={handleExportImage} onCopy={handleCopyImageToClipBoard} />
        </div>
      </div>
    </main>
  );
}
