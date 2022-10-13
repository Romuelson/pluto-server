export const configuration = () => ({
	port: parseInt(process.env.PORT || '80', 10),
	database: {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT || '1488', 10),
	},
});
