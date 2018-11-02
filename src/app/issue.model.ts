export interface Farm {
    "id": String,
    "type": "Feature";
    "properties": {
        "id": String,
        "type": String,
        "place": String,
        "name": String,
        "area": String,
        "product": String,
    }
    "geometry": {
        "coordinates": [
            number, number
        ],
        "type": "Point"
    },
}