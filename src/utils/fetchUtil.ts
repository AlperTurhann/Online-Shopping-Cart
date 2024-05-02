async function getData(url: string): Promise<any> {
    try {
        const response: Response = await fetch(url);
        const data = await response.json();

        if(response.ok) return data;
        else {
            console.error('Server error:', data.error.message);
            return null;
        }
    } catch(error) {
        console.error('Fetch error:', error);
        return null;
    }
}

export default getData;