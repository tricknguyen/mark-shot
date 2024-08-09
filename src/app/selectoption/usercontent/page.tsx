"use client"

import { colorSettings } from "@/store";
import { Provider, useAtom } from "jotai";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";
import { ActionButton, ImageHandler, SettingsImage } from "@/components";

export default function Home() {
    const domEl = useRef(null);
    const [settingColors] = useAtom(colorSettings);
  
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
      <Provider>
        <div className="grid h-full">
          <div className="grid items-stretch gap-6 grid-cols-5">
            <div className="col-span-1 border">
              <SettingsImage listColor={settingColors}/>
            </div>
            <div className="col-span-4 border">
              <ImageHandler domEl={domEl} />
            </div>
          </div>
          <div className="flex justify-end mt-4 h-1/2">
            <ActionButton onExport={handleExportImage} onCopy={handleCopyImageToClipBoard} />
          </div>
        </div>
      </Provider>
    );
  }