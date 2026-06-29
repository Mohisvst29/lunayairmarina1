
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Load env vars
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
}

const ServiceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    },
    { strict: false } // We only need these fields for inspection
);

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function inspectServices() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const services = await Service.find({}, 'title relatedServices').lean();

        console.log('--- Services Inspection ---');
        for (const service of services) {
            console.log(`Service: ${service.title} (${service._id})`);
            if (service.relatedServices && service.relatedServices.length > 0) {
                console.log(`  Related Services IDs: ${JSON.stringify(service.relatedServices)}`);
            } else {
                console.log('  No explicit related services set.');
            }
        }
        console.log('---------------------------');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

inspectServices();
