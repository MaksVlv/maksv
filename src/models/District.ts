import mongoose, { Schema, Document, model } from 'mongoose';

interface District extends Document {
    name: {
        lv: string,
        ru: string,
        en: string
    },
    city: mongoose.Schema.Types.ObjectId,
    name_translit: string
}

const districtSchema: Schema = new Schema<District>({
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true,
    },
    name: {
        lv: {
            type: String,
            required: true,
        },
        ru: {
            type: String,
            required: true,
        },
        en: {
            type: String,
            required: true,
        },
    },
    name_translit: {
        type: String,
        required: true
    }
},{ timestamps: true });

export default mongoose.models.District || model<District>('District', districtSchema);
