import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="grid h-full">
            <div className="grid items-stretch gap-6 grid-cols-5">
                <div className="col-span-1 border p-4">
                    <Skeleton className="h-8 w-full mb-4" />
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-[200px] w-full" />
                    </div>
                </div>

                <div className="col-span-4 border p-4">
                    <div className="flex items-center justify-center h-[80vh]">
                        <div className="space-y-4 w-2/3">
                            <Skeleton className="h-[400px] w-full" />
                            <div className="flex justify-end">
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 