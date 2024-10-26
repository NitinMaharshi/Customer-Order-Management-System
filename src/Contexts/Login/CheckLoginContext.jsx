import { createContext, useState } from 'react';

export const CheckLoginContext = createContext()

const GlobalStateProvider = ({ children }) => {
    const [globalBoolean, setGlobalBoolean] = useState(false);

    return (
        <CheckLoginContext.Provider value={{ globalBoolean, setGlobalBoolean }}>
            {children}
        </CheckLoginContext.Provider>
    );
};

export default GlobalStateProvider;
