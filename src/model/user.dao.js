import { Model, DataTypes } from 'sequelize';
import { UserTypeDAO } from './usertype.dao.js';

class UserDAO extends Model {
  getName() {
    return this.name;
  };
};

/**
 * Init the model, associated with a Sequelize instance
 * and define the initial dataset when the table is create into database.
 * 
 * @param {Sequelize} db the Sequelize ORM instance connected into the database.
 * @returns {boolean} true in success or false otherwise.
 */
const initUserModel=(db)=>{
    if (!db){
        console.log("Missing connection with db.");
        return false;
    }

    UserDAO.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            typeId: {
                type: DataTypes.INTEGER,
                references: {
                    // This is a reference to user type model
                    model: UserTypeDAO,
                    // This is the column name of the referenced model
                    key: 'id'
                }
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING
        },
        { sequelize: db, tableName: 'users' }
    ).afterSync(
        ()=>{
            console.log("User table has been created.");
            // put the default values into table
            UserDAO.create({name:"Dr. Fulano de Tal", description:"Médico", typeId: 3 });
            UserDAO.create({name:"Beltrano Neto", description:"Cliente da Boa Saúde", typeId: 1});
            UserDAO.create({name:"Sicrano Sobrinho", description:"Responsável pelo laboratório.", typeId: 2});
            UserDAO.create({name:"Dr. Machuca", description:"Enfermeiro", typeId: 3 });
            UserDAO.create({name:"Dona Belinha", description:"Cliente da Boa Saúde", typeId: 1});
            UserDAO.create({name:"Sra. Lindalva", description:"Responsável pela clinica de estética.", typeId: 2});
        }
    ).afterCreate(
        ()=>{
            console.log("A new User has been added.");
        }
    );
    return true;
};

/**
 * Gets one or all users from a user table.
 * @param {string} (optional) id the identifier of one user.
 * @returns {Promise<UserDAO[]>} One or more instances of User model.
 */
const getUser=(id=null)=>{
    let where={
        where: (id?{id:id}:{})
    };
    return UserDAO.findAll(where);
};

/**
 * Gets all users from a user type id.
 * @param {string} (mandatory) id the identifier of user type.
 * @returns {Promise<UserDAO[]>} One or more instances of User model.
 */
 const getUserByTypeId=(id=null)=>{
    let where={
        where: (id?{typeId:id}:{})
    };
    return UserDAO.findAll(where);
};

export { UserDAO, initUserModel, getUser, getUserByTypeId };