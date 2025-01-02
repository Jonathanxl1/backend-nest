import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    host: process.env.HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbname: process.env.POSTGRES_DBNAME,
    port: parseInt(process.env.POSTGRES_PORT),
  },
}));
