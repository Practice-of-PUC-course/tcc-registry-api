// loadind the .env file for this context
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
dotenv.config({ silent: true });

/**
 * Start a connection with the database and return an instance.
 * If has a reference of another Sequelize object with active connection pool, will be returned.
 * Set .env to change configuration of the API account
 */
const openConnection=()=>{

    if (!(process.env.DB && process.env.PASSWORD && process.env.USERNAME && process.env.HOST && process.env.DIALECT)) {
        console.log("Missing the database parameters. Review the .env configuration file.");
        return false;
    }

    let opts={
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };

    let postgres = new Sequelize(
        process.env.DB, process.env.USERNAME, process.env.PASSWORD,
        {
            host: process.env.HOST || 'localhost',
            port: process.env.PORT || 5432,
            dialect: process.env.DIALECT,
            dialectOptions: {
                application_name: 'POC-API (Node.js)'
            },
            pool: opts.pool
        }
    );

    if(typeof postgres=='object') return postgres;
    else return false;
};

export { openConnection };