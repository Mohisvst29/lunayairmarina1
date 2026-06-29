import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

const STATIC_CONTENT = {
    en: {
        experience: { title: 'Experience', desc: 'Our team has extensive experience in yacht charter investment management.' },
        quality: { title: 'Quality', desc: 'We adhere to the highest quality standards in all our services.' },
        reliability: { title: 'Reliability', desc: 'We ensure a smooth and secure charter process.' }
    },
    ar: {
        experience: { title: 'الخبرة', desc: 'يتمتع فريقنا بخبرة واسعة في مجال إدارة الاستثمار في تأجير القوارب واليخوت.' },
        quality: { title: 'الجودة', desc: 'نلتزم بأعلى معايير الجودة في جميع خدماتنا.' },
        reliability: { title: 'الموثوقية', desc: 'نضمن لك عملية تأجير سلسة وآمنة.' }
    }
};

const NEW_ADVANTAGES = [
    {
        title: STATIC_CONTENT.en.experience.title,
        titleAr: STATIC_CONTENT.ar.experience.title,
        description: STATIC_CONTENT.en.experience.desc,
        descriptionAr: STATIC_CONTENT.ar.experience.desc,
        icon: ''
    },
    {
        title: STATIC_CONTENT.en.quality.title,
        titleAr: STATIC_CONTENT.ar.quality.title,
        description: STATIC_CONTENT.en.quality.desc,
        descriptionAr: STATIC_CONTENT.ar.quality.desc,
        icon: ''
    },
    {
        title: STATIC_CONTENT.en.reliability.title,
        titleAr: STATIC_CONTENT.ar.reliability.title,
        description: STATIC_CONTENT.en.reliability.desc,
        descriptionAr: STATIC_CONTENT.ar.reliability.desc,
        icon: ''
    }
];

async function migrate() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        const services = await Service.find({});
        console.log(`Checking ${services.length} services...`);

        for (const service of services) {
            // Check if advantages are empty
            if (!service.advantages || service.advantages.length === 0) {
                console.log(`Migrating service: ${service.title} (${service.slug})`);
                service.advantages = NEW_ADVANTAGES;
                await service.save();
                console.log(`- Updated (Static -> Dynamic)`);
            } else {
                console.log(`Skipping service: ${service.title} (${service.slug}) - Already has ${service.advantages.length} advantages`);
            }
        }

    } catch (error) {
        console.error('Error migrating services:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

migrate();
