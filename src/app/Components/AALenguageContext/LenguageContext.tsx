'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageContextType = {
    language: string;
    setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>('es');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'es';
        setLanguage(savedLanguage);
    }, []);

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (p0: string) => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
 