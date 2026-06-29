import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

const serviceData = {
    slug: 'administrative-affairs',
    // Advantages (Responsibilities of the Administrative Team)
    advantages: [
        {
            title: 'Strategic Planning',
            titleAr: 'التخطيط الاستراتيجي',
            description: 'Developing comprehensive plans for operational processes, including facility management, customer services, and logistics. Ensuring alignment with the company\'s long-term vision and strategy.',
            descriptionAr: 'وضع الخطط الشاملة للعمليات التشغيلية، بما في ذلك إدارة المرافق البحرية، وخدمات العملاء، والعمليات اللوجستية. ضمان التوافق مع رؤية الشركة واستراتيجيتها طويلة المدى.',
            icon: ''
        },
        {
            title: 'Operations Oversight',
            titleAr: 'الإشراف على العمليات',
            description: 'Monitoring the precise execution of operational plans while ensuring service quality. Providing continuous support to various departments with a focus on safety and customer comfort.',
            descriptionAr: 'متابعة تنفيذ الخطط التشغيلية بدقة، مع ضمان جودة الخدمات المقدمة. توفير الدعم المستمر للإدارات المختلفة، مع التركيز على السلامة والراحة للعملاء.',
            icon: ''
        },
        {
            title: 'Inter-departmental Coordination',
            titleAr: 'التنسيق بين الأقسام',
            description: 'Ensuring effective coordination between all departments, including financial administration, marketing, and marine operations. Enhancing cooperation to achieve the highest levels of efficiency.',
            descriptionAr: 'ضمان التنسيق الفعال بين جميع الأقسام، بما في ذلك الإدارة المالية، والتسويق، والعمليات البحرية. تعزيز التعاون بين الأقسام لتحقيق أعلى مستويات الكفاءة.',
            icon: ''
        },
        {
            title: 'Continuous Development',
            titleAr: 'التطوير المستمر',
            description: 'Motivating the team to innovate and provide the best services. Providing specialized training to ensure the team keeps pace with the latest technologies and operational methods.',
            descriptionAr: 'تحفيز الفريق على الابتكار وتقديم أفضل الخدمات. تقديم التدريب المتخصص لضمان مواكبة الفريق لأحدث التقنيات والأساليب التشغيلية.',
            icon: ''
        },
        {
            title: 'Client Communication',
            titleAr: 'التواصل مع العملاء',
            description: 'Understanding client aspirations and meeting their needs through personalized specialized services. Ensuring a luxurious and safe marine experience while maintaining the highest quality standards.',
            descriptionAr: 'فهم تطلعات العملاء وتلبية احتياجاتهم من خلال خدمات شخصية مخصصة. ضمان تجربة بحرية فاخرة وآمنة، مع الحفاظ على أعلى معايير الجودة.',
            icon: ''
        }
    ],
    // Detailed Description
    detailedDescription: `Professional Leadership Features:
Extensive Experience: Our management team possesses deep experience in the luxury marine tourism sector, with a comprehensive understanding of diverse client requirements.
Professionalism: We provide professional leadership that combines precise planning and effective execution, ensuring the highest levels of quality and safety.
Diverse Team: Our team includes experts from multiple fields, ensuring comprehensive coverage of all aspects of operational processes.
Customer Focus: We place our clients at the heart of our concerns, ensuring a luxurious and safe marine experience that meets their aspirations and exceeds their expectations.`,
    detailedDescriptionAr: `مميزات القيادة الاحترافية:
الخبرة الواسعة: فريقنا الإداري يتمتع بخبرة عميقة في قطاع السياحة البحرية الفاخرة، مع فهم شامل لمتطلبات العملاء المتنوعة.
الاحترافية: نقدم قيادة محترفة تجمع بين التخطيط الدقيق والتنفيذ الفعال، مع ضمان أعلى مستويات الجودة والسلامة.
الفريق المتنوع: فريقنا يضم خبراء من مجالات متعددة، مما يضمن تغطية شاملة لجميع جوانب العمليات التشغيلية.
التركيز على العملاء: نضع عملائنا في قلب اهتماماتنا، مع ضمان تجربة بحرية فاخرة وآمنة، تلبي تطلعاتهم وتتجاوز توقعاتهم.`,

    // Benefits (Tangible Results)
    benefits: [
        {
            title: 'Operational Efficiency',
            titleAr: 'كفاءة العمليات',
            description: 'Through continuous professional planning and integrated supervision, we ensure seamless and integrated operation, minimizing waste and raising productivity levels.',
            descriptionAr: 'من خلال التخطيط الاحترافي والإشراف المستمر، نضمن تشغيلاً سلساً ومتكاملاً، مع تقليل الهدر ورفع مستوى الإنتاجية.',
            icon: ''
        },
        {
            title: 'Customer Satisfaction',
            titleAr: 'رضا العملاء',
            description: 'Our administrative team ensures a luxurious and safe marine experience that meets the highest quality standards, enhancing customer loyalty and increasing their satisfaction.',
            descriptionAr: 'فريقنا الإداري يضمن تجربة بحرية فاخرة وآمنة، تحافظ على أعلى معايير الجودة، مما يعزز ولاء العملاء ويزيد من رضاهم.',
            icon: ''
        },
        {
            title: 'Sustainable Growth',
            titleAr: 'النمو المستدام',
            description: 'We provide customized solutions that meet our clients\' needs, ensuring business continuity and success in the long term.',
            descriptionAr: 'نقدم حلولاً مخصصة تلبي احتياجات عملائنا، مع ضمان استمرارية النجاح على المدى الطويل.',
            icon: ''
        }
    ]
};

async function seed() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        let service = await Service.findOne({ slug: serviceData.slug });

        if (!service) {
            const allServices = await Service.find({}, 'slug title');
            const potentialMatch = allServices.find(s => s.slug?.includes('administrative'));
            if (potentialMatch) {
                service = await Service.findOne({ _id: potentialMatch._id });
            } else {
                return;
            }
        }

        if (service) {
            console.log(`Updating Service: ${service.title} (${service.slug})`);

            service.advantages = serviceData.advantages;
            service.detailedDescription = serviceData.detailedDescription;
            service.detailedDescriptionAr = serviceData.detailedDescriptionAr;
            service.benefits = serviceData.benefits;

            if (service.benefits) {
                service.benefits.forEach(b => {
                    b.icon = '';
                });
            }

            await service.save();
            console.log('Service updated successfully!');
        }

    } catch (error) {
        console.error('Error seeding service:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected.');
    }
}

seed();
