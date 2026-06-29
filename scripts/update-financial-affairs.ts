import Service from '../src/models/Service';
import connectDB from '../src/lib/db';
import mongoose from 'mongoose';

const serviceData = {
    slug: 'financial-affairs',
    // Advantages from previous step (Enriching Experience...)
    advantages: [
        {
            title: 'Professional Financial Management',
            titleAr: 'الإدارة المالية الاحترافية',
            description: 'We provide distinguished financial management aimed at increasing profit margins while maintaining an ideal balance in operational costs.',
            descriptionAr: 'نقدم إدارة مالية متميزة تهدف إلى رفع نسب الأرباح مع الحفاظ على توازن مثالي في التكاليف التشغيلية.',
            icon: ''
        },
        {
            title: '',
            titleAr: '',
            description: 'We rely on accurate financial analysis to identify areas for improvement and implement effective cost-reduction strategies without compromising service quality.',
            descriptionAr: 'نعتمد على تحليلات مالية دقيقة لتحديد مجالات التحسين، وتطبيق استراتيجيات فعالة لخفض التكاليف دون المساس بجودة الخدمات.',
            icon: ''
        },
        {
            title: '',
            titleAr: '',
            description: 'We ensure effective resource allocation, continuous monitoring of expenses and revenues to achieve the highest return on investment.',
            descriptionAr: 'نضمن توزيعًا فعالًا للموارد، مع مراقبة مستمرة للنفقات والإيرادات لتحقيق أعلى عائد استثماري.',
            icon: ''
        },
        {
            title: '',
            titleAr: '',
            description: 'We work on developing long-term financial plans that support sustainable growth and contribute to achieving strategic goals.',
            descriptionAr: 'نعمل على تطوير خطط مالية طويلة المدى تدعم النمو المستدام وتساهم في تحقيق الأهداف الاستراتيجية.',
            icon: ''
        }
    ],
    // Detailed Description from previous step
    detailedDescription: 'At Lunier Marina, we provide integrated financial and administrative solutions to ensure operational efficiency and cost-effectiveness, while preserving marine assets and enhancing their sustainability. We recognize that professional financial management is the backbone of success in the luxury marine tourism sector, which is why we rely on a team of financial and administrative experts to provide advanced services that meet the needs of our yacht and boat owner clients.',
    detailedDescriptionAr: 'في لونيير مارينا، نقدم حلولًا مالية وإدارية متكاملة لضمان كفاءة العمليات التشغيلية وفعالية التكاليف، مع الحفاظ على الأصول البحرية وتعزيز استدامتها. نحن ندرك أن الإدارة المالية الاحترافية هي عصب النجاح في قطاع السياحة البحرية الفاخرة، ولذلك نعتمد على فريق من الخبراء الماليين والإداريين لتقديم خدمات متطورة تلبي احتياجات عملائنا من ملاك اليخوت والقوارب.',

    // New Benefits (Why Clients Choose Us - Advanced Financial Management Process)
    benefits: [
        {
            title: 'Operational Cost Analysis',
            titleAr: 'تحليل التكاليف التشغيلية',
            description: 'We start by conducting a thorough review of all operational costs associated with yacht and boat operation and maintenance, including service bills, fuel costs, and marine crew expenses. We use advanced financial analysis tools to identify spending areas that can be optimized or reduced without affecting service quality.',
            descriptionAr: 'نبدأ بإجراء مراجعة دقيقة لجميع التكاليف التشغيلية المرتبطة بتشغيل وصيانة اليخوت والقوارب، بما في ذلك فواتير الخدمات، وتكاليف الوقود، ونفقات الطاقم البحري. نستخدم أدوات تحليل مالي متقدمة لتحديد مجالات الإنفاق التي يمكن تحسينها أو تخفيضها دون التأثير على جودة الخدمة.',
            icon: ''
        },
        {
            title: 'Prioritizing',
            titleAr: 'تحديد الأولويات',
            description: 'We identify areas that need immediate cost-reduction measures, while ensuring that service quality or customer comfort is not compromised. This may include negotiating with suppliers for preferential rates or re-evaluating maintenance contracts to secure better terms.',
            descriptionAr: 'نحدد المجالات التي تحتاج إلى إجراءات فورية لتخفيض التكاليف، مع ضمان عدم المساس بجودة الخدمة أو مستوى الراحة المقدمة للعملاء. قد يشمل ذلك التفاوض مع الموردين للحصول على أسعار تفضيلية، أو إعادة تقييم عقود الصيانة لضمان شروطٍ أفضل.',
            icon: ''
        },
        {
            title: 'Implementing Cost Reduction Strategies',
            titleAr: 'تطبيق استراتيجيات خفض التكاليف',
            description: 'Strategic Purchasing: We purchase consumables and spare parts at competitive prices, while ensuring quality and sustainability. Preventive Maintenance: We rely on comprehensive preventive maintenance programs to minimize sudden breakdowns, thereby reducing emergency repair costs. Continuous Training: We ensure the work team is highly trained, reducing human error and lowering operational costs.',
            descriptionAr: 'الشراء الاستراتيجي: نشتري المواد الاستهلاكية وقطع الغيار بأسعار تنافسية، مع ضمان الجودة والاستدامة. الصيانة الوقائية: نعتمد على برامج صيانة وقائية شاملة لتقليل الأعطال المفاجئة، مما يقلل من تكاليف الإصلاح الطارئة. التدريب المستمر: نضمن أن فريق العمل مدرب تدريباً عالياً، مما يقلل من الأخطاء البشرية ويخفض التكاليف التشغيلية.',
            icon: ''
        },
        {
            title: 'Investing in Modern Technologies',
            titleAr: 'الاستثمار في التقنيات الحديثة',
            description: 'We use the latest digital systems for operations management, reducing waste and increasing human team efficiency. We rely on automation in many routine processes, reducing the need for additional manpower.',
            descriptionAr: 'نستخدم أحدث الأنظمة الرقمية لإدارة العمليات، مما يقلل من الهدر ويزيد من كفاءة الفريق البشري. نعتمد على الأتمتة في العديد من العمليات الروتينية، مما يقلل من الحاجة إلى يد عاملة إضافية.',
            icon: ''
        },
        {
            title: 'Transparent Financial Reporting',
            titleAr: 'التقارير المالية الشفافة',
            description: 'We provide detailed periodic reports on financial performance, with a comprehensive analysis of revenues and expenses. We ensure our clients have a full understanding of the financial situation, with dedicated recommendations to improve financial performance.',
            descriptionAr: 'نقدم تقارير دورية مفصلة حول الأداء المالي، مع تحليل شامل للإيرادات والنفقات. نضمن لعملائنا فهمًا كاملًا للوضع المالي، مع توصيات مخصصة لتحسين الأداء المالي.',
            icon: ''
        },
        {
            title: 'Professional Team Development',
            titleAr: 'التطوير المهني للفريق',
            description: 'We offer advanced training programs to ensure the work team possesses the latest skills in the marine industry, including cutting-edge repair techniques and maintenance methods. We encourage our team to innovate and present new ideas, focusing on developing customized solutions for clients.',
            descriptionAr: 'نقدم برامج تدريبية متقدمة لضمان أن فريق العمل يمتلك أحدث المهارات في الصناعة البحرية، بما في ذلك أحدث التقنيات وأساليب الإصلاح والصيانة. نشجع فريقنا على الابتكار وتقديم أفكار جديدة، مع التركيز على تطوير حلول مخصصة للعملاء.',
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
            const potentialMatch = allServices.find(s => s.slug?.includes('financial'));
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
