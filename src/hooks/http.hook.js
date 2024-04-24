export const useHttp = () => {
    const request = async (
        url, 
        method = 'GET', 
        body = null, 
        headers = {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
    ) => {
        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
            
        } catch(e) {
            throw e;
        }
    };

    return {request};
}