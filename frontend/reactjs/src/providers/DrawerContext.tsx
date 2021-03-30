import React, { createContext, useState, ReactNode } from 'react';


interface DrawerContextData {
    state: boolean;
    toggleDrawer: (val: boolean) => void;
}

interface Props {
    children: ReactNode
}

export const DrawerContext = createContext({} as DrawerContextData);

export function DrawerProvider({ children }: Props) {
    const [state, setState] = useState(false);

    const toggleDrawer = (open: boolean) => {
        setState(open);
    };

    return (
        <DrawerContext.Provider value={{state, toggleDrawer}}>
            { children }
        </DrawerContext.Provider>
    );
};