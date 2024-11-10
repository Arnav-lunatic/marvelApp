/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PUBLIC_API_KEY: string;
	readonly VITE_PRIVATE_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
