import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

async function migrate() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        const services = await Service.find({});
        console.log(`Processing ${services.length} services...`);

        for (const service of services) {
            let advTitle = 'Why Choose Lunier Marina?';
            let advTitleAr = 'لماذا تختار لونيير مارينا؟';
            let benTitle = 'Benefits & Opportunities';
            let benTitleAr = 'الفوائد والفرص';

            if (['maintenance', 'financial-affairs', 'administrative-affairs'].includes(service.slug || '')) {
                advTitle = 'Enriching the Experience at Every Stage';
                advTitleAr = 'إثراء التجربة في كل مرحلة';
            }

            if (service.slug === 'maintenance') {
                benTitle = 'Why Clients Choose Us';
                benTitleAr = 'لماذا يختارنا العملاء';
            } else if (service.slug === 'financial-affairs') {
                benTitle = 'Advanced Financial Management Process';
                benTitleAr = 'عملية الإدارة المالية المتطورة';
            } else if (service.slug === 'administrative-affairs') {
                benTitle = 'Tangible Results';
                benTitleAr = 'نتائج ملموسة';
            }

            // Only update if not already set (or force update to ensure consistency)
            // I'll force update to make sure we capture the current requirement
            service.advantagesTitle = advTitle;
            service.advantagesTitleAr = advTitleAr;
            service.benefitsTitle = benTitle;
            service.benefitsTitleAr = benTitleAr;

            await service.save();
            console.log(`Updated titles for ${service.slug}: Adv=[${advTitle}], Ben=[${benTitle}]`);
        }

    } catch (error) {
        console.error('Error migrating titles:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

migrate();
