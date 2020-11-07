export interface ICoreConfig {
	port?: number;
	domain?: string;
	protocol?: 'http' | 'https';
	indexFile?: string;
	encryptionKey?: string;
}
