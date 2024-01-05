import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: 'postgres://default:Xo8exJnua9cr@ep-orange-bar-41662611.us-east-1.postgres.vercel-storage.com:5432/verceldb',
    entities: [`${__dirname}/../**/*.entity.js`],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
