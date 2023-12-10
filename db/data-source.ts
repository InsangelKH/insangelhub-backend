import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: 'postgres://xqqnbxwjosarsy:8b810befc095c6e6994e20d6aa2f97fde3d1e0e3cf9a2a224e854be5022be29f@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/delglvhtcc2t3n',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
    ssl: {
        rejectUnauthorized: false,
    },
    extra: {
        ssl: {
            sslmode: 'require',
        },
    },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
