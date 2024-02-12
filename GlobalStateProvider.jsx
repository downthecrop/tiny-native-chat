import React, { useState, useEffect, createContext } from 'react';
import { loadValue, saveValue } from './storageHelper'; // Assuming saveValue is the method to save data

export const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState('');
    const [modelName, setModelName] = useState('');

    const DEFAULT_MODEL = "gpt-4"
    const DEFAULT_KEY = ""

    // Load initial values
    useEffect(() => {
        async function loadInitialValues() {
            const storedApiKey = await loadValue('apiKey');
            if (storedApiKey) {
                setApiKey(storedApiKey);
            } else {
                setApiKey(DEFAULT_KEY);
            }

            const storedModelName = await loadValue('modelName');
            if (storedModelName) {
                setModelName(storedModelName);
            } else {
                setModelName(DEFAULT_MODEL)
            }
        }
        loadInitialValues();
    }, []);

    // Persist apiKey changes
    useEffect(() => {
        if (apiKey) {
            saveValue('apiKey', apiKey);
        }
    }, [apiKey]); // This effect runs when `apiKey` changes

    // Persist modelName changes
    useEffect(() => {
        if (modelName) {
            saveValue('modelName', modelName);
        }
    }, [modelName]); // This effect runs when `modelName` changes

    return (
        <GlobalStateContext.Provider value={{ apiKey, setApiKey, modelName, setModelName }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;
