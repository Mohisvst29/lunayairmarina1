import mongoose from 'mongoose';
import connectDB from '../src/lib/db';
import Service from '../src/models/Service';

const INVESTMENT_CONTENT = {
    ar: {
        title: 'الاستثمار',
        description: 'فرص استثمارية واعدة في قطاع السياحة البحرية',
        detailedDescription: `يشهد قطاع السياحة البحرية في المملكة العربية السعودية نمواً ملحوظاً، مدفوعاً بالطلب المتزايد على التجارب الترفيهية الفاخرة. وفي هذا السياق، تبرز إدارة الاستثمار في تأجير القوارب واليخوت كفرصة واعدة للمستثمرين من الأفراد والشركات والدوائر الحكومية.

تشير التقديرات إلى أن حجم سوق تأجير القوارب واليخوت في المملكة العربية السعودية يبلغ حوالي 1.5 مليار ريال سعودي، مع توقعات بنمو سنوي مركب بنسبة 8% خلال السنوات الخمس القادمة.

وفقاً لتقرير صادر عن الهيئة العامة للترفيه، فإن قطاع السياحة البحرية يساهم بنسبة 2.5% في الناتج المحلي الإجمالي للمملكة، مع توقعات بارتفاع هذه النسبة إلى 4% بحلول عام 2030.

على المستوى الدولي، يبلغ حجم سوق تأجير القوارب واليخوت حوالي 20 مليار دولار أمريكي، مع توقعات بنمو سنوي مركب بنسبة 5%.`,
        benefits: [
            {
                title: 'حجم السوق المحلي',
                titleAr: 'حجم السوق المحلي',
                description: 'يشير إلى أن حجم سوق تأجير القوارب واليخوت في المملكة العربية السعودية يبلغ حوالي 1.5 مليار ريال سعودي، مع توقعات بنمو سنوي مركب بنسبة 8% خلال السنوات الخمس القادمة.',
                descriptionAr: 'يشير إلى أن حجم سوق تأجير القوارب واليخوت في المملكة العربية السعودية يبلغ حوالي 1.5 مليار ريال سعودي، مع توقعات بنمو سنوي مركب بنسبة 8% خلال السنوات الخمس القادمة.'
            },
            {
                title: 'المساهمة في الناتج المحلي',
                titleAr: 'المساهمة في الناتج المحلي',
                description: 'وفقاً لتقرير صادر عن الهيئة العامة للترفيه، فإن قطاع السياحة البحرية يساهم بنسبة 2.5% في الناتج المحلي الإجمالي للمملكة، مع توقعات بارتفاع هذه النسبة إلى 4% بحلول عام 2030.',
                descriptionAr: 'وفقاً لتقرير صادر عن الهيئة العامة للترفيه، فإن قطاع السياحة البحرية يساهم بنسبة 2.5% في الناتج المحلي الإجمالي للمملكة، مع توقعات بارتفاع هذه النسبة إلى 4% بحلول عام 2030.'
            },
            {
                title: 'حجم السوق الدولي',
                titleAr: 'حجم السوق الدولي',
                description: 'على المستوى الدولي، يبلغ حجم سوق تأجير القوارب واليخوت حوالي 20 مليار دولار أمريكي، مع توقعات بنمو سنوي مركب بنسبة 5%.',
                descriptionAr: 'على المستوى الدولي، يبلغ حجم سوق تأجير القوارب واليخوت حوالي 20 مليار دولار أمريكي، مع توقعات بنمو سنوي مركب بنسبة 5%.'
            }
        ],
        advantages: [
            {
                title: 'الطلب المتزايد',
                titleAr: 'الطلب المتزايد',
                description: 'هناك طلب متزايد على خدمات تأجير القوارب واليخوت من قبل الأفراد والعائلات والشركات التي تسعى إلى الاستمتاع بالتجارب البحرية الفاخرة.',
                descriptionAr: 'هناك طلب متزايد على خدمات تأجير القوارب واليخوت من قبل الأفراد والعائلات والشركات التي تسعى إلى الاستمتاع بالتجارب البحرية الفاخرة.'
            },
            {
                title: 'الدعم الحكومي',
                titleAr: 'الدعم الحكومي',
                description: 'تقدم حكومة المملكة العربية السعودية دعماً كبيراً لقطاع السياحة البحرية، من خلال مبادرات مثل "رؤية 2030" التي تهدف إلى تنويع الاقتصاد وتقليل الاعتماد على النفط.',
                descriptionAr: 'تقدم حكومة المملكة العربية السعودية دعماً كبيراً لقطاع السياحة البحرية، من خلال مبادرات مثل "رؤية 2030" التي تهدف إلى تنويع الاقتصاد وتقليل الاعتماد على النفط.'
            },
            {
                title: 'البنية التحتية',
                titleAr: 'البنية التحتية',
                description: 'تشهد المملكة تطوراً كبيراً في البنية التحتية للسياحة البحرية، بما في ذلك المراسي والموانئ والمرافق الترفيهية.',
                descriptionAr: 'تشهد المملكة تطوراً كبيراً في البنية التحتية للسياحة البحرية، بما في ذلك المراسي والموانئ والمرافق الترفيهية.'
            }
        ]
    },
    en: {
        title: 'Investment',
        description: 'Promising Investment Opportunities in Marine Tourism',
        detailedDescription: `The marine tourism sector in Saudi Arabia is witnessing remarkable growth, driven by the increasing demand for luxury recreational experiences. In this context, investment management in boat and yacht charter emerges as a promising opportunity for investors from individuals, companies, and government entities.

Estimates indicate that the boat and yacht rental market in Saudi Arabia is valued at approximately 1.5 billion Saudi Riyals, with expectations of a compound annual growth rate of 8% over the next five years.

According to a report by the General Entertainment Authority, the marine tourism sector contributes 2.5% to the Kingdom's GDP, with expectations of this percentage rising to 4% by 2030.

Internationally, the boat and yacht rental market is valued at approximately $20 billion USD, with expectations of a compound annual growth rate of 5%.`,
        benefits: [
            {
                title: 'Local Market Size',
                description: 'The boat and yacht rental market in Saudi Arabia is valued at approximately 1.5 billion Saudi Riyals, with expectations of a compound annual growth rate of 8% over the next five years.'
            },
            {
                title: 'GDP Contribution',
                description: 'According to the General Entertainment Authority, the marine tourism sector contributes 2.5% to the Kingdom\'s GDP, with expectations of rising to 4% by 2030.'
            },
            {
                title: 'International Market Size',
                description: 'Internationally, the boat and yacht rental market is valued at approximately $20 billion USD, with expectations of a compound annual growth rate of 5%.'
            }
        ],
        advantages: [
            {
                title: 'Growing Demand',
                description: 'There is increasing demand for boat and yacht charter services from individuals, families, and companies seeking to enjoy luxury marine experiences.'
            },
            {
                title: 'Government Support',
                description: 'The Saudi government provides significant support to the marine tourism sector through initiatives such as "Vision 2030" aimed at diversifying the economy and reducing oil dependence.'
            },
            {
                title: 'Infrastructure Development',
                description: 'The Kingdom is witnessing major development in marine tourism infrastructure, including marinas, ports, and recreational facilities.'
            }
        ]
    }
};

