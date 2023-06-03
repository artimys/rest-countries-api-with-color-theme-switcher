import { useState, useCallback } from 'react';

const useFetch = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API = "https://restcountries.com/v3.1/";


    const fetchBy = useCallback(async (endpoint) => {
        setIsLoading(true);
        setError(null);

        const newData = [];

        try {
            const response = await fetch(`${API}${endpoint}`);
            const data = await response.json();

            for (const key in data) {
                const newRow = {
                    id: key,
                    ...data[key]
                };
                newData.push(newRow);
            }

            setIsLoading(false);
            setError(null);

        } catch(error) {
            setIsLoading(false);
            setError(error);
            console.error("callFetch:", error);
        }

        return newData;
    }, []);


    const fetchByNameAndRegion = useCallback(async (name, region) => {
        setIsLoading(true);
        setError(null);

        const newData = [];

        try {
            const fetchByName = fetch(`${API}name/${name}`);
            const fetchByRegion = fetch(`${API}region/${region}`);

            const responses = Promise.all([
                fetchByName,
                fetchByRegion
            ]);

            // Getting JSON data from resposnes and destructuring data
            const jsonPromises = responses.map(response => response.json());
            const [nameResults, regionResults] = await Promise.all(jsonPromises);

            const data = nameResults.filter(country =>
                regionResults.some(regionCountry => regionCountry.name.common === country.name.common)
            );

            for (const key in data) {
                const newRow = {
                    id: key,
                    ...data[key]
                }
                newData.push(newRow);
            }

            setIsLoading(false);
            setError(null);

        } catch(error) {
            setIsLoading(false);
            setError(error);
            console.error("callFetchAll:", error);
        }

        return newData;
    }, []);


    return {
        isLoading,
        error,
        fetchBy,
        fetchByNameAndRegion
    };
};

export default useFetch;