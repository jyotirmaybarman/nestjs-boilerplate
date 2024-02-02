import { env } from "src/utils/env";
import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: env.DB_TYPE,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_DATABASE,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    entities: ['dist/**/typeorm/entities/*.entity.js'],
    migrations: ['dist/**/typeorm/migrations/*.js'],
    synchronize: false    
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;