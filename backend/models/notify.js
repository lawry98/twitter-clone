import mongoose from "mongoose";

const notifySchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    type: { type: String, required: true, enum: ["like", "follow"] },
    read: { type: Boolean, default: false },
}, { timestamps: true });

const Notify = mongoose.model("notify", notifySchema);

export default Notify;