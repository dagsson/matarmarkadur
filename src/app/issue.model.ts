import { mongoose } from 'mongoose';

const Schema = mongoose.Schema;

export let Issue = new Schema({
    type: {
        type: String
    },
    properties: {
        type: Object
    },
    geometry: {
        type: Object
    }
});