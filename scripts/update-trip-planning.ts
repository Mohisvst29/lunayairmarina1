import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

const tripPlanningData = {
    slug: 'booking-trip-planning',
    // 1. Why Choose Section (Advantages)
    advantages: [
        {
            title: '',
            titleAr: '',
            description: 'At Lunier Marina, we do not just provide booking services; we ensure a luxurious and safe marine experience, with preserving the marine environment at the heart of our interests.',
            descriptionAr: 'في لونيير مارينا، نحن لا نقدم خدمات حجز فحسب، بل نضمن تجربة بحرية فاخرة وآمنة، مع الحفاظ على البيئة البحرية في قلب اهتماماتنا.',
            icon: ''
        }
    ],
    // 2. Discover Close Up Section (Detailed Description)
    detailedDescription: `Booking and Trip Planning Services:
We offer flexible booking options to suit all your needs, ensuring a smooth and safe experience. Whether you prefer booking online or through our team, we ensure your expectations are met.

Marine Trip Permits:
We provide full support in obtaining local and international visas and permits, ensuring a seamless marine experience without complications.

Marine Trip Planning:
Our specialized team plans your marine trips, whether recreational or practical, ensuring efficiency and comfort. Whether you are planning a cruise around our beautiful shores or an international voyage, we guarantee an unforgettable experience.`,

    detailedDescriptionAr: `خدمات الحجز وتخطيط الرحلات:
نقدم خيارات حجز مرنة تناسب جميع احتياجاتكم، مع ضمان تجربة سلسة وآمنة. سواء كنتم تفضلون الحجز عبر الإنترنت أو من خلال فريقنا، فإننا نضمن تلبية توقعاتكم.

تصاريح الرحلات البحرية:
نوفر الدعم الكامل للحصول على التأشيرات والتصاريح المحلية والدولية، مما يضمن تجربة بحرية سلسة دون تعقيدات.

تخطيط الرحلات البحرية:
فريقنا المتخصص يخطط لرحلاتكم البحرية، سواء الترفيهية أو العملية، مع ضمان الكفاءة والراحة. سواء كنتم تخططون لرحلة بحرية حول شواطئنا الخلابة أو رحلة دولية، فإننا نضمن تجربة لا تُنسى.`
};

async function seed() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        const service = await Service.findOne({ slug: tripPlanningData.slug });

        if (!service) {
            console.error('Service not found!');
            return;
        }

        console.log(`Service found: ${service.title}`);

        // Update Advantages
        service.advantages = tripPlanningData.advantages;

        // Update Detailed Description (Discover Close Up)
        service.detailedDescription = tripPlanningData.detailedDescription;
        service.detailedDescriptionAr = tripPlanningData.detailedDescriptionAr;

        // Clear benefit icons if any (as per "Delete Icons")
        // We will keep the benefits themselves if they exist, but remove icons.
        // If the user meant "Delete the benefits section icons", this does it.
        // If they meant "Delete the benefits section entirely", we would set benefits = [].
        // Given the image shows "+3 Benefits" in one card but "Add this article" in another, 
        // and the "Delete Icons" was near the Why Choose section...
        // I will assume removing icons from existing benefits is safe.
        if (service.benefits) {
            service.benefits.forEach(b => {
                b.icon = '';
            });
        }

        await service.save();
        console.log('Service updated successfully!');

    } catch (error) {
        console.error('Error seeding service:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seed();
