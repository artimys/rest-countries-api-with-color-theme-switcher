import { useState, useCallback } from 'react';

const useFetch = () => {
    const [isLoading , setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const callFetch = useCallback(async (endpoint) => {
        setIsLoading(true);
        setError(null);

        const newData = [];

        try {
            const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);

            if (!response.ok) {
                throw Error(response.statusText);
            } else if (response.status === 404) {
                throw Error("Sorry, no countries found with that name.");
            }

            const data = await response.json();

            for (const key in data) {
                const newRow = {
                    id: key,
                    ...data[key]
                };
                newData.push(newRow);
            }

            console.log("Data fetched, count:", newData.length);

            setIsLoading(false);
            setError(null);

        } catch(error) {
            setIsLoading(false);
            setError(error);
            console.log('throw error: ' +  error)
        }

        return newData;
    }, []);


    return {
        isLoading,
        error,
        callFetch
    };
};

export default useFetch;