import { createContext } from "react";
import { ContextType } from "src/interfaces/ContextType.interface";

const ContextTypeDefault: ContextType = {
    showInfo: false,
    setShowInfo: ()=>{}
}

export const AppContext = createContext<ContextType>(ContextTypeDefault);
export type { ContextType }; 
