import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        console.log("MongoDB Connected");
        return mongoose.connection.client;
    }

    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log("MongoDB Connected");
    } catch (err) {
        console.log(err);
    } finally {
        return mongoose.connection.client;
    }
};
