import mongoose, { Schema, Document, model } from 'mongoose';

interface User extends Document {
    username: string;
    password: string;
    isAdmin: boolean;
}

const userSchema: Schema = new Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
});

export default mongoose.models.User || model<User>('User', userSchema);
