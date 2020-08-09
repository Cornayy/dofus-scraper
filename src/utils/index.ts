import axios from 'axios';

export * from './data';

export const fetchUrl = async (url: string): Promise<string> => {
    try {
        const { data } = await axios.get(url);

        // Wait a bit before next request due to rate-limiting.
        await sleep(500);

        return data;
    } catch (err) {
        console.error(`Error fetching: ${url}`);
    }
};

export const postUrl = async (url: string, body: string): Promise<string> => {
    try {
        const headers = {
            accept: 'text/html, */*; q=0.01',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            'content-length': '42',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            origin: 'https://www.dofus.com',
            'user-agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'x-pjax': 'true',
            'x-pjax-container': '.ak-item-details-container',
            'x-requested-with': 'XMLHttpRequest',
        };
        const { data } = await axios.post(url, body, { headers });
        // Wait a bit before next request due to rate-limiting.
        await sleep(500);

        return data;
    } catch (err) {
        console.error(`Error posting: ${url}`);
    }
};

export const getFileName = (category: string, ext: string): string => `${category}${ext}`;

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
