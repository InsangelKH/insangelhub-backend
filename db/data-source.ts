import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    url: 'postgres://jobyycrbtcjgzh:97a315342d0cd8229825ce300f608875b4e167122a792a3af40334d6e767c32b@ec2-44-206-204-65.compute-1.amazonaws.com:5432/d72b7vq7jdp4i3',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
