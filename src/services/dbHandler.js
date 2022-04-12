import { openConnection } from '../drive/sequelize.js';
import { initUserTypeModel } from '../model/usertype.dao.js';
import { initUserModel } from '../model/user.dao.js';
import { initAddressModel } from '../model/address.dao.js';

class DB {

    constructor(){
        this.connection=openConnection();
    };
    /**
     * Create tables in database for all DAOs initiate.
     * @param {boolean} force, if true, DROP all tables related to each DAO model and recreate them.
     */
    createTables=(force=false)=>{
        if (this.connection) {
            // first we initialize models
            initUserTypeModel(this.connection);
            initUserModel(this.connection);
            initAddressModel(this.connection);

            // and than sync with database
            this.connection.sync({ force: force }).then(() => {
                console.log(force?"Drop and re-sync db.":"Re-sync db.");
            });
            return true;
        }
    };

};

export { DB };