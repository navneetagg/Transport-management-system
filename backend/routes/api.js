const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');

// 1. Add a New Vehicle
router.post('/vehicles', async (req, res) => {
    try {
        const { vehicleNumber, driverName, driverPhone } = req.body;
        const newVehicle = new Vehicle({ vehicleNumber, driverName, driverPhone });
        await newVehicle.save();
        res.status(201).json({ success: true, data: newVehicle });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 2. Get All Vehicles
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json({ success: true, data: vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 3. Create/Schedule a Trip
router.post('/trips', async (req, res) => {
    try {
        const { tripId, vehicleId, destination, cargoDetails } = req.body;

        // Check if vehicle is available
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle || vehicle.status !== 'Available') {
            return res.status(400).json({ success: false, message: 'Vehicle is not available or does not exist' });
        }

        const newTrip = new Trip({ tripId, vehicleId, destination, cargoDetails });
        await newTrip.save();

        // Update vehicle status to 'On Journey'
        vehicle.status = 'On Journey';
        await vehicle.save();

        res.status(201).json({ success: true, data: newTrip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// 4. Get All Trips (with Vehicle Details populated)
router.get('/trips', async (req, res) => {
    try {
        const trips = await Trip.find().populate('vehicleId');
        res.json({ success: true, data: trips });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// 5. Update Trip Status (Workflow Transitions)
router.put('/trips/:id', async (req, res) => {
    try {
        const { deliveryStatus } = req.body;
        const trip = await Trip.findById(req.id || req.params.id);

        if (!trip) {
            return res.status(404).json({ success: false, message: 'Trip not found' });
        }

        trip.deliveryStatus = deliveryStatus;
        await trip.save();

        // If trip is delivered or cancelled, make the vehicle 'Available' again
        if (deliveryStatus === 'Delivered' || deliveryStatus === 'Cancelled') {
            await Vehicle.findByIdAndUpdate(trip.vehicleId, { status: 'Available' });
        }

        res.json({ success: true, data: trip });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;