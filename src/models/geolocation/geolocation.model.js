export class Geolocation {
    constructor({ id, name, latitude, longitude, isoCode, countryName, timezone }) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isoCode = isoCode;
        this.countryName = countryName;
        this.timezone = timezone;
    }
}
