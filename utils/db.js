import mongoose from "mongoose";
export const dbmongoosee = mongoose;
await mongoose.connect("mongodb://127.0.0.1:27017/contactapp")
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log(err);
    });