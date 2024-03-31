import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {

    function renderColor() {
        return <div className="m-2 p-2 rounded-lg border-2">

        </div>;
    }

    function renderSetting() {
        return <></>;
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
            <div className="p-4 columns-2">
                {renderColor()}
                {renderSetting()}
            </div>

            <div>
                {/* Action Button */}
            </div>
        </div>
    )
}