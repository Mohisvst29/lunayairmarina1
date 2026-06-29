import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Service from '@/models/Service';

type ImageSeed = {
    slug: string;
    filename: string;
    url: string;
    category: string;
};

type ServiceSeed = {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    detailedDescription?: string;
    detailedDescriptionAr?: string;
    image: ImageSeed;
    features?: string[];
    featuresAr?: string[];
    category: string; // 'yacht-boat-management' or 'marina-club-management'
    slug?: string;
};

// Main parent services
const mainServices: ServiceSeed[] = [
    {
        title: 'Yacht and Boat Management',
        titleAr: 'إدارة اليخوت والقوارب',
        description: 'At Lumiere, we provide world-class yacht and boat management services defined by exceptional standards. We handle every intricate detail to ensure a burden-free ownership experience.',
        descriptionAr: 'نقدم في لونيير خدمات إدارة اليخوت والقوارب بمفاهيم عالمية ومعايير استثنائية، حيث نتولى كافة التفاصيل الدقيقة لضمان تجربة ملكية خالية من الأعباء.',
        detailedDescription: 'From administrative and financial affairs to maintenance and operations, we guarantee peace of mind, safety, and the highest levels of luxury.',
        detailedDescriptionAr: 'من الشؤون الإدارية والمالية إلى الصيانة والتشغيل، نضمن لكم راحة البال وأعلى مستويات الرفاهية والأمان.',
        image: {
            slug: 'service-yacht-boat-management',
            filename: 'yacht-boat-management.jpg',
            url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'yacht-boat-management',
        features: [
            'Administrative Affairs',
            'Financial Affairs',
            'Maintenance',
            'Booking and Trip Planning',
            'Crew Preparation',
            'Care and Cleaning',
            'Investment',
        ],
        featuresAr: [
            'الشؤون الإدارية',
            'الشؤون المالية',
            'الصيانة',
            'خدمات الحجز وتخطيط الرحلات',
            'خدمات تجهيز الطاقم',
            'خدمات العناية والنظافة',
            'الاستثمار',
        ],
    },
    {
        title: 'Yacht and Marina Management',
        titleAr: 'إدارة وتشغيل نوادي اليخوت والمراسي',
        description: 'We offer integrated solutions for the management and operation of yacht clubs and marinas, combining operational efficiency with service excellence.',
        descriptionAr: 'نقدم حلولاً متكاملة لإدارة وتشغيل نوادي اليخوت والمراسي، نجمع فيها بين الكفاءة التشغيلية والتميز في الخدمة.',
        detailedDescription: 'We aim to enhance asset value and deliver an exceptional experience for members and visitors through professional management covering all technical, financial, and security aspects.',
        detailedDescriptionAr: 'نهدف إلى تعزيز قيمة الأصول وتقديم تجربة استثنائية للأعضاء والزوار من خلال إدارة احترافية تغطي كافة الجوانب الفنية، المالية، والأمنية.',
        image: {
            slug: 'service-marina-club-management',
            filename: 'marina-club-management.jpg',
            url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-club-management',
        features: [
            'Contract Management',
            'Maintenance',
            'Financial Management',
            'Administrative Affairs',
            'Construction and Expansion',
            'Security and Monitoring',
        ],
        featuresAr: [
            'إدارة العقود',
            'الصيانة',
            'الإدارة المالية',
            'الشؤون الإدارية',
            'مشاريع الإنشاء والتوسعة',
            'الأمن والمراقبة والتوجيه',
        ],
    },
];

// Sub-services for Yacht and Boat Management
const yachtBoatSubServices: ServiceSeed[] = [
    {
        title: 'Administrative Affairs',
        titleAr: 'الشؤون الإدارية',
        description: 'We handle all administrative aspects to ensure full legal and regulatory compliance.',
        descriptionAr: 'نتولى إدارة كافة الجوانب الإدارية لضمان الامتثال القانوني والتنظيمي الكامل.',
        detailedDescription: 'We handle all administrative aspects to ensure full legal and regulatory compliance, allowing you to enjoy your yacht without worry.',
        detailedDescriptionAr: 'نتولى إدارة كافة الجوانب الإدارية لضمان الامتثال القانوني والتنظيمي الكامل، مما يتيح لك الاستمتاع بيختك دون قلق.',
        image: {
            slug: 'service-administrative-affairs',
            filename: 'administrative-affairs.jpg',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'administrative-affairs',
        features: [
            'Documentation Management',
            'Crew Documentation',
            'License Management',
            'Insurance Documentation',
        ],
        featuresAr: [
            'إدارة الوثائق',
            'وثائق الطاقم',
            'إدارة الرخص',
            'وثائق التأمين',
        ],
    },
    {
        title: 'Financial Affairs',
        titleAr: 'الشؤون المالية',
        description: 'Precise and transparent financial management covering all operational costs and expenses.',
        descriptionAr: 'إدارة مالية دقيقة وشفافة تغطي كافة التكاليف والمصاريف التشغيلية.',
        detailedDescription: 'Precise and transparent financial management covering all operational costs and expenses to ensure efficiency and clarity.',
        detailedDescriptionAr: 'إدارة مالية دقيقة وشفافة تغطي كافة التكاليف والمصاريف التشغيلية لضمان الكفاءة والوضوح.',
        image: {
            slug: 'service-financial-affairs',
            filename: 'financial-affairs.jpg',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'financial-affairs',
        features: [
            'Annual Contracts',
            'Crew Entitlements',
            'Provisioning Invoices',
            'Maintenance Invoices',
            'Management Contracts',
            'Entertainment Invoices',
            'Refit Projects',
            'Financial Reports',
        ],
        featuresAr: [
            'العقود السنوية',
            'مستحقات الطاقم',
            'فواتير التموين',
            'فواتير الصيانة',
            'عقود الإدارة',
            'فواتير الترفيه',
            'مشاريع التجديد',
            'التقارير المالية',
        ],
    },
    {
        title: 'Maintenance',
        titleAr: 'الصيانة',
        description: 'We keep your yacht in pristine condition through comprehensive maintenance programs.',
        descriptionAr: 'نحافظ على يختك في أفضل حالاته من خلال برامج صيانة شاملة.',
        detailedDescription: 'We keep your yacht in pristine technical and aesthetic condition through comprehensive and professional maintenance programs.',
        detailedDescriptionAr: 'نحافظ على يختك في أفضل حالاته الفنية والجمالية من خلال برامج صيانة شاملة ومحترفة.',
        image: {
            slug: 'service-maintenance',
            filename: 'maintenance.jpg',
            url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'maintenance',
        features: [
            'Periodic Maintenance',
            'Emergency Maintenance',
            'Security & Safety',
            'Inspection Services',
            'Market Valuation',
        ],
        featuresAr: [
            'الصيانة الدورية',
            'الصيانة الطارئة',
            'الأمن والسلامة',
            'خدمات الفحص',
            'تقييم القيمة السوقية',
        ],
    },
    {
        title: 'Booking and Trip Planning',
        titleAr: 'خدمات الحجز وتخطيط الرحلات',
        description: 'We plan your sea voyages to be unforgettable experiences.',
        descriptionAr: 'نخطط لرحلاتك البحرية لتكون تجربة لا تُنسى.',
        detailedDescription: 'We plan your sea voyages with meticulous detail to be unforgettable experiences of luxury and relaxation.',
        detailedDescriptionAr: 'نخطط لرحلاتك البحرية بأدق التفاصيل لتكون تجربة لا تُنسى من الرفاهية والاستجمام.',
        image: {
            slug: 'service-booking-trip-planning',
            filename: 'booking-trip-planning.jpg',
            url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'booking-trip-planning',
        features: [
            'Yacht & Boat Booking',
            'Trip Planning',
            'Marina Booking',
            'Entertainment Booking',
        ],
        featuresAr: [
            'حجز اليخوت والقوارب',
            'تخطيط الرحلات',
            'حجز المراسي',
            'حجز وسائل الترفيه',
        ],
    },
    {
        title: 'Crew Preparation Services',
        titleAr: 'خدمات تجهيز الطاقم',
        description: 'We select and train top talent to ensure refined service onboard.',
        descriptionAr: 'نختار وندرب أفضل الكفاءات لضمان خدمة راقية على متن اليخت.',
        detailedDescription: 'Recruiting, training, and qualifying a professional crew that meets all your needs and expectations.',
        detailedDescriptionAr: 'توظيف، تدريب، وتأهيل طاقم محترف يلبي كافة احتياجاتك وتوقعاتك.',
        image: {
            slug: 'service-crew-preparation',
            filename: 'crew-preparation.jpg',
            url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'crew-preparation',
        features: [
            'Recruitment',
            'Training',
            'Qualification',
            'Service Excellence',
        ],
        featuresAr: [
            'التوظيف',
            'التدريب',
            'التأهيل',
            'تميز الخدمة',
        ],
    },
    {
        title: 'Care and Cleaning Services',
        titleAr: 'خدمات العناية والنظافة',
        description: 'Deep cleaning services and meticulous care for the yacht\'s interior and exterior.',
        descriptionAr: 'خدمات تنظيف عميق وعناية فائقة بالتفاصيل الداخلية والخارجية لليخت.',
        detailedDescription: 'Using the best materials and techniques to maintain its luster and luxury.',
        detailedDescriptionAr: 'باستخدام أفضل المواد والتقنيات للحفاظ على رونقه وفخامته.',
        image: {
            slug: 'service-care-cleaning',
            filename: 'care-cleaning.jpg',
            url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'care-cleaning',
        features: [
            'Deep Cleaning',
            'Interior Care',
            'Exterior Care',
            'Premium Materials',
        ],
        featuresAr: [
            'التنظيف العميق',
            'العناية الداخلية',
            'العناية الخارجية',
            'مواد فاخرة',
        ],
    },
    {
        title: 'Investment',
        titleAr: 'الاستثمار',
        description: 'We maximize the return on your yacht investment through smart management.',
        descriptionAr: 'نعظم العائد على استثمارك في اليخوت من خلال إدارة ذكية وفعالة.',
        detailedDescription: 'Smart strategies for managing and operating yachts and boats as investment assets.',
        detailedDescriptionAr: 'استراتيجيات ذكية لإدارة وتشغيل اليخوت والقوارب كأصول استثمارية.',
        image: {
            slug: 'service-investment',
            filename: 'investment.jpg',
            url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'yacht-boat-management',
        slug: 'investment',
        features: [
            'Investment Management',
            'Marketing',
            'Sales',
            'Chartering',
        ],
        featuresAr: [
            'إدارة الاستثمارات',
            'التسويق',
            'المبيعات',
            'التأجير',
        ],
    },
];

// Sub-services for Marina and Club Management
const marinaClubSubServices: ServiceSeed[] = [
    {
        title: 'Contract Management',
        titleAr: 'إدارة العقود',
        description: 'Professional management of all contracts related to boats and yachts.',
        descriptionAr: 'إدارة احترافية لكافة العقود المتعلقة بالقوارب واليخوت.',
        detailedDescription: 'Ensuring the rights of all parties and organizing operations for boats, yachts, and other marine vessels.',
        detailedDescriptionAr: 'ضمان حقوق كافة الأطراف وتنظيم العمليات للقوارب، اليخوت، والوسائط البحرية الأخرى.',
        image: {
            slug: 'service-marina-contracts',
            filename: 'marina-contracts.jpg',
            url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-contracts',
        features: [
            'Contract Administration',
            'Legal Compliance',
            'Rights Protection',
            'Operations Organization',
        ],
        featuresAr: [
            'إدارة العقود',
            'الامتثال القانوني',
            'حماية الحقوق',
            'تنظيم العمليات',
        ],
    },
    {
        title: 'Maintenance',
        titleAr: 'الصيانة',
        description: 'Periodic and comprehensive maintenance of buildings and facilities.',
        descriptionAr: 'صيانة دورية وشاملة للمباني والمرافق.',
        detailedDescription: 'Maintenance of buildings, wet berths, and public facilities to ensure operational continuity and infrastructure safety.',
        detailedDescriptionAr: 'صيانة المباني، الأرصفة المائية، والمرافق العامة لضمان استمرارية العمل وسلامة البنية التحتية.',
        image: {
            slug: 'service-marina-maintenance',
            filename: 'marina-maintenance.jpg',
            url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-maintenance',
        features: [
            'Building Maintenance',
            'Berth Maintenance',
            'Facility Maintenance',
            'Infrastructure Safety',
        ],
        featuresAr: [
            'صيانة المباني',
            'صيانة الأرصفة',
            'صيانة المرافق',
            'سلامة البنية التحتية',
        ],
    },
    {
        title: 'Financial Management',
        titleAr: 'الإدارة المالية',
        description: 'Precise management of revenues and expenses.',
        descriptionAr: 'إدارة دقيقة للإيرادات والمصروفات.',
        detailedDescription: 'Highly efficient preparation of operating budgets to ensure the financial sustainability of the club or marina.',
        detailedDescriptionAr: 'إعداد ميزانيات التشغيل بكفاءة عالية لضمان الاستدامة المالية للنادي أو المرسى.',
        image: {
            slug: 'service-marina-financial',
            filename: 'marina-financial.jpg',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-financial',
        features: [
            'Revenue Management',
            'Expense Tracking',
            'Budget Preparation',
            'Financial Sustainability',
        ],
        featuresAr: [
            'إدارة الإيرادات',
            'تتبع المصروفات',
            'إعداد الميزانية',
            'الاستدامة المالية',
        ],
    },
    {
        title: 'Administrative Affairs',
        titleAr: 'الشؤون الإدارية',
        description: 'Organizing all administrative aspects including documentation and permits.',
        descriptionAr: 'تنظيم كافة الجوانب الإدارية بما في ذلك الوثائق والتصاريح.',
        detailedDescription: 'Organizing documentation, contracts, permits, and implementing the highest standards of security and safety.',
        detailedDescriptionAr: 'تنظيم الوثائق، العقود، التصاريح، وتطبيق أعلى معايير الأمن والسلامة.',
        image: {
            slug: 'service-marina-administrative',
            filename: 'marina-administrative.jpg',
            url: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-administrative',
        features: [
            'Documentation',
            'Permits',
            'Safety Standards',
            'Security Implementation',
        ],
        featuresAr: [
            'الوثائق',
            'التصاريح',
            'معايير السلامة',
            'تطبيق الأمن',
        ],
    },
    {
        title: 'Construction and Expansion Projects',
        titleAr: 'مشاريع الإنشاء والتوسعة',
        description: 'Supervising development, construction, and expansion projects.',
        descriptionAr: 'الإشراف على مشاريع التطوير والإنشاء والتوسعة.',
        detailedDescription: 'Supervising projects to increase capacity and improve provided services.',
        detailedDescriptionAr: 'الإشراف على المشاريع لزيادة الطاقة الاستيعابية وتحسين الخدمات المقدمة.',
        image: {
            slug: 'service-marina-construction',
            filename: 'marina-construction.jpg',
            url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-construction',
        features: [
            'Project Supervision',
            'Capacity Expansion',
            'Service Improvement',
            'Development',
        ],
        featuresAr: [
            'الإشراف على المشاريع',
            'توسيع الطاقة الاستيعابية',
            'تحسين الخدمات',
            'التطوير',
        ],
    },
    {
        title: 'Security, Surveillance & Guidance',
        titleAr: 'الأمن والمراقبة والتوجيه',
        description: 'Advanced security systems and 24/7 surveillance.',
        descriptionAr: 'أنظمة أمنية متطورة ومراقبة على مدار الساعة.',
        detailedDescription: 'Guidance services to ensure a safe and organized environment for all visitors.',
        detailedDescriptionAr: 'خدمات توجيه وإرشاد لضمان بيئة آمنة ومنظمة لجميع المرتادين.',
        image: {
            slug: 'service-marina-security',
            filename: 'marina-security.jpg',
            url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
            category: 'services',
        },
        category: 'marina-club-management',
        slug: 'marina-security',
        features: [
            'Advanced Security',
            '24/7 Surveillance',
            'Visitor Guidance',
            'Safe Environment',
        ],
        featuresAr: [
            'أمن متطور',
            'مراقبة 24/7',
            'توجيه الزوار',
            'بيئة آمنة',
        ],
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
        throw new Error('Database connection is not initialized.');
    }
    const filesCollection = db.collection('images.files');

    // Check if image already exists
    const existing = await filesCollection.findOne({
        'metadata.slug': image.slug,
    });

    if (existing) {
        return existing._id.toString();
    }

    // Download the image
    console.log(`📥 Downloading ${image.slug}...`);
    const response = await fetch(image.url);
    if (!response.ok) {
        throw new Error(`Failed to download ${image.url}: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to GridFS
    const uploadStream = bucket.openUploadStream(image.filename, {
        metadata: {
            category: image.category,
            slug: image.slug,
            contentType: response.headers.get('content-type') || 'image/jpeg',
            sourceUrl: image.url,
            seeded: true,
        },
    });

    uploadStream.end(buffer);

    await new Promise<void>((resolve, reject) => {
        uploadStream.on('finish', () => {
            console.log(`✅ Uploaded image: ${image.slug} (ID: ${uploadStream.id})`);
            resolve();
        });
        uploadStream.on('error', reject);
    });

    return uploadStream.id.toString();
}

async function seedServices() {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not initialized.');
    }
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'images' });

    // Seed main services first
    console.log('🌱 Seeding main services...');
    for (const seed of mainServices) {
        const imageId = await ensureImage({ bucket, image: seed.image });

        await Service.findOneAndUpdate(
            { slug: seed.slug },
            {
                title: seed.title,
                titleAr: seed.titleAr,
                description: seed.description,
                descriptionAr: seed.descriptionAr,
                detailedDescription: seed.detailedDescription,
                detailedDescriptionAr: seed.detailedDescriptionAr,
                image: imageId,
                features: seed.features ?? [],
                featuresAr: seed.featuresAr ?? [],
                category: seed.category,
                slug: seed.slug,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        console.log(`✅ Seeded main service: ${seed.title}`);
    }

    // Seed sub-services for Yacht and Boat Management
    console.log('🌱 Seeding Yacht and Boat Management sub-services...');
    for (const seed of yachtBoatSubServices) {
        const imageId = await ensureImage({ bucket, image: seed.image });

        await Service.findOneAndUpdate(
            { slug: seed.slug },
            {
                title: seed.title,
                titleAr: seed.titleAr,
                description: seed.description,
                descriptionAr: seed.descriptionAr,
                detailedDescription: seed.detailedDescription,
                detailedDescriptionAr: seed.detailedDescriptionAr,
                image: imageId,
                features: seed.features ?? [],
                featuresAr: seed.featuresAr ?? [],
                category: seed.category,
                slug: seed.slug,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        console.log(`✅ Seeded sub-service: ${seed.title}`);
    }

    // Seed sub-services for Marina and Club Management
    console.log('🌱 Seeding Marina and Club Management sub-services...');
    for (const seed of marinaClubSubServices) {
        const imageId = await ensureImage({ bucket, image: seed.image });

        await Service.findOneAndUpdate(
            { slug: seed.slug },
            {
                title: seed.title,
                titleAr: seed.titleAr,
                description: seed.description,
                descriptionAr: seed.descriptionAr,
                detailedDescription: seed.detailedDescription,
                detailedDescriptionAr: seed.detailedDescriptionAr,
                image: imageId,
                features: seed.features ?? [],
                featuresAr: seed.featuresAr ?? [],
                category: seed.category,
                slug: seed.slug,
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        );

        console.log(`✅ Seeded sub-service: ${seed.title}`);
    }

    console.log('✅ All services seeded successfully!');
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































