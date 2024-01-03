import { Sequelize } from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../constants';

const connectPostgres = async () => {
    try {
        const conn = await Sequelize(
            DB_NAME,
            DB_USERNAME,
            DB_PASSWORD,
            {
                host: DB_HOST,
                dialect: 'postgres',
            }
        )
        console.log("Successfully connected to PostgreSQL")
        return conn
    } catch (error) {
        console.error(`Problem connection to PostgreSQL: ${error}`)
        process.exit(1)
    }
}

const databaseConnection = connectPostgres();

export { databaseConnection };