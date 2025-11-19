const requestUrl = import.meta.env.VITE_REQUEST_URL_PROD as string;
const tokenKey = import.meta.env.VITE_TOKEN_KEY as string;
const siteKey = import.meta.env.VITE_SITE_KEY as string;
const secretKey = import.meta.env.VITE_SECRET_KEY as string;

export { requestUrl, tokenKey, siteKey, secretKey };
