import mongoose from 'mongoose';

interface Connection {
    isConnected: number | undefined;
}

const connection: Connection = { isConnected: undefined };

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        return;
    }

    try {
        const uri: string = process.env.MONGODB_URI || '';

        await mongoose.connect(uri);

        connection.isConnected = mongoose.connection.readyState;
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default dbConnect;
