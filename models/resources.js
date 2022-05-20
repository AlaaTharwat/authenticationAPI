const mongoose = require("mongoose");
const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  resources_roles: [{
    roles_id: { type: mongoose.Schema.Types.ObjectId, ref : 'roles' },
    roles_name: { type:  String },
    create: { type: Boolean },
    delete: { type: Boolean },
    update: { type: Boolean },
    read: { type: Boolean },
  }]
},{
    timestamps: true
});

const Resource = mongoose.model("resources", resourceSchema);

exports.Resource = Resource;





