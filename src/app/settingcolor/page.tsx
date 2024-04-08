import { Button } from "@/components/ui/button";
import { ChevronLeft, Dices } from "lucide-react";
import Link from "next/link";

export default function Page() {


    function renderColor() {
        return <div className="m-2 p-2 rounded-lg border-2 h-full" style={{ maxHeight: "min(860px, 100vh - 64px)" }}>

        </div>;
    }

    function renderSetting() {
        return <div>
            <header className="flex flex-col items-center">
                <Button variant="outline" size="icon">
                    <Dices className="h-[32px]" />
                </Button>
                <h1 className="text-3xl text-amber-200 font-semibold">Gradient Generator</h1>
                <p className="text-neutral-500 text-lg">Beautiful, lush gradients ✨</p>
            </header>
            <div>
                <div>
                    <h3 className="font-semibold leading-none tracking-tight">
                        Colors
                    </h3>
                    <div className="grid grid-cols-5 gap-3 pt-2">
                            <Button
                                className="w-full h-full aspect-square"
                                
                            >
                            </Button>
                            <Button
                                className="w-full h-full aspect-square"
                                
                            >
                            </Button>
                            <Button
                                className="w-full h-full aspect-square"
                                
                            >
                            </Button>
                            <Button
                                className="w-full h-full aspect-square"
                                
                            >
                            </Button>
                            <Button
                                className="w-full h-full aspect-square"
                                
                            >
                            </Button>
                    </div>
                </div>
            </div>
        </div>;
    }

    return (
        <div className="flex flex-col h-full mx-2">
            <header className="p-4">
                <div className="flex items-center">
                    <Link className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800" href="./">
                        <ChevronLeft />
                    </Link>
                    <h1 className="text-xl font-bold leading-none ml-2">Generator Gradient Color</h1>
                </div>
            </header>

            {/* Page */}
            <div className="p-4 grid grid-cols-2 gap-9 max-w-[1200px] container">
                {renderColor()}
                {renderSetting()}
            </div>

            <div>
                {/* Action Button */}
            </div>
        </div>
    )
}