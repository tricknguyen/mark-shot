import { ImageHandler } from "@/components/ImageHandler";
import { Settings } from "@/components/Settings";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="container h-full py-3">
      <div className="grid grid-rows-4">
        
        <div className="grid h-full items-stretch gap-6 grid-cols-4">
          <div className="col-span-1">
            <Settings />
          </div>
          <div className="col-span-3">
            <ImageHandler />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button className="mr-2">Export</Button>
          <Button className="ml-2" variant="outline">Copy</Button>
        </div>

      </div>


    </main>
  );
}
