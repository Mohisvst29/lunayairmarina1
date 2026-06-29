import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

type ImageSeed = {
    slug: string;
    filename: string;
    url: string;
    category: string;
};

type BenefitSeed = {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
};

type GallerySeed = {
    caption: string;
    captionAr: string;
    image: ImageSeed;
};

type ServiceSeed = {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    price?: string;
    priceAr?: string;
    image: ImageSeed;
    gallery?: GallerySeed[];
    features?: string[];
    featuresAr?: string[];
    benefits?: BenefitSeed[];
};

const serviceSeeds: ServiceSeed[] = [
    {
        title: 'Yacht & Boat Management',
        titleAr: 'إدارة اليخوت والقوارب إدارة شاملة (360 درجة)',
        description:
            'Comprehensive 360° oversight across operational, technical, and financial pillars so every voyage is effortless.',
        descriptionAr:
            'نحن نقدم حلاً متكاملاً لإدارة يختك أو قاربك، يغطي جميع الجوانب التشغيلية والفنية والمالية. من الإشراف على الطاقم والصيانة الدورية إلى إدارة الميزانية والامتثال للقوانين البحرية، نحن نتولى كل شيء. يمكنك أيضًا اختيار نهج وحدوي يسمى المنهجية المعيارية (Modular approach) يتيح لك اختيار الخدمات التي تحتاجها فقط.',
        price: 'Custom engagement',
        priceAr: 'باقة مخصصة',
        image: {
            slug: 'service-yacht-management',
            filename: 'yacht-management.jpg',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        gallery: [
            {
                caption: 'Bridge support team monitoring telemetry',
                captionAr: 'فريق الجسر يتابع البيانات التقنية لحظة بلحظة',
                image: {
                    slug: 'gallery-yacht-ops-bridge',
                    filename: 'gallery-yacht-ops-bridge.jpg',
                    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
            {
                caption: 'Maintenance review before guest arrival',
                captionAr: 'مراجعة الصيانة قبل وصول الضيوف',
                image: {
                    slug: 'gallery-yacht-ops-maint',
                    filename: 'gallery-yacht-ops-maint.jpg',
                    url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
        ],
        features: [
            '24/7 fleet command and voyage logging',
            'Integrated maintenance & classification planning',
            'Transparent budget controls with monthly dashboards',
        ],
        featuresAr: [
            'مركز قيادة يعمل على مدار الساعة وتسجيل كامل للرحلات',
            'تخطيط متكامل للصيانة ومتطلبات التصنيف البحري',
            'مراقبة مالية شفافة مع لوحات شهرية مفصلة',
        ],
        benefits: [
            {
                title: 'Dedicated vessel director',
                titleAr: 'مدير يخت مخصص',
                description: 'Single point of accountability coordinating crew, contractors, and ownership updates.',
                descriptionAr: 'نقطة اتصال واحدة تدير الطاقم والموردين وتقدم تحديثات دقيقة للمالك.',
            },
            {
                title: 'Predictive upkeep',
                titleAr: 'صيانة تنبؤية',
                description: 'Digital maintenance matrix that aligns class surveys, dry-docking, and guest calendars.',
                descriptionAr: 'مصفوفة صيانة رقمية توائم بين فحوصات التصنيف وحجوزات الضيوف والجفاف.',
            },
            {
                title: 'Compliance guardrails',
                titleAr: 'حوكمة وامتثال',
                description: 'ISM / ISPS documentation audits and insurance renewals handled ahead of deadlines.',
                descriptionAr: 'مراجعات دورية لوثائق ISM وISPS وتجديدات التأمين قبل المواعيد النهائية.',
            },
        ],
    },
    {
        title: 'Visiting Yacht Agency',
        titleAr: 'خدمات الوكالة لليخوت الزائرة',
        description:
            'Full arrival-to-departure agency covering entry permits, customs clearance, provisioning, and concierge requests.',
        descriptionAr:
            'نرحب باليخوت الزائرة إلى سواحل المملكة العربية السعودية، ونتولى تسهيل جميع الإجراءات اللازمة لضمان وصول سلس ومغادرة مريحة. نحن نعتني بإنهاء أذونات الدخول، والتخليص الجمركي، وتوفير كافة الأوراق المطلوبة، مما يتيح لك التركيز على الاستمتاع بجمال البحر الأحمر.',
        price: 'Retainer',
        priceAr: 'اشتراك سنوي',
        image: {
            slug: 'service-visiting-yacht',
            filename: 'visiting-yacht.jpg',
            url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        gallery: [
            {
                caption: 'Arrival concierge welcoming crew',
                captionAr: 'استقبال الطاقم من قبل مسؤول الوكالة',
                image: {
                    slug: 'gallery-agency-arrival',
                    filename: 'gallery-agency-arrival.jpg',
                    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
            {
                caption: 'Customs documentation desk',
                captionAr: 'مكتب إنهاء معاملات الجمارك',
                image: {
                    slug: 'gallery-agency-customs',
                    filename: 'gallery-agency-customs.jpg',
                    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
        ],
        features: [
            'Rapid entry permits and harbor master coordination',
            'Concierge provisioning and guest logistics',
            'Real-time customs clearance tracking',
        ],
        featuresAr: [
            'تصاريح دخول سريعة والتنسيق مع سلطات الموانئ',
            'خدمات ضيافة وتموين شاملة للضيوف والطاقم',
            'متابعة فورية لإجراءات الجمارك والتخليص',
        ],
        benefits: [
            {
                title: 'One-touch arrivals',
                titleAr: 'إجراءات وصول مبسطة',
                description: 'We orchestrate pilots, fuel, and berthing so captains focus on navigation only.',
                descriptionAr: 'ننسق الإرشاد والتزود بالوقود والرسو ليبقى القبطان مركزاً على الملاحة فقط.',
            },
            {
                title: 'Guest hospitality mesh',
                titleAr: 'ضيافة متكاملة',
                description: 'VIP transport, provisioning, and villa bookings available through a single channel.',
                descriptionAr: 'نقل كبار الشخصيات والتموين وحجوزات الفلل عبر قناة واحدة متصلة.',
            },
            {
                title: 'Regulatory confidence',
                titleAr: 'موثوقية تنظيمية',
                description: 'Accredited agents stay onsite until departure formalities are complete.',
                descriptionAr: 'مندوبونا المعتمدون متواجدون حتى انتهاء جميع الإجراءات الرسمية للمغادرة.',
            },
        ],
    },
    {
        title: 'Marina & Club Operations',
        titleAr: 'إدارة وتشغيل المراسي والنوادي البحرية',
        description:
            'Luxury marina and club operations that blend smart technology, hospitality standards, and elite member services.',
        descriptionAr:
            'نعمل على إدارة المراسي البحرية بأعلى المعايير العالمية، مما يوفر بيئة آمنة وفاخرة لرسو اليخوت والقوارب. كما ندير النوادي البحرية التي تقدم خدمات ترفيهية ووسائل راحة حصرية لأصحاب اليخوت والقوارب، وباستخدام التكنولوجيا الحديثة مما يجعلها وجهة مثالية للاسترخاء والتواصل.',
        price: 'Managed program',
        priceAr: 'برنامج مُدار',
        image: {
            slug: 'service-marina-operations',
            filename: 'marina-operations.jpg',
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        gallery: [
            {
                caption: 'Smart berth allocation dashboard',
                captionAr: 'لوحة تحكم ذكية لتوزيع الأرصفة',
                image: {
                    slug: 'gallery-marina-dashboard',
                    filename: 'gallery-marina-dashboard.jpg',
                    url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
            {
                caption: 'Club lounge programming',
                captionAr: 'برامج النادي والفعاليات الحصرية',
                image: {
                    slug: 'gallery-marina-lounge',
                    filename: 'gallery-marina-lounge.jpg',
                    url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
        ],
        features: [
            'Digital berth reservations with live utility metering',
            'Hospitality-trained dock and concierge teams',
            'Club programming and revenue optimization support',
        ],
        featuresAr: [
            'حجوزات أرصفة رقمية مع مراقبة فورية للاستهلاك',
            'فرق أرصفة وخدمة عملاء مدربة على الضيافة الراقية',
            'برامج نادي وفعاليات تزيد من العائد التشغيلي',
        ],
        benefits: [
            {
                title: 'Operational peace of mind',
                titleAr: 'تشغيل سلس',
                description: 'We enforce SOPs, safety drills, and asset inspections every week.',
                descriptionAr: 'نطبق إجراءات التشغيل القياسية والتدريبات والسلامة أسبوعياً.',
            },
            {
                title: 'Member retention',
                titleAr: 'ولاء الأعضاء',
                description: 'Curated events, feedback loops, and CX analytics keep clubs vibrant.',
                descriptionAr: 'فعاليات مختارة وتحليلات تجربة عميل تضمن تفاعل الأعضاء باستمرار.',
            },
            {
                title: 'Revenue clarity',
                titleAr: 'وضوح الإيرادات',
                description: 'Dynamic pricing models and transparent reporting for stakeholders.',
                descriptionAr: 'نماذج تسعير ديناميكية وتقارير واضحة للشركاء والمالكين.',
            },
        ],
    },
    {
        title: 'Crew Recruitment Services',
        titleAr: 'خدمات توظيف الطاقم',
        description:
            'Tailored recruitment pipelines delivering vetted captains, engineers, and hospitality crew who share your ethos.',
        descriptionAr:
            'ندرك أن الطاقم المناسب هو أساس التجربة الاستثنائية. يختار فريق التوظيف لدينا المرشحين بعناية فائقة، لضمان توافقهم مع متطلباتك الفريدة، من حيث المهارة والشخصية. يمكنك أن تثق بأن كل فرد في الطاقم لدينا مؤهل، وذو خبرة، ومستعد لتقديم أرقى مستويات الخدمة.',
        price: 'Placement fee',
        priceAr: 'رسوم توظيف',
        image: {
            slug: 'service-crew-recruitment',
            filename: 'crew-recruitment.jpg',
            url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        gallery: [
            {
                caption: 'Assessment center for hospitality crew',
                captionAr: 'مركز تقييم للطاقم الضيافي',
                image: {
                    slug: 'gallery-crew-assessment',
                    filename: 'gallery-crew-assessment.jpg',
                    url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
            {
                caption: 'Simulator-based bridge training',
                captionAr: 'تدريب محاكاة لغرفة القيادة',
                image: {
                    slug: 'gallery-crew-simulator',
                    filename: 'gallery-crew-simulator.jpg',
                    url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
                    category: 'services',
                },
            },
        ],
        features: [
            'Global talent network with background verification',
            'Behavioral and hospitality-focused assessments',
            'Rotation planning and continuing education credits',
        ],
        featuresAr: [
            'شبكة مواهب عالمية مع تحقق شامل من الخلفيات',
            'اختبارات سلوكية وتركيز على مهارات الضيافة',
            'خطط تدوير للطاقم واعتمادات تدريب مستمر',
        ],
        benefits: [
            {
                title: 'Curated shortlists',
                titleAr: 'قوائم مختصرة دقيقة',
                description: 'Receive three vetted profiles per role with personality insights.',
                descriptionAr: 'نوفر ثلاثة ملفات متطابقة لكل وظيفة مع تحليلات للشخصية.',
            },
            {
                title: 'Faster onboarding',
                titleAr: 'انضمام أسرع',
                description: 'Visa, medical, and flag registrations handled in parallel.',
                descriptionAr: 'إجراءات التأشيرات والفحوصات والتسجيل تتم بالتوازي لتقليل الوقت.',
            },
            {
                title: 'Performance follow-up',
                titleAr: 'متابعة الأداء',
                description: '90-day check-ins and guest satisfaction scoring keep standards high.',
                descriptionAr: 'متابعة خلال ٩٠ يوماً مع قياس رضا الضيوف لضمان ثبات المستوى.',
            },
        ],
    },
];

const generalImageSeeds: ImageSeed[] = [
    {
        slug: 'ocean-sunrise',
        filename: 'ocean-sunrise.jpg',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
        category: 'hero',
    },
    {
        slug: 'contact-hero',
        filename: 'contact-hero.jpg',
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
        category: 'contact',
    },
    {
        slug: 'about-story',
        filename: 'about-story.jpg',
        url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
        category: 'about',
    },
    {
        slug: 'relationship-crew',
        filename: 'relationship-crew.png',
        url: 'https://framerusercontent.com/images/d5nN82SDuni9QyTgN5wluN9zUY.png?width=603&height=603',
        category: 'about',
    },
    {
        slug: 'portrait-vip-1',
        filename: 'portrait-vip-1.jpg',
        url: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-2',
        filename: 'portrait-vip-2.jpg',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-3',
        filename: 'portrait-vip-3.jpg',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-4',
        filename: 'portrait-vip-4.jpg',
        url: 'https://images.unsplash.com/photo-1549351512-c5e12b11e283?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-5',
        filename: 'portrait-vip-5.jpg',
        url: 'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-6',
        filename: 'portrait-vip-6.jpg',
        url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-7',
        filename: 'portrait-vip-7.jpg',
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-8',
        filename: 'portrait-vip-8.jpg',
        url: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-9',
        filename: 'portrait-vip-9.jpg',
        url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-10',
        filename: 'portrait-vip-10.jpg',
        url: 'https://images.unsplash.com/photo-1546456073-6712f79251bb?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-11',
        filename: 'portrait-vip-11.jpg',
        url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-12',
        filename: 'portrait-vip-12.jpg',
        url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
    {
        slug: 'portrait-vip-13',
        filename: 'portrait-vip-13.jpg',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
        category: 'portraits',
    },
];

async function ensureImage({
    bucket,
    image,
}: {
    bucket: mongoose.mongo.GridFSBucket;
    image: ImageSeed;
}): Promise<string> {
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error("Database connection is not initialized.");
    }
    const filesCollection = db.collection('images.files');
    const existing = await filesCollection
        .find<{ _id: mongoose.Types.ObjectId }>({
            'metadata.slug': image.slug,
        })
        .sort({ uploadDate: -1 })
        .limit(1)
        .toArray();

    if (existing.length > 0) {
        return existing[0]._id.toString();
    }

    const response = await fetch(image.url);
    if (!response.ok) {
        throw new Error(`Failed to download ${image.url}: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Map category to section for proper organization
    const sectionMap: Record<string, string | undefined> = {
        'about': 'about-page',
        'contact': 'contact-page',
        'hero': 'hero-home',
        'portraits': 'testimonials',
    };

    const section = sectionMap[image.category];

    return await new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(image.filename, {
            metadata: {
                category: image.category,
                section: section,
                sourceUrl: image.url,
                slug: image.slug,
                seeded: true,
                contentType: response.headers.get('content-type') ?? 'application/octet-stream',
            },
        });

        uploadStream.end(buffer);
        uploadStream.on('finish', () => resolve(uploadStream.id.toString()));
        uploadStream.on('error', reject);
    });
}

async function seedServices() {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not initialized.');
    }
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });

    for (const seed of serviceSeeds) {
        const imageId = await ensureImage({ bucket, image: seed.image });

        const galleryDocs =
            seed.gallery && seed.gallery.length > 0
                ? await Promise.all(
                      seed.gallery.slice(0, 4).map(async (item, index) => {
                          const galleryImageId = await ensureImage({ bucket, image: item.image });
                          return {
                              fileId: galleryImageId,
                              caption: item.caption,
                              captionAr: item.captionAr,
                              order: index,
                          };
                      })
                  )
                : [];

        await Service.findOneAndUpdate(
            { title: seed.title },
            {
                title: seed.title,
                titleAr: seed.titleAr,
                description: seed.description,
                descriptionAr: seed.descriptionAr,
                image: imageId,
                price: seed.price,
                priceAr: seed.priceAr,
                gallery: galleryDocs,
                features: seed.features ?? [],
                featuresAr: seed.featuresAr ?? [],
                benefits: seed.benefits ?? [],
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        console.log(`Seeded service: ${seed.title}`);
    }

    for (const image of generalImageSeeds) {
        await ensureImage({ bucket, image });
        console.log(`Ensured media asset: ${image.slug}`);
    }
}

seedServices()
    .then(() => {
        console.log('Seeding complete.');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seeding failed:', error);
        process.exit(1);
    });

