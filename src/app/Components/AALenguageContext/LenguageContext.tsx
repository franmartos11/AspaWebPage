'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LanguageContextType = {
    language: 'es' | 'en';
    setLanguage: (lang: 'es' | 'en') => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<'es' | 'en'>('es');

    useEffect(() => {
        const savedLanguage = (localStorage.getItem('language') as 'es' | 'en') || 'es';
        setLanguage(savedLanguage);
    }, []);

    const changeLanguage = (lang: 'es' | 'en') => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}