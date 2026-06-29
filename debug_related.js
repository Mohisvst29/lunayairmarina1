
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Load env vars
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
}

// Mimic the Model and Logic
const ServiceSchema = new mongoose.Schema(
    {
        title: { type: String },
        slug: { type: String },
        relatedServices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
        category: { type: String },
    },
    { strict: false }
);
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

async function testServiceDetail() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected');

    const slug = 'marina-security';
    // Or find by ID if we have it. User gave: 692b4b5932caa55e46a818bb for marina-security
    const id = '692b4b5932caa55e46a818bb';

    const service = await Service.findById(id);
    if (!service) {
        console.log('Service not found');
        return;
    }

    console.log(`Service found: ${service.title}`);
    console.log(`Related Services (Raw):`, service.relatedServices);

    const explicitRelatedIds = service.relatedServices || [];

    if (explicitRelatedIds.length > 0) {
        // Mimic my fix logic
        const idsToFind = explicitRelatedIds.map(rid => new mongoose.Types.ObjectId(rid.toString()));
        console.log('IDs to find:', idsToFind);

        const explicit = await Service.find({
            _id: { $in: idsToFind },
        }).exec();

        console.log(`Found ${explicit.length} related services in DB.`);
        explicit.forEach(s => console.log(` - ${s.title} (${s._id})`));
    } else {
        console.log('No explicit related services.');
    }

    await mongoose.disconnect();
}

testServiceDetail();
