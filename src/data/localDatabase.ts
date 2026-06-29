export const SERVICES = [
    {
        _id: 'service-yacht-management',
        title: 'Yacht & Boat Management',
        titleAr: 'إدارة اليخوت والقوارب إدارة شاملة (360 درجة)',
        description: 'Comprehensive 360° oversight across operational, technical, and financial pillars so every voyage is effortless.',
        descriptionAr: 'نحن نقدم حلاً متكاملاً لإدارة يختك أو قاربك، يغطي جميع الجوانب التشغيلية والفنية والمالية. من الإشراف على الطاقم والصيانة الدورية إلى إدارة الميزانية والامتثال للقوانين البحرية، نحن نتولى كل شيء. يمكنك أيضًا اختيار نهج وحدوي يسمى المنهجية المعيارية (Modular approach) يتيح لك اختيار الخدمات التي تحتاجها فقط.',
        detailedDescription: 'From administrative and financial affairs to maintenance and operations, we guarantee peace of mind, safety, and the highest levels of luxury.',
        detailedDescriptionAr: 'من الشؤون الإدارية والمالية إلى الصيانة والتشغيل، نضمن لكم راحة البال وأعلى مستويات الرفاهية والأمان.',
        price: 'Custom engagement',
        priceAr: 'باقة مخصصة',
        image: 'service-yacht-management',
        category: 'services',
        slug: 'service-yacht-management',
        gallery: [
            {
                fileId: 'gallery-yacht-ops-bridge',
                caption: 'Bridge support team monitoring telemetry',
                captionAr: 'فريق الجسر يتابع البيانات التقنية لحظة بلحظة',
                order: 0,
            },
            {
                fileId: 'gallery-yacht-ops-maint',
                caption: 'Maintenance review before guest arrival',
                captionAr: 'مراجعة الصيانة قبل وصول الضيوف',
                order: 1,
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
        advantages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'service-visiting-yacht',
        title: 'Visiting Yacht Agency',
        titleAr: 'خدمات الوكالة لليخوت الزائرة',
        description: 'Full arrival-to-departure agency covering entry permits, customs clearance, provisioning, and concierge requests.',
        descriptionAr: 'نرحب باليخوت الزائرة إلى سواحل المملكة العربية السعودية، ونتولى تسهيل جميع الإجراءات اللازمة لضمان وصول سلس ومغادرة مريحة. نحن نعتني بإنهاء أذونات الدخول، والتخليص الجمركي، وتوفير كافة الأوراق المطلوبة، مما يتيح لك التركيز على الاستمتاع بجمال البحر الأحمر.',
        detailedDescription: 'Full arrival-to-departure agency covering entry permits, customs clearance, provisioning, and concierge requests.',
        detailedDescriptionAr: 'نرحب باليخوت الزائرة إلى سواحل المملكة العربية السعودية، ونتولى تسهيل جميع الإجراءات اللازمة لضمان وصول سلس ومغادرة مريحة. نحن نعتني بإنهاء أذونات الدخول، والتخليص الجمركي، وتوفير كافة الأوراق المطلوبة، مما يتيح لك التركيز على الاستمتاع بجمال البحر الأحمر.',
        price: 'Retainer',
        priceAr: 'اشتراك سنوي',
        image: 'service-visiting-yacht',
        category: 'services',
        slug: 'service-visiting-yacht',
        gallery: [
            {
                fileId: 'gallery-agency-arrival',
                caption: 'Arrival concierge welcoming crew',
                captionAr: 'استقبال الطاقم من قبل مسؤول الوكالة',
                order: 0,
            },
            {
                fileId: 'gallery-agency-customs',
                caption: 'Customs documentation desk',
                captionAr: 'مكتب إنهاء معاملات الجمارك',
                order: 1,
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
        advantages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'service-marina-operations',
        title: 'Marina & Club Operations',
        titleAr: 'إدارة وتشغيل المراسي والنوادي البحرية',
        description: 'Luxury marina and club operations that blend smart technology, hospitality standards, and elite member services.',
        descriptionAr: 'نعمل على إدارة المراسي البحرية بأعلى المعايير العالمية، مما يوفر بيئة آمنة وفاخرة لرسو اليخوت والقوارب. كما ندير النوادي البحرية التي تقدم خدمات ترفيهية ووسائل راحة حصرية لأصحاب اليخوت والقوارب، وباستخدام التكنولوجيا الحديثة مما يجعلها وجهة مثالية للاسترخاء والتواصل.',
        detailedDescription: 'Luxury marina and club operations that blend smart technology, hospitality standards, and elite member services.',
        detailedDescriptionAr: 'نعمل على إدارة المراسي البحرية بأعلى المعايير العالمية، مما يوفر بيئة آمنة وفاخرة لرسو اليخوت والقوارب. كما ندير النوادي البحرية التي تقدم خدمات ترفيهية ووسائل راحة حصرية لأصحاب اليخوت والقوارب، وباستخدام التكنولوجيا الحديثة مما يجعلها وجهة مثالية للاسترخاء والتواصل.',
        price: 'Managed program',
        priceAr: 'برنامج مُدار',
        image: 'service-marina-operations',
        category: 'services',
        slug: 'service-marina-operations',
        gallery: [
            {
                fileId: 'gallery-marina-dashboard',
                caption: 'Smart berth allocation dashboard',
                captionAr: 'لوحة تحكم ذكية لتوزيع الأرصفة',
                order: 0,
            },
            {
                fileId: 'gallery-marina-lounge',
                caption: 'Club lounge programming',
                captionAr: 'برامج النادي والفعاليات الحصرية',
                order: 1,
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
        advantages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'service-crew-recruitment',
        title: 'Crew Recruitment Services',
        titleAr: 'خدمات توظيف الطاقم',
        description: 'Tailored recruitment pipelines delivering vetted captains, engineers, and hospitality crew who share your ethos.',
        descriptionAr: 'ندرك أن الطاقم المناسب هو أساس التجربة الاستثنائية. يختار فريق التوظيف لدينا المرشحين بعناية فائقة، لضمان توافقهم مع متطلباتك الفريدة، من حيث المهارة والشخصية. يمكنك أن تثق بأن كل فرد في الطاقم لدينا مؤهل، وذو خبرة، ومستعد لتقديم أرقى مستويات الخدمة.',
        detailedDescription: 'Tailored recruitment pipelines delivering vetted captains, engineers, and hospitality crew who share your ethos.',
        detailedDescriptionAr: 'ندرك أن الطاقم المناسب هو أساس التجربة الاستثنائية. يختار فريق التوظيف لدينا المرشحين بعناية فائقة، لضمان توافقهم مع متطلباتك الفريدة، من حيث المهارة والشخصية. يمكنك أن تثق بأن كل فرد في الطاقم لدينا مؤهل، وذو خبرة، ومستعد لتقديم أرقى مستويات الخدمة.',
        price: 'Placement fee',
        priceAr: 'رسوم توظيف',
        image: 'service-crew-recruitment',
        category: 'services',
        slug: 'service-crew-recruitment',
        gallery: [
            {
                fileId: 'gallery-crew-assessment',
                caption: 'Assessment center for hospitality crew',
                captionAr: 'مركز تقييم للطاقم الضيافي',
                order: 0,
            },
            {
                fileId: 'gallery-crew-simulator',
                caption: 'Simulator-based bridge training',
                captionAr: 'تدريب محاكاة لغرفة القيادة',
                order: 1,
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
        advantages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const BLOGS = [
    {
        _id: 'blog-1',
        title: 'The Ultimate Guide to Yacht Maintenance',
        titleAr: 'الدليل الشامل لصيانة اليخوت',
        excerpt: 'Discover essential maintenance tips to keep your yacht in pristine condition throughout the year.',
        excerptAr: 'اكتشف نصائح الصيانة الأساسية للحفاظ على يختك في حالة ممتازة على مدار السنة.',
        content: `
            <h2>Introduction to Yacht Maintenance</h2>
            <p>Maintaining a yacht requires consistent care and attention to detail. Whether you're a seasoned yacht owner or new to the world of luxury boating, understanding the fundamentals of yacht maintenance is crucial.</p>
            <h3>Regular Maintenance Schedule</h3>
            <p>Establishing a regular maintenance schedule is the foundation of yacht care. This includes weekly engine checks, monthly hull inspections, and quarterly system reviews.</p>
        `,
        contentAr: `
            <h2>مقدمة في صيانة اليخوت</h2>
            <p>تتطلب صيانة اليخت رعاية مستمرة واهتمامًا بالتفاصيل. سواء كنت مالك يخت متمرسًا أو جديدًا في عالم القوارب الفاخرة، فإن فهم أساسيات صيانة اليخوت أمر بالغ الأهمية.</p>
            <h3>جدول الصيانة المنتظمة</h3>
            <p>إنشاء جدول صيانة منتظم هو أساس رعاية اليخت. ويتضمن فحوصات المحرك الأسبوعية والهيكل الشهرية والسنوية الشاملة.</p>
        `,
        category: 'Maintenance',
        slug: 'ultimate-guide-yacht-maintenance',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونير مارينا',
        published: true,
        tags: ['maintenance', 'yacht care', 'tips'],
        featuredImage: 'ocean-sunrise',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'blog-2',
        title: 'Exploring the Red Sea: Best Yachting Destinations',
        titleAr: 'استكشاف البحر الأحمر: أفضل الوجهات لليخوت',
        excerpt: 'Discover the most beautiful and exclusive yachting destinations along the Red Sea coastline.',
        excerptAr: 'اكتشف أجمل وأكثر الوجهات حصرية لليخوت على طول ساحل البحر الأحمر.',
        content: `
            <h2>The Red Sea: A Yachting Paradise</h2>
            <p>The Red Sea offers some of the world's most spectacular yachting experiences. With crystal-clear waters, vibrant coral reefs, and stunning coastal landscapes, it's a destination that captivates every yacht enthusiast.</p>
        `,
        contentAr: `
            <h2>البحر الأحمر: جنة اليخوت</h2>
            <p>يقدم البحر الأحمر بعضًا من أكثر تجارب اليخوت إثارة في العالم. مع مياه صافية وحيود مرجانية نابضة بالحياة ومناظر ساحلية خلابة.</p>
        `,
        category: 'Destinations',
        slug: 'red-sea-yachting-destinations',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونير مارينا',
        published: true,
        tags: ['destinations', 'red sea', 'travel'],
        featuredImage: 'about-story',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        _id: 'blog-3',
        title: 'Crew Management: Building Your Dream Team',
        titleAr: 'إدارة الطاقم: بناء فريق أحلامك',
        excerpt: 'Learn how to select, train, and manage a professional yacht crew that delivers exceptional service.',
        excerptAr: 'تعلم كيفية اختيار وتدريب وإدارة طاقم يخت محترف يقدم خدمة استثنائية.',
        content: `
            <h2>The Importance of a Professional Crew</h2>
            <p>A well-trained, professional crew is the backbone of any successful yacht operation. They ensure safety, provide exceptional service, and create memorable experiences for you and your guests.</p>
        `,
        contentAr: `
            <h2>أهمية الطاقم المحترف</h2>
            <p>الطاقم المدرب جيدًا والمحترف هو العمود القبلي لأي عملية يخت ناجحة. يضمنون السلامة ويقدمون خدمة استثنائية.</p>
        `,
        category: 'Crew',
        slug: 'crew-management-building-dream-team',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونير مارينا',
        published: true,
        tags: ['crew', 'management', 'team'],
        featuredImage: 'service-crew-recruitment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export const HOME_SECTIONS = [
    {
        key: 'hero',
        label: 'Hero',
        order: 100,
        enabled: true,
        content: {
            en: {
                title: 'Lunier Marina',
                description: 'This is where comprehensive yacht management services come into play, ensuring that owners can enjoy their time at sea and leave the complexities of operations and logistics to the professionals.',
                imageId: 'ocean-sunrise',
                videoId: 'hero-lonier-video-static'
            },
            ar: {
                title: 'لونير مارينا',
                description: 'هنا يأتي دور خدمات إدارة اليخوت الشاملة، مما يضمن لأصحاب اليخوت الاستمتاع بوقتهم في البحر وترك تعقيدات العمليات واللوجستيات للمحترفين.',
                imageId: 'ocean-sunrise',
                videoId: 'hero-lonier-video-static'
            }
        }
    },
    {
        key: 'experience',
        label: 'Experience',
        order: 200,
        enabled: true,
        content: {
            en: {
                title: 'Extensive Experience and Exceptional Professionalism',
                description: 'We are a trusted company in the yacht management sector. Our team includes highly competent yacht managers experienced in complex operations. Our distinguished relationships with leading professionals in the sector, from brokers and marine engineers to insurance experts, ensure a seamless experience and optimal results at every stage of your yacht\'s lifecycle.',
                imageId: 'ocean-sunrise'
            },
            ar: {
                title: 'خبرة واسعة واحترافية استثنائية',
                description: 'نحن شركة موثوقة في قطاع إدارة اليخوت، يضم فريقنا مديري يخوت على أعلى مستوى من الكفاءة والخبرة في العمليات المعقدة. علاقاتنا المتميزة مع أبرز المحترفين في هذا القطاع، من وسطاء ومهندسين بحريين وخبراء تأمين، تضمن لك تجربة سلسة ونتائج مثالية في كل مرحلة من مراحل دورة حياة يختك.',
                imageId: 'ocean-sunrise'
            }
        }
    },
    {
        key: 'video',
        label: 'Video Section',
        order: 300,
        enabled: true,
        content: {
            en: {
                title: 'We have what you are looking for',
                description: 'In a world where the pace of life is constantly accelerating, luxury yachts remain a sanctuary of tranquility and distinction. Owning a yacht is no longer just a pleasure; it requires precise management of a complex asset. This is where Lunier Marina comes in, offering you an unparalleled experience that combines absolute luxury with professionalism, ensuring you enjoy every moment on your yacht while leaving all the details to us.',
                videoId: 'hero-lonier-video-static'
            },
            ar: {
                title: 'لدينا ضالتك',
                description: 'في عالم تتسارع فيه وتيرة الحياة، تظل اليخوت الفاخرة ملاذًا للهدوء والتميز. لم يعد امتلاك يخت مجرد متعة، بل أصبح يتطلب إدارة دقيقة لأصل معقد. هنا يأتي دور لونير مارينا، لنقدم لك تجربة لا مثيل لها، تجمع بين الفخامة المطلقة والاحترافية التي تضمن لك الاستمتاع بكل لحظة على متن يختك، تاركًا كل التفاصيل لنا.',
                videoId: 'hero-lonier-video-static'
            }
        }
    },
    {
        key: 'relationship',
        label: 'Relationship',
        order: 400,
        enabled: true,
        content: {
            en: {
                title: 'Built on Trust and Confidentiality',
                description: 'We serve royal offices, premium entities, and discerning families with absolute discretion, ensuring a seamless marine ownership cycle.',
                imageId: 'relationship-crew'
            },
            ar: {
                title: 'شراكة مبنية على الثقة والخصوصية المطلقة',
                description: 'نخدم المكاتب الملكية، والجهات المرموقة، والعائلات الكريمة بسرية تامة، مع ضمان تشغيل وإدارة متكاملة لأصولهم البحرية.',
                imageId: 'relationship-crew'
            }
        }
    },
    {
        key: 'services',
        label: 'Services',
        order: 500,
        enabled: true,
        content: {
            en: {
                title: 'Bespoke Marine Offerings',
                description: 'From comprehensive 360° vessel management to visiting yacht agency and marina design consulting.'
            },
            ar: {
                title: 'خدمات بحرية متكاملة ومخصصة',
                description: 'من الإدارة الشاملة لليخوت بزاوية 360 درجة، إلى خدمات الوكالة لليخوت الزائرة والاستشارات التشغيلية للمراسي.'
            }
        }
    },
    {
        key: 'commitment',
        label: 'Commitment',
        order: 600,
        enabled: true,
        content: {
            en: {
                title: 'Our Commitment',
                description: 'We provide our services specifically to meet the needs of boat and yacht owners, including individuals, companies, and government departments. Whether you own a luxury yacht or a tourist boat, we guarantee the highest levels of quality and excellence in all our services.'
            },
            ar: {
                title: 'إلتزامنا',
                description: 'نقدم خدماتنا خصيصاً لتلبية احتياجات أصحاب القوارب واليخوت من الأفراد والشركات والدوائر الحكومية. سواء كنت تمتلك يختاً فاخراً أو قارباً سياحياً، فإننا نضمن لك أعلى مستويات الجودة والتميز في جميع خدماتنا.'
            }
        }
    },
    {
        key: 'contact',
        label: 'Contact',
        order: 700,
        enabled: true,
        content: {
            en: {
                title: 'Begin Your Voyage with Us',
                description: 'Contact our fleet officers to design a custom management program tailored to your yacht.'
            },
            ar: {
                title: 'ابدأ رحلتك الاستثنائية معنا',
                description: 'تواصل مع ضباط الأسطول لدينا لتصميم برنامج إدارة مخصص يلبي تفضيلاتك تماماً.'
            }
        }
    },
    {
        key: 'faq',
        label: 'FAQ',
        order: 800,
        enabled: true,
        content: {
            en: {
                title: 'Frequently Asked Questions',
                description: 'Find quick answers regarding our yacht management retainers, crew vetting, and Red Sea cruising permits.'
            },
            ar: {
                title: 'الأسئلة الشائعة',
                description: 'إجابات سريعة حول عقود إدارة اليخوت لدينا، واختيار الطواقم، وتراخيص الإبحار في البحر الأحمر.'
            },
            faqs: [
                {
                    q: 'What is included in the Yacht Management program?',
                    a: 'It covers complete administrative support, professional financial reporting, predictive maintenance planning, and crew management.',
                    qAr: 'ماذا يشمل برنامج إدارة اليخوت؟',
                    aAr: 'يشمل الدعم الإداري الكامل، والتقارير المالية الاحترافية، وتخطيط الصيانة التنبؤية، وإدارة الطاقم.'
                },
                {
                    q: 'How do you vet the marine crew?',
                    a: 'All crew profiles go through rigorous background checks, STCW certification verification, and hospitality training assessments.',
                    qAr: 'كيف تختارون وتدربون طواقم اليخوت؟',
                    aAr: 'تخضع جميع ملفات الطواقم لفحوصات خلفية صارمة، والتحقق من شهادات STCW، وتقييمات تدريب الضيافة.'
                }
            ]
        }
    }
];

export const PAGE_SECTIONS: Record<string, Record<string, any>> = {
    about: {
        hero: {
            badge: "من نحن",
            title: "نصنع رحلات هادئة وجاهزة للإبحار",
            lead: "نحن فريق من المختصين في إدارة اليخوت وتشغيل المراسي والنوادي البحرية الفاخرة.",
        },
        story: {
            badge: "قصتنا",
            title: "إرث المراسي مع حرفية عصرية",
            paragraphs: [
                "نشأت لونير مارينا بمفاهيم عالمية لنقل بروتوكولات الخدمات البحرية الفاخرة إلى عالم البحار المفتوحة.",
                "يضم طاقمنا متعدد اللغات مهندسين بحريين وقباطنة سابقين ومنسقي ضيافة محترفين لضمان خدمات راقية لكل مالك."
            ]
        }
    }
};

export const IMAGE_MAP: Record<string, string> = {
    'ocean-sunrise': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
    'contact-hero': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80',
    'about-story': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    'relationship-crew': 'https://framerusercontent.com/images/d5nN82SDuni9QyTgN5wluN9zUY.png?width=603&height=603',
    'service-yacht-management': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    'service-visiting-yacht': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
    'service-marina-operations': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    'service-crew-recruitment': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1600&q=80',
    'gallery-yacht-ops-bridge': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'gallery-yacht-ops-maint': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    'gallery-agency-arrival': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'gallery-agency-customs': 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    'gallery-marina-dashboard': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    'gallery-marina-lounge': 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    'gallery-crew-assessment': 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
    'gallery-crew-simulator': 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    'lm-logo': '/LM Logo.svg',
    'services-banner': '/newbackgrounds/servicessectoin-main.webp',
};
