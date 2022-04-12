import { Model, DataTypes } from 'sequelize';

/**
 * This is the domain table with types for users classify.
 */
class UserTypeDAO extends Model {
  getName() {
    return this.name;
  };
  getDescription() {
    return this.description;
  };
};

const initUserTypeModel=(db)=>{
    if (!db){
        console.log("Missing connection with db.");
        return false;
    }

    UserTypeDAO.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING
        },
        { sequelize: db, tableName: 'usertypes' }
    ).afterSync(
        ()=>{
            console.log("User type table has been created.");
            // put the default values into table
            UserTypeDAO.create({id: 1, name:"associado", description:"São os clientes da operadora."});
            UserTypeDAO.create({id: 2, name:"conveniado", description:"São os laboratórios, hospitais e clínicas."});
            UserTypeDAO.create({id: 3, name:"prestador", description:"São os colaboradores da operadora como: médicos, enfermeiros, fisioterapeutas, dentistas entre outros."});
        }
    ).afterCreate(
        ()=>{
            console.log("User type table has been populated.");
        }
    );

    return true;
};

export { UserTypeDAO, initUserTypeModel };