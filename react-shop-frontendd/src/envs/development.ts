const requestUrl = import.meta.env.VITE_REQUEST_URL_DEV || 'http://localhost:3000/api';
const tokenKey = import.meta.env.VITE_TOKEN_KEY || 'token';
const siteKey = import.meta.env.VITE_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
const secretKey = import.meta.env.VITE_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

export { requestUrl, tokenKey, siteKey, secretKey };
