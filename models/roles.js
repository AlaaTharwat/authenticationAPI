const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
},{
    timestamps: true
});

const Role = mongoose.model("roles", roleSchema);

exports.Role = Role;





