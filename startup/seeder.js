const bcrypt = require("bcryptjs");



const { Role } = require("../models/roles");
const { Resource } = require("../models/resources");
const { User } = require("../models/user");


let { ErrorHandler } = require("../handlers/errorHandler");
let { success } = require("../handlers/responseHandler");

exports.seedRoles = async () => {
    const data = await Role.find().exec();
    if (data.length !== 0) {
        return;
    }

    let roles = [
        {
            name: "admin",
            slug: "admin"
        },
        {
            name: "user",
            slug: "user"
        },
        {
            name: "basic",
            slug: "basic"
        }
    ]

    Role.insertMany(roles)
        .then(function (docs) {
            console.log("role seeds done")
        })
        .catch(function (err) {
            throw new ErrorHandler(400, err.message);
        });
}


exports.seedResource = async () => {
    const data = await Resource.find().exec();
    if (data.length !== 0) {
        return;
    }
    const roles = await Role.find().exec();

    let admin_id = roles.find(r => r.name == "admin");
    let basic_id = roles.find(r => r.name == "basic");
    let user_id = roles.find(r => r.name == "user");

    let resources = [{
        name: "post",
        slug: "post",
        "resources_roles": [
            {
                "role_name": "admin",
                "role_id": admin_id,
                "create": true,
                "delete": true,
                "update": true,
                "read": true
            },
            {
                "role_name": "user",
                "role_id": user_id,
                "create": true,
                "delete": false,
                "update": false,
                "read": true
            },
            {
                "role_name": "basic",
                "role_id": basic_id,
                "create": false,
                "delete": false,
                "update": false,
                "read": true
            }
        ]
    },
    {
        name: "user",
        slug: "user",
        "resources_roles": [
            {
                "role_name": "admin",
                "role_id": admin_id,
                "create": true,
                "delete": true,
                "update": true,
                "read": true
            },
            {
                "role_name": "user",
                "role_id": user_id,
                "create": false,
                "delete": false,
                "update": false,
                "read": true
            },
            {
                "role_name": "basic",
                "role_id": basic_id,
                "create": false,
                "delete": false,
                "update": false,
                "read": false
            }
        ]
    }]

    Resource.insertMany(resources)
    .then(function (docs) {
        console.log("resource seeds done")
    })
    .catch(function (err) {
        throw new ErrorHandler(400, err.message);
    });
}

exports.seedAdminUser = async () => {
    const data = await User.find().exec();
    if (data.length !== 0) {
        return;
    }

   
    let user = new User({
       "name": "Alassa",
       "email": "alaa.tharrwat@gmail.com",
       "phone": "01119083625",
       "password": "12345678",
       "role": "admin"
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try{
        user.save();
    }catch(err){
        throw new ErrorHandler(400, err.message);
    }

    console.log("admin seed")
}

