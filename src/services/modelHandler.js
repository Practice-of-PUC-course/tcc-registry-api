import { openConnection } from '../drive/sequelize.js';
import { initUserTypeModel } from '../model/usertype.dao.js';
import { initUserModel } from '../model/user.dao.js';
import { initAddressModel } from '../model/address.dao.js';

class modelHandler {

    constructor(){
        this.conn=openConnection();
        this.initModels();
    };

    /**
     * initialize models
     */
    initModels=()=>{
        if (this.conn) {
            initUserTypeModel(this.conn);
            initUserModel(this.conn);
            initAddressModel(this.conn);
        }
    };

    /**
     * Create tables in database for all DAOs initiate.
     * @param {boolean} force, if true, DROP all tables related to each DAO model and recreate them.
     */
    createTables=(force=false)=>{
        if (this.conn) {
            // sync the models with database
            this.conn.sync({ force: force }).then(() => {
                console.log(force?"Drop and re-sync db.":"Re-sync db.");
            });
            return true;
        }
    };
};

/**
 * I expect the datasource is only called once
 * and the Sequelize pool connections are kept alive while running the API.
 */
const dataSource=new modelHandler();

export { dataSource };