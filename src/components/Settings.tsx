import { colors } from "@/models/GradientLibrary";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";

export function Settings() {

    return (
        <div className="border-r py-4 lg:block">
            {/* Setting */}
            <div className="px-3 py-2 border-b">
                <span className="text-lg font-semibold mb-2">Background</span>
                <div className="grid grid-cols-3 pt-2">
                    {
                        colors.map((color, index) => {
                            return <div key={index} className="flex justify-center"> 
                                <Card className="w-[80px] h-[80px] mb-2" style={{backgroundImage: `linear-gradient(90deg, #${color.from} 0%, #${color.to} 100%)`  }} />
                            </div> 
                        })
                    }
                </div>
            </div>

            <div className="px-3 py-6 border-b ">
                <h2 className="text-lg font-semibold mb-2">Padding</h2>
                <Slider defaultValue={[10]} max={100} step={1} />
            </div>

            <div className="px-3 py-6 border-b ">
                <h2 className="text-lg font-semibold mb-2">Corner</h2>
                <Slider defaultValue={[10]} max={100} step={1} />
            </div>

            <div className="px-3 py-6">
                <h2 className="text-lg font-semibold mb-2">Shadow</h2>
                <Slider defaultValue={[10]} max={100} step={1} />
            </div>
        </div>
    );
}