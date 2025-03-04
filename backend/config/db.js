import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://root:root@cluster0.dfj2z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log("DB Connected"))
        .catch((err) => console.error("DB Connection Error: ", err));
};
