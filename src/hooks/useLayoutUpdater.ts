import { layoutStore } from "@/store";
import { Layout, LayoutItem } from "@/types";
import { useAtom } from "jotai";
import { useCallback } from "react";

const useLayoutUpdater = () => {
    const [layout, setLayout] = useAtom<Layout>(layoutStore);

    const addItemAtCorrectSibling = useCallback((container: LayoutItem, itemToAdd: LayoutItem) => {
        if (!container.items) {
            container.items = [];
        }
        container.items.push(itemToAdd);
    }, []);

    const addItem = useCallback((itemToAdd: LayoutItem, container: LayoutItem): boolean => {
        if (container.id === itemToAdd.containerId) {
            addItemAtCorrectSibling(container, itemToAdd);
            return true;
        } else if (container.items && container.items.length > 0) {
            for (const item of container.items) {
                if (addItem(itemToAdd, item)) {
                    return true;
                }
            }
        }
        return false;
    }, [addItemAtCorrectSibling]);

    const handleSelectItem = useCallback((item: LayoutItem, containerId?: string): void => {
        debugger;
        const newItem: LayoutItem = {
            ...item,
            containerId: containerId ? containerId : layout.id
        };
        setLayout((prevValue) => {
            const newLayout = { ...prevValue };
            addItem(newItem, newLayout);
            return newLayout;
        });

    }, [layout.id, addItem, setLayout]);

    return {
        layout,
        handleSelectItem,
    };
};

export default useLayoutUpdater;