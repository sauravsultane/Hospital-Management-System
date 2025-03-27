import { createContext, useMemo } from "react";
import { doctors} from "../assets/assets";
console.log("Doctors data:", doctors);

export const AppContext = createContext({ doctors: [] });

const AppContextProvider = ({ children }) => {
    const value = useMemo(() => ({ doctors }), []);

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
