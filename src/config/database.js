const mongoose = require("mongoose")

async function connectToDb() {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('Connected To DB')
    })
}

module.exports = connectToDb