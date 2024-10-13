import mongoose from "mongoose";

const DBurl = process.env.MONGODB_CONNECTION_STRING || ''

if (!mongoose.connections[0].readyState) {
    try {
        mongoose.connect(DBurl)

    } catch (error) {
        console.log({ msg: "error while connecting to DB" }, error)
    }

}

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})
const AdminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
})

const NoticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    by: { type: String, required: true },
    likes: { type: [String], default: [] },
    dislikes: { type: [String], default: [] },
    comments: { type: [{ comm: String, username: String, time: String }] }
})

// export const User = mongoose.model('User' , UserSchema)

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
