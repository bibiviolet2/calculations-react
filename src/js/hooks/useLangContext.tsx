import { ILang } from './useLang';
import React, { Dispatch, PropsWithChildren } from 'react';

interface ILangContext {
    lang: ILang;
    setLang: Dispatch<ILang>;
}
const LangContext = React.createContext<ILangContext | undefined>(undefined);

const LangContextProvider: React.FC<PropsWithChildren<ILangContext>> = ({
    lang,
    setLang,
    children,
}) => {
    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

const useLangContext = (): ILangContext => {
    const context = React.useContext(LangContext);

    if (undefined === context) {
        throw new Error(
            'useLangContext must be used within a LangContextProvider'
        );
    }

    return context;
};

export { LangContextProvider, useLangContext };
