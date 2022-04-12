import { Model, DataTypes } from 'sequelize';
import { Address } from './address.dto.js';
import { UserDAO } from './user.dao.js';
import { Point } from './point.js';

class AddressDAO extends Model {

  getAddressDTO() {
    let p=new Point(this.location.lng, this.location.lat);
    return new Address(this.streetName, this.houseNumber, this.countyName, this.stateName, p);
  };

  setAddressByDTO(address) {
    this.streetName=address.street;
    this.houseNumber=address.number;
    this.countyName=address.county;
    this.stateName=address.state;
    this.location=address.location.toGeoJson();
  };

  getAddress() {
    return [this.streetName, this.houseNumber, this.countyName, this.stateName].join(', ');
  };

  getLocation() {
    return this.location;
  };
};

const initAddressModel=(db)=>{
  if (!db){
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
    ()=>{
        console.log("Address table has been created.");

        AddressDAO.create(
          {userId:1,streetName:'Rua Luiz Carlos Samartini',
          houseNumber:'226',countyName:'São José dos Campos',
          stateName:'São Paulo',location:'{"type":"Point","coordinates":[-45.827097,-23.256606]}'});
    }
  ).afterCreate(
    ()=>{
        console.log("A new Address has been added.");
    }
  );
};

export { initAddressModel };