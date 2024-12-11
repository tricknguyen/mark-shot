import Link from "next/link";

const buttonStyles = "inline-flex h-[72px] items-center justify-center rounded-md border border-gray-900 px-16 text-lg font-medium text-gray-900 transition-colors hover:bg-gray-900 hover:text-gray-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-50 dark:text-gray-50 dark:hover:bg-gray-50 dark:hover:text-gray-900 dark:focus-visible:ring-gray-300";

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="space-x-4">
                <Link
                    href="/onelayout"
                    className={buttonStyles}
                >
                    One Layout
                </Link>
                <Link
                    href="/multiplelayout"
                    className={buttonStyles}
                >
                    Custom Layout
                </Link>
            </div>
        </div>
    );
}