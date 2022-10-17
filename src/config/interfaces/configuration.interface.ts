export interface IHttpConfig {
	port: string;
	host: string;
}

export interface IMongodbConfig {
	uri: string;
	host: string;
	port: string;
}

export interface IConfiguration {
	http: IHttpConfig;
	database: IMongodbConfig;
}
