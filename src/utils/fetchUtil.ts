async function getData(url: string): Promise<{data: any, error: Error | null}> {
    try {
        const response: Response = await fetch(url);
        const data = await response.json();
        if(response.ok) return {data, error: null};
        const errorMessage: string = 'Server error:' + data.error.message;
        return {data: null, error: new Error(errorMessage)};
    } catch(error) {
        const errorMessage: string = 'Fetch error:' + error;
        return {data: null, error: new Error(errorMessage)};
    }
}

export default getData;