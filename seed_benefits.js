const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.warn('Warning: MONGODB_URI not set. relying on passed env var.');
}

// Inline Schema Definition to avoid TS/Import issues
const ServiceSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        benefits: [{
            title: String,
            titleAr: String,
            description: String,
            descriptionAr: String,
            icon: String
        }]
    },
    { strict: false }
);

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const BENEFITS_MAP = [
    {
        title: "Security, Surveillance & Guidance",
        matchDesc: "Advanced security systems",
        benefits: [
            {
                title: "24/7 Monitoring",
                titleAr: "مراقبة على مدار الساعة",
                description: "Continuous surveillance systems ensuring total safety for all assets.",
                descriptionAr: "أنظمة مراقبة مستمرة تضمن الأمان التام لجميع الأصول.",
                icon: "shield-check"
            },
            {
                title: "Access Control",
                titleAr: "التحكم في الوصول",
                description: "Strict regulating of entry and exit points for maximum security.",
                descriptionAr: "تنظيم صارم لنقاط الدخول والخروج لتحقيق أقصى درجات الأمان.",
                icon: "lock"
            },
            {
                title: "Emergency Response",
                titleAr: "الاستجابة للطوارئ",
                description: "Rapid response teams ready to handle any security incidents immediately.",
                descriptionAr: "فرق استجابة سريعة جاهزة للتعامل مع أي حوادث أمنية فوراً.",
                icon: "siren"
            }
        ]
    },
    {
        title: "Construction and Expansion Projects",
        matchDesc: "Supervising development",
        benefits: [
            {
                title: "Capacity Increase",
                titleAr: "زيادة الطاقة الاستيعابية",
                description: "Expanding facilities to accommodate more vessels and visitors.",
                descriptionAr: "توسيع المرافق لاستيعاب المزيد من السفن والزوار.",
                icon: "expand"
            },
            {
                title: "Modern Infrastructure",
                titleAr: "بنية تحتية حديثة",
                description: "Implementing state-of-the-art construction standards.",
                descriptionAr: "تنفيذ معايير بناء حديثة ومتطورة.",
                icon: "building"
            },
            {
                title: "Sustainable Design",
                titleAr: "تصميم مستدام",
                description: "Eco-friendly construction practices that respect the marine environment.",
                descriptionAr: "ممارسات بناء صديقة للبيئة تحترم البيئة البحرية.",
                icon: "leaf"
            }
        ]
    },
    {
        title: "Administrative Affairs",
        matchDesc: "Organizing all administrative aspects",
        benefits: [
            {
                title: "Efficient Processing",
                titleAr: "معالجة فعالة",
                description: "Streamlined handling of paperwork and documentation.",
                descriptionAr: "معالجة مبسطة وسريعة للأوراق والمستندات.",
                icon: "document-check"
            },
            {
                title: "Compliance Guarantee",
                titleAr: "ضمان الامتثال",
                description: "Ensuring all procedures meet local and international regulations.",
                descriptionAr: "ضمان أن جميع الإجراءات تتوافق مع اللوائح المحلية والدولية.",
                icon: "badge-check"
            },
            {
                title: "Permit Management",
                titleAr: "إدارة التصاريح",
                description: "Fast-tracking of necessary permits and licenses.",
                descriptionAr: "تسريع إصدار التصاريح والتراخيص اللازمة.",
                icon: "clipboard-list"
            }
        ]
    },
    {
        title: "Administrative Affairs",
        matchDesc: "We handle all administrative aspects",
        benefits: [
            {
                title: "Regulatory Alignment",
                titleAr: "التوافق التنظيمي",
                description: "Keeping operations strictly within legal frameworks.",
                descriptionAr: "إبقاء العمليات في إطار قانوني صارم.",
                icon: "balance-scale"
            },
            {
                title: "Operational Support",
                titleAr: "دعم تشغيلي",
                description: "Reducing administrative burden on yacht owners.",
                descriptionAr: "تقليل العبء الإداري على ملاك اليخوت.",
                icon: "handshake"
            },
            {
                title: "Accuracy & Speed",
                titleAr: "الدقة والسرعة",
                description: "Precision in handling sensitive legal documents.",
                descriptionAr: "دقة في التعامل مع المستندات القانونية الحساسة.",
                icon: "clock-fast"
            }
        ]
    },
    {
        title: "Financial Management",
        matchDesc: "Precise management",
        benefits: [
            {
                title: "Cost Optimization",
                titleAr: "تحسين التكلفة",
                description: "Identifying areas to reduce unnecessary operational expenses.",
                descriptionAr: "تحديد المجالات لتقليل النفقات التشغيلية غير الضرورية.",
                icon: "chart-pie"
            },
            {
                title: "Revenue Tracking",
                titleAr: "تتبع الإيرادات",
                description: "Detailed monitoring of all income streams.",
                descriptionAr: "مراقبة دقيقة لجميع مصادر الدخل.",
                icon: "trend-up"
            },
            {
                title: "transparent Reporting",
                titleAr: "تقارير شفافة",
                description: "Clear and regular financial statements.",
                descriptionAr: "بيانات مالية واضحة ومنتظمة.",
                icon: "file-invoice"
            }
        ]
    },
    {
        title: "Maintenance",
        matchDesc: "Periodic and comprehensive maintenance",
        // Buildings/Marina maintenance
        benefits: [
            {
                title: "Facility Longevity",
                titleAr: "طول عمر المرفق",
                description: "Extending the life of buildings through regular care.",
                descriptionAr: "إطالة عمر المباني من خلال الرعاية المنتظمة.",
                icon: "tools"
            },
            {
                title: "Preventive Care",
                titleAr: "الرعاية الوقائية",
                description: "Identifying issues before they become costly repairs.",
                descriptionAr: "تحديد المشكلات قبل أن تتحول إلى إصلاحات مكلفة.",
                icon: "stethoscope"
            },
            {
                title: "Safety Standards",
                titleAr: "معايير السلامة",
                description: "Ensuring all structures meet safety codes.",
                descriptionAr: "ضمان أن جميع الهياكل تلبي رموز الخطر والسلامة.",
                icon: "helmet-safety"
            }
        ]
    },
    {
        title: "Maintenance",
        matchDesc: "We keep your yacht in pristine condition",
        // Yacht maintenance
        benefits: [
            {
                title: "Pristine Condition",
                titleAr: "حالة ممتازة",
                description: "Keeping the yacht aesthetically perfect at all times.",
                descriptionAr: "الحفاظ على اليخت في صورة مثالية طوال الوقت.",
                icon: "sparkles"
            },
            {
                title: "Technical Reliability",
                titleAr: "الموثوقية الفنية",
                description: "Ensuring engines and systems run smoothly without failure.",
                descriptionAr: "ضمان عمل المحركات والأنظمة بسلاسة دون أعطال.",
                icon: "cog"
            },
            {
                title: "Value Retention",
                titleAr: "الحفاظ على القيمة",
                description: "Maintenance that helps preserve the resale value of the vessel.",
                descriptionAr: "صيانة تساعد في الحفاظ على قيمة إعادة البيع للسفينة.",
                icon: "bank"
            }
        ]
    },
    {
        title: "Contract Management",
        matchDesc: "Professional management",
        benefits: [
            {
                title: "Legal Protection",
                titleAr: "الحماية القانونية",
                description: "Drafting contracts that protect your interests.",
                descriptionAr: "صياغة عقود تحمي مصالحك.",
                icon: "shield"
            },
            {
                title: "Clarity & Terms",
                titleAr: "الوضوح والشروط",
                description: "Ensuring all terms are defined and understood.",
                descriptionAr: "ضمان تحديد وفهم جميع الشروط.",
                icon: "file-signature"
            },
            {
                title: "Risk Mitigation",
                titleAr: "تدخفيف المخاطر",
                description: "Identifying and avoiding potential contractual risks.",
                descriptionAr: "تحديد وتجنب المخاطر التعاقدية المحتملة.",
                icon: "alert-triangle"
            }
        ]
    },
    {
        title: "Investment",
        matchDesc: "maximize the return",
        benefits: [
            {
                title: "Maximum ROI",
                titleAr: "أقصى عائد",
                description: "Strategies focused on yielding the best returns.",
                descriptionAr: "استراتيجيات تركز على تحقيق أفضل العوائد.",
                icon: "chart-line"
            },
            {
                title: "Market Insights",
                titleAr: "رؤى السوق",
                description: "Using data to make informed investment decisions.",
                descriptionAr: "استخدام البيانات لاتخاذ قرارات استثمارية مستنيرة.",
                icon: "lightbulb"
            },
            {
                title: "Asset Management",
                titleAr: "إدارة الأصول",
                description: "Professional handling of the yacht as a financial asset.",
                descriptionAr: "التعامل الاحترافي مع اليخت كأصل مالي.",
                icon: "briefcase"
            }
        ]
    },
    {
        title: "Care and Cleaning Services",
        matchDesc: "Deep cleaning services",
        benefits: [
            {
                title: "Deep Cleaning",
                titleAr: "تنظيف عميق",
                description: "Thorough sanitization and cleaning of all areas.",
                descriptionAr: "تعقيم وتنظيف شامل لجميع المناطق.",
                icon: "broom"
            },
            {
                title: "Premium Products",
                titleAr: "منتجات فاخرة",
                description: "Using high-end materials safe for yacht finishes.",
                descriptionAr: "استخدام مواد فاخرة آمنة على تشطيبات اليخت.",
                icon: "spray-can"
            },
            {
                title: "Detail Oriented",
                titleAr: "الاهتمام بالتفاصيل",
                description: "Focusing on every corner for a flawless look.",
                descriptionAr: "التركيز على كل زاوية لمظهر خالٍ من العيوب.",
                icon: "eye"
            }
        ]
    },
    {
        title: "Crew Preparation Services",
        matchDesc: "We select and train",
        benefits: [
            {
                title: "Top Talent",
                titleAr: "أفضل الكفاءات",
                description: "Rigorous selection process to find the best crew.",
                descriptionAr: "عملية اختيار صارمة للعثور على أفضل طاقم.",
                icon: "users"
            },
            {
                title: "Specialized Training",
                titleAr: "تدريب متخصص",
                description: "Courses on hospitality, safety, and seamanship.",
                descriptionAr: "دورات في الضيافة والسلامة والملاحة.",
                icon: "graduation-cap"
            },
            {
                title: "Onboard Harmony",
                titleAr: "الانسجام على المتن",
                description: "Building a cohesive team that works well together.",
                descriptionAr: "بناء فريق متماسك يعمل جيداً معاً.",
                icon: "heart"
            }
        ]
    },
    {
        title: "Booking and Trip Planning",
        matchDesc: "We plan your sea voyages",
        benefits: [
            {
                title: "Custom Itineraries",
                titleAr: "مسارات مخصصة",
                description: "Tailored routes to match your preferences.",
                descriptionAr: "مسارات مصممة خصيصاً لتناسب تفضيلاتك.",
                icon: "map"
            },
            {
                title: "Exclusive access",
                titleAr: "وصول حصري",
                description: "Booking spots in prime marinas and destinations.",
                descriptionAr: "حجز أماكن في أرقى المراسي والوجهات.",
                icon: "star"
            },
            {
                title: "Seamless Logistics",
                titleAr: "لوجستيات سلسة",
                description: "Handling fuel, provisions, and entry paperwork.",
                descriptionAr: "التعامل مع الوقود والمؤن وأوراق الدخول.",
                icon: "truck-loading"
            }
        ]
    },
    {
        title: "Financial Affairs",
        matchDesc: "Precise and transparent financial",
        benefits: [
            {
                title: "Budget Control",
                titleAr: "مراقبة الميزانية",
                description: "Strict adherence to planned operational budgets.",
                descriptionAr: "الالتزام الصارم بالميزانيات التشغيلية المخططة.",
                icon: "wallet"
            },
            {
                title: "Expense Auditing",
                titleAr: "تدقيق المصروفات",
                description: "Regular checks to prevent wastage or overspending.",
                descriptionAr: "فحوصات دورية لمنع الهدر أو الإفراط في الإنفاق.",
                icon: "search"
            },
            {
                title: "Financial Clarity",
                titleAr: "الوضوح المالي",
                description: "Easy-to-understand reports for owners.",
                descriptionAr: "تقارير سهلة الفهم للملاك.",
                icon: "glasses"
            }
        ]
    },
    {
        title: "Yacht and Marina Management",
        matchDesc: "We offer integrated solutions",
        benefits: [
            {
                title: "Operational Efficiency",
                titleAr: "الكفاءة التشغيلية",
                description: "Streamlining daily operations for smooth running.",
                descriptionAr: "تبسيط العمليات اليومية لضمان سير العمل بسلاسة.",
                icon: "cogs"
            },
            {
                title: "Guest Excellence",
                titleAr: "تميز الضيوف",
                description: "Ensuring visitor experiences are top-tier.",
                descriptionAr: "ضمان أن تكون تجارب الزوار من الطراز الأول.",
                icon: "diamond"
            },
            {
                title: "Strategic Growth",
                titleAr: "النمو الاستراتيجي",
                description: "Planning for long-term expansion and success.",
                descriptionAr: "التخطيط للتوسع والنجاح على المدى الطويل.",
                icon: "chart-bar"
            }
        ]
    }
];

async function seedBenefits() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        for (const item of BENEFITS_MAP) {
            console.log(`Processing: ${item.title}`);
            const regexDesc = new RegExp(item.matchDesc, 'i');

            // Find service matching title AND partial description
            const service = await Service.findOne({
                title: item.title,
                description: { $regex: regexDesc }
            });

            if (!service) {
                console.log(`  > Service not found for title "${item.title}" containing "${item.matchDesc}"`);
                continue;
            }

            if (service.benefits && service.benefits.length > 0) {
                console.log(`  > Service already has ${service.benefits.length} benefits. Skipping.`);
                continue;
            }

            // Update
            service.benefits = item.benefits;
            await service.save();
            console.log(`  > Successfully seeded ${item.benefits.length} benefits.`);
        }

    } catch (error) {
        console.error('Error seeding benefits:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seedBenefits();
