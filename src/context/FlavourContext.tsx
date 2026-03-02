import React, { createContext, useContext, useState } from "react";

const FlavourContext = createContext(null);

export const FlavourProvider = ({children}) => {
    const [userFlavourProfile, setUserFlavourProfile] =useState(null)
    return (
        <FlavourContext.Provider value={{ userFlavourProfile, setUserFlavourProfile }}>
            {children}
        </FlavourContext.Provider>
    )
}

export const useFlavour = () => {
    const context = useContext(FlavourContext);
    if (!context){
        throw new Error('useFlavour must be used inside a FlavourProvider')
    }
    return context;
}
