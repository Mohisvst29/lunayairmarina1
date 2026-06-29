import type { IService } from '../src/models/Service';
import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

const crewPrepData = {
    slug: 'crew-preparation',
    title: 'Crew Preparation',
    titleAr: 'إعداد الطاقم',
    description: 'Specialized training and preparation services for marine crew to ensure the highest standards of safety and professionalism.',
    descriptionAr: 'خدمات تدريب وتحضير متخصصة للطاقم البحري لضمان أعلى معايير السلامة والاحترافية.',
    category: 'Training',
    image: 'placeholder.jpg', // Assuming placeholder or existing image
    advantages: [
        {
            title: 'Experience and Professionalism',
            titleAr: 'الخبرة والاحترافية',
            description: 'Our team has deep experience in marine tourism, yacht management, and technical maintenance.',
            descriptionAr: 'فريقنا يتمتع بخبرة عميقة في مجال السياحة البحرية، وإدارة اليخوت، والصيانة الفنية.',
            icon: 'award' // Icon name if needed
        },
        {
            title: 'Focus on Quality and Safety',
            titleAr: 'التركيز على الجودة والسلامة',
            description: 'We ensure highest quality and safety standards in all our services, prioritizing the safety of customers and visitors.',
            descriptionAr: 'نضمن أعلى معايير الجودة والسلامة في جميع خدماتنا، مع إعطاء الأولوية لسلامة العملاء والزوار.',
            icon: 'shield-check'
        },
        {
            title: 'Cultural Diversity',
            titleAr: 'التنوع الثقافي',
            description: 'Our team includes experts from diverse cultural backgrounds, creating a work environment rich in cultures and experiences.',
            descriptionAr: 'فريقنا يضم خبراء من خلفيات ثقافية متنوعة، مما يخلق بيئة عمل غنية بالثقافات والتجارب.',
            icon: 'globe'
        },
        {
            title: 'Continuous Training',
            titleAr: 'التدريب المستمر',
            description: 'We offer advanced training programs to ensure our team possesses the latest skills in the marine industry, including the latest repair and maintenance techniques.',
            descriptionAr: 'نقدم برامج تدريبية متقدمة لضمان أن فريقنا يمتلك أحدث المهارات في الصناعة البحرية، بما في ذلك أحدث التقنيات وأساليب الإصلاح والصيانة.',
            icon: 'book-open'
        },
        {
            title: 'Cooperation and Flexibility',
            titleAr: 'التعاون والمرونة',
            description: 'We work with one team spirit, ensuring a motivating and flexible work environment.',
            descriptionAr: 'نعمل بروح الفريق الواحد، مع ضمان بيئة عمل محفزة ومرنة.',
            icon: 'users'
        }
    ],
    benefits: [
        {
            title: 'Quality and Excellence',
            titleAr: 'الجودة والتميز',
            description: 'We ensure providing marine services with highest quality standards, focusing on the safety and comfort of our customers.',
            descriptionAr: 'نضمن تقديم خدمات بحرية بأعلى معايير الجودة، مع التركيز على سلامة وراحة عملائنا.',
            icon: 'star'
        },
        {
            title: 'Professional Development',
            titleAr: 'التطوير المهني',
            description: 'We offer opportunities for professional growth, with specialized training programs.',
            descriptionAr: 'نقدم فرصاً للنمو المهني، مع برامج تدريبية متخصصة.',
            icon: 'trending-up'
        },
        {
            title: 'Motivating Environment',
            titleAr: 'البيئة المحفزة',
            description: 'We are keen to provide a positive work environment, appreciating the efforts and contributions of our team.',
            descriptionAr: 'نحرص على توفير بيئة عمل إيجابية، مع تقدير جهود ومساهمات فريقنا.',
            icon: 'smile'
        }
    ]
};

async function seed() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        console.log(`Checking for service with slug: ${crewPrepData.slug}`);
        let service = await Service.findOne({ slug: crewPrepData.slug });

        if (!service) {
            console.log('Service not found, creating new one...');
            service = new Service(crewPrepData);
        } else {
            console.log('Service found, updating advantages and benefits...');
            service.advantages = crewPrepData.advantages;
            service.benefits = crewPrepData.benefits;
            // Also update titles if they are generic/placeholder
            if (service.title === 'Crew Preparation' || service.title === 'Service Title') {
                service.title = crewPrepData.title;
                service.titleAr = crewPrepData.titleAr;
                service.description = crewPrepData.description;
                service.descriptionAr = crewPrepData.descriptionAr;
            }
        }

        await service.save();
        console.log('Service updated successfully!');
        console.log('Advantages added:', service.advantages?.length);
        console.log('Benefits added:', service.benefits?.length);

    } catch (error) {
        console.error('Error seeding service:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seed();
