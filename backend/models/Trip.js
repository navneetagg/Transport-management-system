const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
    tripId: { type: String, required: true, unique: true }, // e.g., TRIP-101
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    destination: { type: String, required: true },
    cargoDetails: { type: String, required: true }, // Kya maal jaa raha hai
    dispatchDate: { type: Date, default: Date.now },
    deliveryStatus: { 
        type: String, 
        enum: ['Scheduled', 'In Transit', 'Delivered', 'Cancelled'], 
        default: 'Scheduled' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);