import { getGeoLocation } from '../model/geoLocation.dao.js'
import { Point } from '../model/point.js';

const getLocationByAddress=async (address)=>{
    const geoaddress=await getGeoLocation(address);
    let point=null;
    
    
    if( geoaddress
        && geoaddress.status==200
        && geoaddress.data.features.length>=1)
        {
            point=new Point(
                geoaddress.data.features[0].geometry.coordinates[0],
                geoaddress.data.features[0].geometry.coordinates[1]
            );
            console.log(geoaddress.data);
        }
    
    return point?point.toString():false;
};

export{ getLocationByAddress };