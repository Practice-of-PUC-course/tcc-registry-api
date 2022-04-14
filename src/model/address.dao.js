import { Model, DataTypes } from 'sequelize';
import { UserDAO } from './user.dao.js';

class AddressDAO extends Model {
};

/**
 * Init the model, associated with a Sequelize instance
 * and define the initial dataset when the table is create into database.
 * 
 * @param {Sequelize} db the Sequelize ORM instance connected into the database.
 * @returns {boolean} true in success or false otherwise.
 */
const initAddressModel = (db) => {
  if (!db) {
    console.log("Missing connection with db.");
    return false;
  }
  return AddressDAO.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
          // This is a reference to User model
          model: UserDAO,
          // This is the column name of the referenced model
          key: 'id'
        }
      },
      streetName: DataTypes.STRING,
      houseNumber: DataTypes.STRING,
      countyName: DataTypes.STRING,
      stateName: DataTypes.STRING,
      location: DataTypes.GEOGRAPHY('POINT', 4326)
    },
    { sequelize: db, tableName: 'addresses' }
  ).afterSync(
    () => {
      console.log("Address table has been created.");

      AddressDAO.create(
        {
          userId: 1, streetName: 'Rua Luiz Carlos Samartini',
          houseNumber: '226', countyName: 'São José dos Campos',
          stateName: 'São Paulo', location: '{"type":"Point","coordinates":[-45.827097,-23.256606]}'
        });
    }
  ).afterCreate(
    () => {
      console.log("A new Address has been added.");
    }
  );
};

/**
 * Gets one user address from a addresses table.
 * @param {string} (mandatory) id the identifier of one user.
 * @returns {Promise<AddressDAO>} One instance of Address model.
 */
const getByUserId = (id = '-1') => {
  let where = {
    where: { userId: id }
  };
  return AddressDAO.findOne(where);
};

/**
 * Adding an address for a user in the database.
 * @param {number|string} userId The user identifier.
 * @param {Address} address A DTO Address instance.
 * @returns {Promise<any>} A promise that it will be saved.
 */
const add = (userId, address) => {
  return AddressDAO.create(address.toJson(userId));
};

/**
 * Updating an exists address of a user in the database.
 * @param {number|string} userId The user identifier.
 * @param {Address} address A DTO Address instance.
 * @returns {Promise<any>} A promise that it will be saved.
 */
const update = (userId, address) => {
  return AddressDAO.update(address.toJson(userId),{where:{id:address.id}});
};

export { AddressDAO, initAddressModel, getByUserId, add, update };