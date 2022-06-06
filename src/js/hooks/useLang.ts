import { Dispatch, useState } from 'react';
import config from '../config/config.json';

type ILang = 'cs' | 'en';

const useLang = (): {
    lang: ILang;
    setLang: Dispatch<ILang>;
} => {
    const [lang, setLang] = useState<ILang>(config.lang as ILang);

    return {
        lang,
        setLang,
    };
};

export default useLang;
export { ILang };
