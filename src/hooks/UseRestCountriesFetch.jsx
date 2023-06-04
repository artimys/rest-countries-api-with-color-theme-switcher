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

            if (!response.ok) {
                throw new Error(response.statusText);
            }

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
            const responses = Promise.all([
                fetch(`${API}name/${name}`),
                fetch(`${API}region/${region}`)
            ]);


            // TODO - need to error handle when one call returns 404,
            // TODO - code continues and errors at nameResutls.filter when name='perus'
            // const [response1, response2] = responses;
            // if (!response1.ok || !response2.ok) {
            //     throw new Error(response.statusText);
            // }

            // Getting JSON data from resposnes and destructuring data
            const jsonPromises = (await responses).map(response => response.json());
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