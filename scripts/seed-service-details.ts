
import mongoose from 'mongoose';
import connectDB from '../src/lib/db';
import Service from '../src/models/Service';
import { service_details_en, service_details_ar } from '../src/data/servicesContent';

// Helper function to format the detailed description
const formatDetailedDescription = (sections: any[]) => {
    return sections.map(section => {
        let content = `<h3>${section.title}</h3><p>${section.content}</p>`;
        if (section.items && section.items.length > 0) {
            content += "<ul>";
            content += section.items.map((item: string) => `<li>${item}</li>`).join('');
            content += "</ul>";
        }
        return content;
    }).join('');
};

// Helper function to extract features
const extractFeatures = (sections: any[]) => {
    return sections.reduce((acc: string[], section: any) => {
        if (section.items && section.items.length > 0) {
            return acc.concat(section.items);
        }
        return acc;
    }, []);
};

async function seedServiceDetails() {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not initialized.');
    }

    const serviceSlugs = Object.keys(service_details_en);

    for (const slug of serviceSlugs) {
        const serviceDetailsEn = service_details_en[slug as keyof typeof service_details_en];
        const serviceDetailsAr = service_details_ar[slug as keyof typeof service_details_ar];

        if (!serviceDetailsEn || !serviceDetailsAr) {
            console.warn(`Details for slug '${slug}' not found. Skipping.`);
            continue;
        }

        const detailedDescriptionEn = formatDetailedDescription(serviceDetailsEn.sections);
        const detailedDescriptionAr = formatDetailedDescription(serviceDetailsAr.sections);

        const featuresEn = extractFeatures(serviceDetailsEn.sections);
        const featuresAr = extractFeatures(serviceDetailsAr.sections);

        const service = await Service.findOne({ slug: slug });

        if (service) {
            service.detailedDescription = detailedDescriptionEn;
            service.detailedDescriptionAr = detailedDescriptionAr;
            service.features = featuresEn;
            service.featuresAr = featuresAr;

            await service.save();
            console.log(`Successfully updated details for service: ${service.title}`);
        } else {
            // As a fallback, let's try to find by title if slug fails
            const serviceByTitle = await Service.findOne({ title: serviceDetailsEn.title });
            if(serviceByTitle) {
                serviceByTitle.detailedDescription = detailedDescriptionEn;
                serviceByTitle.detailedDescriptionAr = detailedDescriptionAr;
                serviceByTitle.features = featuresEn;
                serviceByTitle.featuresAr = featuresAr;
                // also update the slug for future runs
                serviceByTitle.slug = slug;

                await serviceByTitle.save();
                console.log(`Successfully updated details for service: ${serviceByTitle.title}`);
            } else {
                console.warn(`Service with slug '${slug}' or title '${serviceDetailsEn.title}' not found in the database. Skipping.`);
            }
        }
    }
}

seedServiceDetails()
    .then(() => {
        console.log('Service details seeding complete.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding service details failed:', error);
        process.exit(1);
    });
