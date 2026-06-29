import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

const maintenanceData = {
    slug: 'maintenance',
    // Advantages (Enriching Experience...) - Kept same
    advantages: [
        {
            title: '',
            titleAr: '',
            description: 'We do not just repair faults; we work to prevent them before they occur through continuous preventive maintenance. Contact us today to keep your vessel at its peak performance and enjoy a trouble-free marine experience. With Lunier Marina, rest assured your vessel is in safe hands.',
            descriptionAr: 'نحن لا نكتفي بإصلاح الأعطال، بل نعمل على منعها قبل حدوثها من خلال الصيانة الوقائية المستمرة. اتصل بنا اليوم للحفاظ على مركبك في ذروة أدائه، واستمتع بتجربة بحرية خالية من المتاعب. مع لونيير مارينا، اطمئن بأن مركبك في أيد أمينة.',
            icon: ''
        }
    ],
    // Detailed Description (Our Approach...) - Kept same
    detailedDescription: `Our Approach to Maintenance:
Preventive Maintenance: We focus on keeping your vessel in top condition through periodic inspections and preventive maintenance, reducing the need for major repairs.
Specialized Repairs: Whether mechanical, electrical, or electronic system repairs, we guarantee rapid intervention by qualified experts.
Genuine Parts: We use only certified spare parts and consumables to ensure compatibility and superior performance.
Advanced Techniques: We integrate the latest diagnostic tools and repair methods to ensure maintenance efficiency and effectiveness.

Maintenance Areas We Cover:
Mechanical Systems: Including engines, propulsion systems, and transmissions.
Electrical Systems: Such as lighting, power, and control systems.
Electronic Systems: Including navigation, communication, and entertainment systems.
Exterior Hull: Inspection and repair of any damage to the exterior hull or paint.
Sanitary Systems: Such as fresh water, saltwater, and drainage systems.`,

    detailedDescriptionAr: `نهجنا في الصيانة:
الصيانة الوقائية: نركز على الحفاظ على مركبك في أفضل حالاته من خلال فحوصات دورية وصيانة وقائية، مما يقلل من الحاجة إلى إصلاحات كبرى.
الإصلاحات المتخصصة: سواء كانت إصلاحات ميكانيكية، كهربائية، أو متعلقة بالأنظمة الإلكترونية، فإننا نضمن تدخلاً سريعاً من خبراء مؤهلين.
قطع الغيار الأصلية: نستخدم فقط قطع الغيار والمواد الاستهلاكية المعتمدة، لضمان توافقها وأدائها المتفوق.
التقنيات المتقدمة: ندمج أحدث الأدوات التشخيصية وأساليب الإصلاح لضمان كفاءة وفعالية الصيانة.

مجالات الصيانة التي نغطيها:
الأنظمة الميكانيكية: بما في ذلك المحركات، أنظمة الدفع، وناقلات الحركة.
الأنظمة الكهربائية: مثل أنظمة الإضاءة، الطاقة، والتحكم.
الأنظمة الإلكترونية: بما في ذلك أنظمة الملاحة، الاتصالات، والترفيه.
الهيكل الخارجي: فحص وإصلاح أي تلف في الهيكل الخارجي أو الطلاء.
الأنظمة الصحية: مثل أنظمة المياه العذبة والمالحة، والصرف الصحي.`,

    // Updated Benefits (Why Client Choose Us) - New Content
    benefits: [
        {
            title: 'Speed and Effectiveness',
            titleAr: 'السرعة والفعالية',
            description: 'Our team is trained for rapid response, minimizing your vessel\'s downtime.',
            descriptionAr: 'فريقنا مدرب على الاستجابة السريعة، مما يقلل من وقت توقف مركبك.',
            icon: ''
        },
        {
            title: 'Quality and Safety',
            titleAr: 'الجودة والسلامة',
            description: 'All our services adhere to global quality standards, prioritizing the safety of the vessel and crew.',
            descriptionAr: 'جميع خدماتنا تلتزم بمعايير الجودة العالمية، مع إعطاء الأولوية لسلامة المركب وطاقم العمل.',
            icon: ''
        },
        {
            title: 'Customization',
            titleAr: 'التخصيص',
            description: 'We offer customized maintenance programs to suit every client\'s needs, whether regular maintenance or major repairs.',
            descriptionAr: 'نقدم برامج صيانة مخصصة تناسب احتياجات كل عميل، سواء كانت صيانة منتظمة أو إصلاحات كبرى.',
            icon: ''
        },
        {
            title: 'Transparency',
            titleAr: 'الشفافية',
            description: 'We provide periodic reports and full transparency regarding your vessel\'s condition and technical recommendations.',
            descriptionAr: 'نقدم تقارير دورية وشفافية كاملة حول حالة مركبك والتوصيات الفنية.',
            icon: ''
        }
    ]
};

async function seed() {
    console.log('Connecting to DB...');
    await connectDB();
    console.log('Connected.');

    try {
        const service = await Service.findOne({ slug: maintenanceData.slug });

        if (!service) {
            console.error('Service not found!');
            return;
        }

        console.log(`Service found: ${service.title}`);

        // Update Advantages
        service.advantages = maintenanceData.advantages;

        // Update Detailed Description
        service.detailedDescription = maintenanceData.detailedDescription;
        service.detailedDescriptionAr = maintenanceData.detailedDescriptionAr;

        // Update Benefits
        service.benefits = maintenanceData.benefits;

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
