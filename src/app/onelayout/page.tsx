"use client"

import { colorSettings } from "@/store";
import { Provider, useAtom } from "jotai";
import { useRef } from "react";
import { ActionButton } from "@/components";
import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LoadingPanel = () => (
    <div className="p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <div className="space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-[200px] w-full" />
        </div>
    </div>
);

const LoadingImage = () => (
    <div className="flex items-center justify-center h-[80vh]">
        <div className="space-y-4 w-2/3">
            <Skeleton className="h-[400px] w-full" />
            <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    </div>
);

const ImageHandler = dynamic(() => import('@/components/ImageHandler').then(mod => mod.ImageHandler), {
    loading: () => <LoadingImage />
});

const SettingsImage = dynamic(() => import('@/components/SettingsImage').then(mod => mod.SettingsImage), {
    loading: () => <LoadingPanel />
});

export default function Home() {
    const domEl = useRef(null);
    const [settingColors] = useAtom(colorSettings);
    const router = useRouter();
  
    const fetchImageData = async (imageUrl: string) => {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }
        return response.blob();
    };
  
    const handleExportImage = async () => {
        if (!domEl.current) return;
        
        const { toPng } = await import('html-to-image');
        const url = await toPng(domEl.current);
        const link = document.createElement("a");
        link.download = "MarkShotV.png";
        link.href = url;
        link.click();
    };
  
    const handleCopyImageToClipBoard = async () => {
        if (!domEl.current) return;
        
        try {
            const { toPng } = await import('html-to-image');
            const url = await toPng(domEl.current);
            const imageData = await fetchImageData(url);
            await navigator.clipboard.write([
                new ClipboardItem({ [imageData.type]: imageData })
            ]);
        } catch (error) {
            console.error('Failed to copy image:', error);
        }
    };
  
    return (
        <Provider>
            <Button 
                variant="outline" 
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800" 
                onClick={() => router.back()}
            >
                <ChevronLeft />
            </Button>
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
                    <ActionButton 
                        onExport={handleExportImage} 
                        onCopy={handleCopyImageToClipBoard} 
                    />
                </div>
            </div>
        </Provider>
    );
}