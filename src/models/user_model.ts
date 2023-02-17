import mongoose from "mongoose";

const DataScheema = new mongoose.Schema({
    cash: Object
});

const UserModel = mongoose.model('User', DataScheema);

export { UserModel };