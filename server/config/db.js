import mongoose from 'mongoose'

const connectDB = async () => {
    const URI = process.env.MONGO_URI

    try {
        const connect = await mongoose.connect(URI)
        console.log(`MongoDB connected: ${connect.connection.host}`)
        return mongoose.connection.host
    } catch (error) {
        console.error(`Error while connecting to database: ${error.message}`);
    }
}

export default connectDB