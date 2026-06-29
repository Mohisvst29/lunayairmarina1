import connectDB from '../src/lib/db';
import Blog from '../src/models/Blog';

const sampleBlogs = [
    {
        title: 'The Ultimate Guide to Yacht Maintenance',
        titleAr: 'الدليل الشامل لصيانة اليخوت',
        excerpt: 'Discover essential maintenance tips to keep your yacht in pristine condition throughout the year.',
        excerptAr: 'اكتشف نصائح الصيانة الأساسية للحفاظ على يختك في حالة ممتازة على مدار السنة.',
        content: `
            <h2>Introduction to Yacht Maintenance</h2>
            <p>Maintaining a yacht requires consistent care and attention to detail. Whether you're a seasoned yacht owner or new to the world of luxury boating, understanding the fundamentals of yacht maintenance is crucial.</p>
            
            <h3>Regular Maintenance Schedule</h3>
            <p>Establishing a regular maintenance schedule is the foundation of yacht care. This includes:</p>
            <ul>
                <li>Weekly engine checks</li>
                <li>Monthly hull inspections</li>
                <li>Quarterly system reviews</li>
                <li>Annual comprehensive surveys</li>
            </ul>
            
            <h3>Essential Maintenance Tasks</h3>
            <p>Key areas that require regular attention include the engine, hull, electrical systems, and interior spaces. Each component plays a vital role in ensuring your yacht's performance and longevity.</p>
            
            <h3>Professional Services</h3>
            <p>While some maintenance tasks can be handled by the owner, many require professional expertise. Partnering with a trusted yacht management company ensures that all systems are properly maintained and any issues are addressed promptly.</p>
        `,
        contentAr: `
            <h2>مقدمة في صيانة اليخوت</h2>
            <p>تتطلب صيانة اليخت رعاية مستمرة واهتمامًا بالتفاصيل. سواء كنت مالك يخت متمرسًا أو جديدًا في عالم القوارب الفاخرة، فإن فهم أساسيات صيانة اليخوت أمر بالغ الأهمية.</p>
            
            <h3>جدول الصيانة المنتظمة</h3>
            <p>إنشاء جدول صيانة منتظم هو أساس رعاية اليخت. يتضمن ذلك:</p>
            <ul>
                <li>فحوصات المحرك الأسبوعية</li>
                <li>فحوصات الهيكل الشهرية</li>
                <li>مراجعات الأنظمة الربعية</li>
                <li>الفحوصات الشاملة السنوية</li>
            </ul>
            
            <h3>مهام الصيانة الأساسية</h3>
            <p>تشمل المناطق الرئيسية التي تتطلب اهتمامًا منتظمًا المحرك والهيكل والأنظمة الكهربائية والمساحات الداخلية. يلعب كل مكون دورًا حيويًا في ضمان أداء يختك وطول عمره.</p>
            
            <h3>الخدمات المهنية</h3>
            <p>بينما يمكن لمالك اليخت التعامل مع بعض مهام الصيانة، فإن العديد منها يتطلب خبرة مهنية. إن الشراكة مع شركة إدارة يخوت موثوقة تضمن صيانة جميع الأنظمة بشكل صحيح ومعالجة أي مشاكل على الفور.</p>
        `,
        category: 'Maintenance',
        slug: 'ultimate-guide-yacht-maintenance',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونيير مارينا',
        published: true,
        tags: ['maintenance', 'yacht care', 'tips'],
    },
    {
        title: 'Exploring the Red Sea: Best Yachting Destinations',
        titleAr: 'استكشاف البحر الأحمر: أفضل الوجهات لليخوت',
        excerpt: 'Discover the most beautiful and exclusive yachting destinations along the Red Sea coastline.',
        excerptAr: 'اكتشف أجمل وأكثر الوجهات حصرية لليخوت على طول ساحل البحر الأحمر.',
        content: `
            <h2>The Red Sea: A Yachting Paradise</h2>
            <p>The Red Sea offers some of the world's most spectacular yachting experiences. With crystal-clear waters, vibrant coral reefs, and stunning coastal landscapes, it's a destination that captivates every yacht enthusiast.</p>
            
            <h3>Top Destinations</h3>
            <p>From the historic port of Jeddah to the pristine waters of the Farasan Islands, the Red Sea coastline is dotted with incredible destinations perfect for yachting adventures.</p>
            
            <h3>What to Expect</h3>
            <p>Each destination offers unique experiences - from world-class diving sites to secluded anchorages where you can enjoy complete privacy and tranquility.</p>
            
            <h3>Planning Your Journey</h3>
            <p>Proper planning ensures you make the most of your Red Sea yachting experience. Consider seasonal weather patterns, local regulations, and the services available at each destination.</p>
        `,
        contentAr: `
            <h2>البحر الأحمر: جنة اليخوت</h2>
            <p>يقدم البحر الأحمر بعضًا من أكثر تجارب اليخوت إثارة في العالم. مع مياه صافية وحيود مرجانية نابضة بالحياة ومناظر ساحلية خلابة، إنه وجهة تسحر كل عشاق اليخوت.</p>
            
            <h3>أفضل الوجهات</h3>
            <p>من ميناء جدة التاريخي إلى المياه البكر لجزر فرسان، يتخلل ساحل البحر الأحمر وجهات لا تصدق مثالية لمغامرات اليخوت.</p>
            
            <h3>ما يمكن توقعه</h3>
            <p>تقدم كل وجهة تجارب فريدة - من مواقع الغوص العالمية إلى مراسي منعزلة حيث يمكنك الاستمتاع بالخصوصية الكاملة والهدوء.</p>
            
            <h3>تخطيط رحلتك</h3>
            <p>يضمن التخطيط السليم أنك تستفيد إلى أقصى حد من تجربة اليخوت في البحر الأحمر. ضع في اعتبارك أنماط الطقس الموسمية واللوائح المحلية والخدمات المتاحة في كل وجهة.</p>
        `,
        category: 'Destinations',
        slug: 'red-sea-yachting-destinations',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونيير مارينا',
        published: true,
        tags: ['destinations', 'red sea', 'travel'],
    },
    {
        title: 'Crew Management: Building Your Dream Team',
        titleAr: 'إدارة الطاقم: بناء فريق أحلامك',
        excerpt: 'Learn how to select, train, and manage a professional yacht crew that delivers exceptional service.',
        excerptAr: 'تعلم كيفية اختيار وتدريب وإدارة طاقم يخت محترف يقدم خدمة استثنائية.',
        content: `
            <h2>The Importance of a Professional Crew</h2>
            <p>A well-trained, professional crew is the backbone of any successful yacht operation. They ensure safety, provide exceptional service, and create memorable experiences for you and your guests.</p>
            
            <h3>Selecting the Right Crew</h3>
            <p>Finding the right crew members involves more than just checking qualifications. It requires understanding their experience, personality, and how they'll fit with your yacht's culture and your personal preferences.</p>
            
            <h3>Training and Development</h3>
            <p>Ongoing training ensures your crew stays current with the latest safety protocols, service standards, and operational procedures. Investing in your crew's development pays dividends in service quality.</p>
            
            <h3>Retention Strategies</h3>
            <p>Keeping experienced crew members requires creating a positive work environment, offering competitive compensation, and providing opportunities for career growth.</p>
        `,
        contentAr: `
            <h2>أهمية الطاقم المحترف</h2>
            <p>الطاقم المدرب جيدًا والمحترف هو العمود الفقري لأي عملية يخت ناجحة. يضمنون السلامة ويقدمون خدمة استثنائية ويخلقون تجارب لا تُنسى لك ولضيوفك.</p>
            
            <h3>اختيار الطاقم المناسب</h3>
            <p>العثور على أعضاء الطاقم المناسبين يتضمن أكثر من مجرد التحقق من المؤهلات. يتطلب فهم خبراتهم وشخصياتهم وكيفية تناسبهم مع ثقافة يختك وتفضيلاتك الشخصية.</p>
            
            <h3>التدريب والتطوير</h3>
            <p>يضمن التدريب المستمر أن يبقى طاقمك على اطلاع بأحدث بروتوكولات السلامة ومعايير الخدمة والإجراءات التشغيلية. الاستثمار في تطوير طاقمك يؤتي ثماره في جودة الخدمة.</p>
            
            <h3>استراتيجيات الاحتفاظ</h3>
            <p>يتطلب الاحتفاظ بأعضاء الطاقم ذوي الخبرة إنشاء بيئة عمل إيجابية وتقديم تعويضات تنافسية وتوفير فرص للنمو الوظيفي.</p>
        `,
        category: 'Crew',
        slug: 'crew-management-building-dream-team',
        author: 'Lunier Marina Team',
        authorAr: 'فريق لونيير مارينا',
        published: true,
        tags: ['crew', 'management', 'team'],
    },
];

async function seedBlogs() {
    try {
        await connectDB();
        console.log('Connected to database');

        // Clear existing blogs (optional - comment out if you want to keep existing)
        // await Blog.deleteMany({});
        // console.log('Cleared existing blogs');

        for (const blogData of sampleBlogs) {
            // Check if blog with this slug already exists
// بدل السطر القديم
const existing = await (Blog as any).findOne({ slug: blogData.slug });
            if (existing) {
                console.log(`Blog with slug "${blogData.slug}" already exists, skipping...`);
                continue;
            }

            const blog = await Blog.create(blogData);
            console.log(`Created blog: ${blog.title} (${blog.slug})`);
        }

        console.log('Blog seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding blogs:', error);
        process.exit(1);
    }
}

seedBlogs();








































