import { createContext } from "react";

export interface ContextType{
    showInfo: boolean,
    setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContextTypeDefault: ContextType = {
    showInfo: false,
    setShowInfo: ()=>{}
}

export const AppContext= createContext<ContextType>(ContextTypeDefault);
