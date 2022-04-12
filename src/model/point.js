/**
 * Represents the location point and has longitude and latitude coordinates.
 */
class Point {
    /**
     * Setting the values for a point.
     * 
     * @param {double precision} longitude, the value for the longitude of a geographic coordinate.
     * @param {double precision} latitude, the value for the latitude of a geographic coordinate.
     */
    constructor(longitude,latitude){
        this.longitude=longitude;
        this.latitude=latitude;
    };

    /**
     * Export data of instance to JSON.
     * @returns {...} a simple text Object
     */
    toString=()=>{
        return {
            "lat":this.getLat(),
            "lng":this.getLng()
        };
    };

    /**
     * Export data of instance to GEOJSON.
     * @returns {...} a GeoJson Object
     */
    toGeoJson=()=>{
        return JSON.stringify({"type":"Point","coordinates":[this.longitude,this.latitude]});
    }
};

export { Point };