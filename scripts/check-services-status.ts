import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

async function checkStatus() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        const services = await Service.find({}, 'slug title advantages benefits');
        console.log(`Found ${services.length} services.`);

        services.forEach(s => {
            const hasAdvantages = s.advantages && s.advantages.length > 0;
            const hasBenefits = s.benefits && s.benefits.length > 0;
            console.log(`- Service: ${s.title} (${s.slug})`);
            console.log(`  - Advantages: ${hasAdvantages ? s.advantages?.length : 'EMPTY (Using Fallback?)'}`);
            console.log(`  - Benefits:   ${hasBenefits ? s.benefits?.length : 'EMPTY'}`);
        });

    } catch (error) {
        console.error('Error checking services:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

checkStatus();
