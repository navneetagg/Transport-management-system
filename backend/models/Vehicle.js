const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleNumber: { type: String, required: true, unique: true }, 
    driverName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Available', 'On Journey', 'Maintenance'], 
        default: 'Available' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);