import { useEffect, useState } from 'react';
import { createContext } from 'react';

const ThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {

    const [themes, setTheme] = useState('dark');
    const setInitTheme = () => { document.getElementById("__next").classList.add("dark"); }

    useEffect(() => {
        localStorage.setItem("themes", themes);
    }, [themes]);

    useEffect(() => {
        setInitTheme()
    })

    const handleToggleTheme = () => {
        themes === "light" ? setTheme("dark") : setTheme("light");
        if (themes !== "light") {
            document.getElementById("__next").classList.remove("dark");
            document.getElementById("__next").classList.add("light");
        } else {
            document.getElementById("__next").classList.remove("light");
            document.getElementById("__next").classList.add("dark");
        }
    };
    return (
        <ThemeContext.Provider value={{ themes, handleToggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext