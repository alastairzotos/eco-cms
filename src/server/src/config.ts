import * as dotenv from 'dotenv';
import findup from 'findup-sync';

dotenv.config({ path: findup('.env', { cwd: __dirname }) });

export default {
    mode: process.env.MODE,
    port: parseInt(process.env.PORT, 10),
    authkey: process.env.AUTH_KEY,
    db: {
        connectionString: process.env.DB_CONNECTION_STRING,
        password: process.env.DB_PASSWORD
    }
};
