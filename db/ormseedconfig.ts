import { DataSource, DataSourceOptions } from 'typeorm';
import { dataSourceOptions } from './data-source';

const ormseedconfig: DataSourceOptions = {
    ...dataSourceOptions,
    migrations: ['dist/db/seeds/*.js'],
};

const seedSource = new DataSource(ormseedconfig);

export default seedSource;
