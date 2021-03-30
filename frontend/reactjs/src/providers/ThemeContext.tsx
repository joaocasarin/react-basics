import React, { createContext, ReactNode, useState } from 'react';
/* import { darkTheme, lightTheme } from '../Themes/Themes'; */

interface Props {
    children: ReactNode
}

interface Theme {
    header?: string;
    bg?: string;
    color?: string;
}

interface ThemeContextData {
    theme: Theme;
    changeTheme: () => void;
}

const lightTheme: Theme = {
    header: '#3f51b5',
    bg: '#d2d9db',
    color: '#333'
};

const darkTheme: Theme = {
    header: '#333',
    bg: '#121212',
    color: '#fff'
};

export const ThemeContext = createContext({} as ThemeContextData);

export function ThemeProvider(props: Props) {
    const [theme, setTheme] = useState(lightTheme);    

    function changeTheme() {
        theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
    }

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            { props.children }
        </ThemeContext.Provider>
    );
}