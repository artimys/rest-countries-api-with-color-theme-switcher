import { useState, useCallback } from 'react';

const useFetch = () => {
    const [isLoading , setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const callFetch = useCallback(async (endpoint, applyData) => {
        try {
            const response = await fetch(endpoint, applyData);

            if (!response.ok) {
                throw Error(response.statusText);
            }
            const data = await response.json();

            const newData = [];
            for (const key in data) {
                const newRow = {
                    id: key,
                    ...data[key]
                };
                newData.push(newRow);
            }

            console.log('\n', endpoint);
            console.log("Data fetched, count:", newData.length);

            setIsLoading(false);
            setError(null);

            applyData(newData);
        } catch(error) {
            setIsLoading(false);
            setError('Something went wrong. Please refresh page if issue persists.');
            console.log('throw error: ' +  error)
        }
    });


    return { isLoading, error, callFetch }
}

export default useFetch;