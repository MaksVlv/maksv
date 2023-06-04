import mongoose, { Schema, Document, model } from 'mongoose';

interface City extends Document {
    name: {
        lv: string,
        ru: string,
        en: string
    },
    name_translit: string
}

const citySchema: Schema = new Schema<City>({
    name: {
        type: {
            lv: {
                type: String,
                required: true
            },
            ru: {
                type: String,
                required: true
            },
            en: {
                type: String,
                required: true
            },
        },
        required: true,
        unique: true
    },
    name_translit: {
        type: String,
        required: true
    }
},{ timestamps: true });

export default mongoose.models.City || model<City>('City', citySchema);
