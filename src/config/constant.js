import md5 from "crypto-js/md5";

const privateApiKey = import.meta.env.VITE_PRIVATE_API_KEY;
const publicApiKey = import.meta.env.VITE_PUBLIC_API_KEY;
const ts = new Date().getTime();
const hash = md5(ts + privateApiKey + publicApiKey).toString();

export {privateApiKey, publicApiKey, hash, ts}