async function seedInvestmentService() {
    try {
        await connectDB();
        
        // Find the investment service by slug or title
        let service = await Service.findOne({ 
            $or: [
                { slug: 'investment' },
                { slug: 'الاستثمار' },
                { title: { $regex: /investment/i } },
                { titleAr: 'الاستثمار' }
            ]
        });

        if (!service) {
            console.log('Investment service not found. Creating new service...');
            service = new Service({
                title: INVESTMENT_CONTENT.en.title,
                titleAr: INVESTMENT_CONTENT.ar.title,
                description: INVESTMENT_CONTENT.en.description,
                descriptionAr: INVESTMENT_CONTENT.ar.description,
                detailedDescription: INVESTMENT_CONTENT.en.detailedDescription,
                detailedDescriptionAr: INVESTMENT_CONTENT.ar.detailedDescription,
                image: 'service-investment',
                slug: 'investment',
                category: 'main',
                benefits: INVESTMENT_CONTENT.en.benefits.map((b, i) => ({
                    title: b.title,
                    titleAr: INVESTMENT_CONTENT.ar.benefits[i].titleAr,
                    description: b.description,
                    descriptionAr: INVESTMENT_CONTENT.ar.benefits[i].descriptionAr
                })),
                advantages: INVESTMENT_CONTENT.en.advantages.map((a, i) => ({
                    title: a.title,
                    titleAr: INVESTMENT_CONTENT.ar.advantages[i].titleAr,
                    description: a.description,
                    descriptionAr: INVESTMENT_CONTENT.ar.advantages[i].descriptionAr
                }))
            });
        } else {
            console.log('Updating existing investment service...');
            service.detailedDescription = INVESTMENT_CONTENT.en.detailedDescription;
            service.detailedDescriptionAr = INVESTMENT_CONTENT.ar.detailedDescription;
            service.benefits = INVESTMENT_CONTENT.en.benefits.map((b, i) => ({
                title: b.title,
                titleAr: INVESTMENT_CONTENT.ar.benefits[i].titleAr,
                description: b.description,
                descriptionAr: INVESTMENT_CONTENT.ar.benefits[i].descriptionAr
            }));
            service.advantages = INVESTMENT_CONTENT.en.advantages.map((a, i) => ({
                title: a.title,
                titleAr: INVESTMENT_CONTENT.ar.advantages[i].titleAr,
                description: a.description,
                descriptionAr: INVESTMENT_CONTENT.ar.advantages[i].descriptionAr
            }));
        }

        await service.save();
        console.log('Investment service seeded successfully!');
        console.log('Service ID:', service._id);
        console.log('Service Slug:', service.slug);
        
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding investment service:', error);
        await mongoose.connection.close();
        process.exit(1);
    }
}

seedInvestmentService();
