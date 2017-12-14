const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventSchema = new Schema({
    userID: { type: String, required: true, trim: true },
    eName: { type: String, required: true },
    eDate: { type: Number, required: true },
    eLocat: { type: String, required: true },
    eCap: { type: Number, required: true },
    eMainDetail: { type: String, required: true },
    status: { type: Number, required: true },
    eSubDetail: [{
        key: String,
        value: String
    }],
    createdAt: { type: Number, default: new Date().getTime() },
    expiredAt: { type: Number, default: new Date().getTime() + (60 * 60 * 24) },
    updatedAt: { type: Number, default: new Date().getTime() },
})



module.exports = mongoose.model('_Event', eventSchema)