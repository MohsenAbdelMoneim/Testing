/* ================================================================
   i18n — Arabic / English  (Cinematic Edition)
   - Switches lang + dir + all [data-i18n] + [data-i18n-html] + meta
   - Handles: nav, hero, role rotator, stats, intro, about, skills,
     projects, journey, education, contact, footer, toasts
   ================================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'mohsen-lang';

  const translations = {
    /* ═══════════════════════════════════════════════════════════
       العربية
       ═══════════════════════════════════════════════════════════ */
    ar: {
        /* ----- Clock ----- */
'clock.live': 'مباشر',
'clock.day': 'اليوم',
'clock.date': 'التاريخ',
'clock.hijri': 'هجري',
'clock.zone': 'المنطقة',
'clock.hello': 'مرحباً',

/* ----- Palette ----- */
'palette.label': 'الألوان',
'palette.title': 'اختر لوحة الألوان',
'palette.blue': 'أزرق',
'palette.violet': 'بنفسجي',
'palette.emerald': 'أخضر',
'palette.sunset': 'برتقالي',
'palette.rose': 'وردي',
'mode.light': 'نهار',
'mode.dark': 'ليل',
'mode.auto': 'تلقائي',

/* ----- Keyboard ----- */
'kbd.hint': 'اضغط',
'kbd.hint2': 'للاختصارات',
'kbd.title': 'اختصارات لوحة المفاتيح',
'kbd.item1': 'تبديل اللغة',
'kbd.item2': 'تبديل الثيم',
'kbd.item3': 'لوحة الألوان',
'kbd.item4': 'عرض الوقت',
'kbd.item5': 'إغلاق النوافذ',
'kbd.item6': 'للأعلى',
'kbd.item7': 'واتساب',
      /* ----- Meta ----- */
      'meta.title': 'محسن عبد المنعم — مطوّر واجهات أمامية مبتدئ',
      'meta.desc': 'بورتفوليو محسن عبد المنعم — مطوّر واجهات أمامية من بنها، مصر. أبني تجارب ويب حديثة ومتجاوبة.',

      /* ----- Cinema Intro ----- */
      'intro.tagline': 'تجربة رقمية من صناعة محسن',

      /* ----- Navigation ----- */
      'nav.skip': 'تخطي إلى المحتوى',
      'nav.home': 'الرئيسية',
      'nav.about': 'من أنا',
      'nav.skills': 'المهارات',
      'nav.projects': 'المشاريع',
      'nav.education': 'التعليم',
      'nav.contact': 'تواصل',
      'nav.cta': 'لنتحدث',

      /* ----- Hero ----- */
      'hero.status': 'متاح لفرص junior و عمل حر',
      'hero.role': 'مطوّر واجهات أمامية مبتدئ',
      'hero.rolePrefix': 'أنا',
      'hero.roleA': 'مطوّر واجهات',
      'hero.roleB': 'مصمّم ويب',
      'hero.roleC': 'صانع تجارب',
      'hero.name1': 'محسن',
      'hero.name2': 'عبد المنعم',
      'hero.lead': 'أبني تجارب ويب <em>متجاوبة</em> و حديثة و <em>تركّز على المستخدم</em>.',
      'hero.desc': 'حاصل على بكالوريوس نظم معلومات إدارية، ولديّ خبرة عملية في بناء مواقع ومنصات ويب متجاوبة — أحوّل التصاميم إلى واجهات نظيفة وسريعة باستخدام HTML و CSS و JavaScript و React.',
      'hero.cta1': 'شاهد المشاريع',
      'hero.cta2': 'تحميل السيرة',
      'hero.loc': 'بنها، القليوبية — مصر',
      'hero.proj': '11 مشروع مباشر',
      'hero.edu': 'نظم معلومات · 2026',
      'hero.scroll': 'مرر',

      /* ----- Hero Stats ----- */
      'stats.proj': 'مشروع',
      'stats.years': 'سنوات تعلم',
      'stats.commit': '% شغف',

      /* ----- About ----- */
      'about.eyebrow': '01 · من أنا',
      'about.title': 'مطوّر واجهات <span class="title-accent">يُسلّم</span> العمل.',
      'about.note': 'كل مشروع بنيته منشور على الإنترنت — أؤمن أن أفضل طريقة لتعلّم الواجهات هي النشر الفعلي.',
      'about.p1': 'أنا <strong>محسن عبد المنعم</strong> — مطوّر واجهات أمامية من بنها، مصر، حاصل على <span class="hl">بكالوريوس نظم معلومات إدارية</span>. أبني تجارب ويب متجاوبة ومركّزة على المستخدم.',
      'about.p2': 'عملي يغطّي رحلة الواجهات كاملة: تنفيذ تصاميم <span class="hl">Figma</span>، كتابة HTML دلالي و CSS حديث، ربط التفاعلات بـ JavaScript و React، والنشر عبر <span class="hl">Git &amp; GitHub</span>. 11 مشروعاً مباشراً على GitHub Pages.',
      'about.p3': 'مؤخراً أستكشف <span class="hl">أدوات الذكاء الاصطناعي والبرومبت وأتمتة AI للمبتدئين</span> — لتسريع عملي دون استبدال الحرفة.',
      'about.cap1t': 'تطوير ويب متجاوب',
      'about.cap1d': 'تخطيطات ومكونات تعمل من شاشة 320px إلى شاشات عريضة.',
      'about.cap2t': 'تنفيذ واجهات المستخدم',
      'about.cap2d': 'تحويل تصاميم Figma إلى HTML و CSS نظيفة ودقيقة.',
      'about.cap3t': 'Git & GitHub',
      'about.cap3d': 'التزامات موثقة، مستودعات عامة، نشر مباشر عبر GitHub Pages.',
      'about.cap4t': 'أدوات AI والبرومبت',
      'about.cap4d': 'الذكاء الاصطناعي كمساعد — مع خطوات أولى في أتمتة AI.',

      /* ----- Profile Card ----- */
      'profile.name': 'محسن عبد المنعم',
      'profile.role': 'مطوّر واجهات أمامية مبتدئ',
      'profile.locL': 'الموقع',
      'profile.locV': 'بنها، القليوبية — مصر',
      'profile.degL': 'الشهادة',
      'profile.degV': 'نظم معلومات — 2026',
      'profile.focL': 'التخصص',
      'profile.focV': 'ويب متجاوب و UI',
      'profile.stL': 'الحالة',
      'profile.stV': 'متاح للعمل',

      /* ----- Skills ----- */
      'skills.eyebrow': '02 · المهارات',
      'skills.title': 'العدّة وراء العمل.',
      'skills.note': 'لا شرائط تقدّم ولا نسب — فقط الأدوات التي أستخدمها فعلياً لبناء مشاريع حقيقية.',
      'skills.g1': 'الواجهة الأمامية',
      'skills.g2': 'واجهات المستخدم',
      'skills.g3': 'الأدوات',
      'skills.g4': 'الذكاء الاصطناعي',
      'skills.g5': 'مايكروسوفت أوفيس',
      'skills.resp': 'تصميم متجاوب',
      'skills.ui': 'UI/UX أساسي',
      'skills.ai': 'أدوات AI',
      'skills.prompt': 'البرومبت',
      'skills.auto': 'أتمتة AI',
      'skills.lvl': 'مبتدئ',

      /* ----- Projects ----- */
      'projects.eyebrow': '03 · المشاريع',
      'projects.title': 'أعمال مختارة —<br />كلها مباشرة ومفتوحة المصدر.',
      'projects.note': 'كل مشروع بالأسفل منشور على GitHub Pages. مرر للتفاعل، اضغط للتفاصيل.',
      'filters.all': 'الكل',
      'filters.featured': 'مميز',
      'filters.frontend': 'واجهات',
      'filters.websites': 'مواقع',
      'filters.platforms': 'منصات',
      'filters.count': 'مشروع',
      'btn.live': 'مباشر',
      'btn.code': 'الكود',
      'proj.showAll': 'عرض كل المشاريع (11)',
      'proj.showLess': 'عرض أقل',
      'tag.responsive': 'متجاوب',
      'proj.more.t': 'المزيد على GitHub',
      'proj.more.d': 'كل مشروع مفتوح المصدر — تصفّح القائمة الكاملة على ملفي.',
      'proj.more.cta': 'زيارة الحساب',
      'proj.hayat.cat': 'منصة طبية',
      'proj.hayat.desc': 'تخزين معلومات المرضى الضرورية وتوليد رموز QR للوصول السريع في الطوارئ.',
      'proj.gym.cat': 'مشروع تخرج',
      'proj.gym.desc': 'منصة جيم متجاوبة تعرض برامج التمرين ومعلومات التمارين.',
      'proj.dev.cat': 'منصة دراسية',
      'proj.dev.desc': 'تنظيم مهام التعلّم وتتبع تقدّم تطوير الواجهات في مكان واحد.',
      'proj.exam.cat': 'منصة اختبارات',
      'proj.exam.desc': 'اختبارات تدريبية أونلاين لطلاب الثانوية المصرية، متجاوبة بالكامل.',
      'proj.lib.cat': 'منصة كورسات',
      'proj.lib.desc': 'منصة لتنظيم وعرض الكورسات التعليمية المدفوعة.',
      'proj.learn.cat': 'منصة تعليمية',
      'proj.learn.desc': 'موقع تعليمي لعرض وتنظيم المحتوى التعليمي.',
      'proj.nove.cat': 'موقع براند',
      'proj.nove.desc': 'موقع متجاوب لبراند أزياء وإكسسوارات.',
      'proj.cont.cat': 'موقع أعمال',
      'proj.cont.desc': 'موقع متجاوب لشركة مقاولات وبناء.',
      'proj.quran.cat': 'أداة تحفيظ',
      'proj.quran.desc': 'موقع يدعم تحفيظ القرآن بتجربة مستخدم بسيطة وهادئة.',
      'proj.gz.cat': 'تتبع تمارين',
      'proj.gz.desc': 'واجهة تتبع التمارين مبنية بتقنيات الواجهات الأساسية.',
      'proj.taste.cat': 'موقع طعام',
      'proj.taste.desc': 'موقع طعام متجاوب بتقنيات الواجهات الأساسية.',

      /* ----- Journey ----- */
      'journey.eyebrow': '04 · الرحلة',
      'journey.title': 'كيف وصلت إلى هنا.',
      'journey.note': 'بدون خبرات مستعارة — مسار مبني على الشهادة أولاً، ثم المشاريع واحداً تلو الآخر.',
      'tl1.p': 'الأساس', 'tl1.t': 'بكالوريوس نظم معلومات إدارية',
      'tl1.d': 'بدأت بكالوريوس نظم المعلومات الإدارية في المعهد العالي للدراسات المتقدمة — القطامية، ببناء أساس في الأنظمة والبيانات وكيف تخدم التقنية الناس.',
      'tl2.p': 'الخطوات الأولى', 'tl2.t': 'HTML و CSS و JavaScript',
      'tl2.d': 'تعمّقت في HTML الدلالي و CSS الحديث و JavaScript الخام — بالتطبيق على واجهات حقيقية بدلاً من المتابعة فقط.',
      'tl3.p': 'إنجاز', 'tl3.t': 'مشروع التخرج — GymZone',
      'tl3.d': 'صممت وبنيت منصة جيم متجاوبة كمشروع تخرجي، تعرض برامج التمرين ومعلومات التمارين.',
      'tl4.p': 'تدريب', 'tl4.t': 'تطوير الويب المتجاوب',
      'tl4.d': 'نشرت مشروعاً تلو الآخر مع اعتبار التجاوب متطلباً أساسياً — تخطيطات تصمد أمام الشاشات الحقيقية، من الهواتف الصغيرة وما فوقها.',
      'tl5.p': 'سير العمل', 'tl5.t': 'Git و GitHub والنشر',
      'tl5.d': 'تبنّيت سير عمل حقيقي لإدارة الإصدارات: كل مشروع في مستودع عام ومنشور عبر GitHub Pages.',
      'tl6.p': 'الآن', 'tl6.t': 'أدوات AI والبرومبت وما بعدها',
      'tl6.d': 'أستكشف أدوات AI والبرومبت، وأخطو خطواتي الأولى في أتمتة AI — باحثاً عن دور junior في الواجهات الأمامية أنمو فيه بسرعة.',

      /* ----- Education ----- */
      'edu.eyebrow': '05 · التعليم',
      'edu.title': 'حيث بدأ التفكير المنظومي.',
      'edu.degree': 'بكالوريوس نظم معلومات إدارية (MIS)',
      'edu.inst': 'المعهد العالي للدراسات المتقدمة — القطامية',
      'edu.yearL': 'التخرج',
      'edu.gradeL': 'التقدير',
      'edu.gradeV': 'جيد',
      'edu.fieldL': 'التخصص',

      /* ----- Contact ----- */
      'contact.eyebrow': '06 · تواصل',
      'contact.title': 'لنبنِ<br /><span class="title-accent">شيئاً رائعاً</span>.',
      'contact.sub': 'متاح لفرص junior في الواجهات الأمامية، المشاريع الحرة، والتعاون.',
      'contact.clickCopy': 'اضغط للنسخ',
      'contact.emailL': 'البريد',
      'contact.phoneL': 'الهاتف',

      /* ----- Footer ----- */
      'footer.sub': 'مطوّر واجهات أمامية — بنها، مصر',
      'footer.note': 'مصنوع بـ HTML و CSS و JavaScript.',

      /* ----- Toasts ----- */
      'toast.copied': 'تم نسخ البريد!',
      'toast.copyFail': 'فشل النسخ',
      'toast.dark': 'الوضع الداكن مفعّل',
      'toast.light': 'الوضع الفاتح مفعّل',
      'toast.langSwitched': 'تم تغيير اللغة إلى العربية',
      'toast.print': 'جارٍ فتح نافذة الطباعة…',
      'toast.waReady': 'واتساب جاهز للتواصل',
      'toast.scrolledTop': 'تم الرجوع للأعلى',
    },
'cursor.toggle': 'مؤشر مخصص',
'cursor.view': 'عرض',
'cursor.grab': 'سحب',
'cursor.grabbing': 'إفلات',
    /* ═══════════════════════════════════════════════════════════
       English
       ═══════════════════════════════════════════════════════════ */
    en: {
        'cursor.toggle': 'Custom Cursor',
'cursor.view': 'View',
'cursor.grab': 'Grab',
'cursor.grabbing': 'Release',
        /* ----- Clock ----- */
'clock.live': 'Live',
'clock.day': 'Day',
'clock.date': 'Date',
'clock.hijri': 'Hijri',
'clock.zone': 'Zone',
'clock.hello': 'Hello',

/* ----- Palette ----- */
'palette.label': 'Colors',
'palette.title': 'Choose a color palette',
'palette.blue': 'Blue',
'palette.violet': 'Violet',
'palette.emerald': 'Emerald',
'palette.sunset': 'Sunset',
'palette.rose': 'Rose',
'mode.light': 'Light',
'mode.dark': 'Dark',
'mode.auto': 'Auto',

/* ----- Keyboard ----- */
'kbd.hint': 'Press',
'kbd.hint2': 'for shortcuts',
'kbd.title': 'Keyboard shortcuts',
'kbd.item1': 'Switch language',
'kbd.item2': 'Toggle theme',
'kbd.item3': 'Color palette',
'kbd.item4': 'Show time',
'kbd.item5': 'Close dialogs',
'kbd.item6': 'Back to top',
'kbd.item7': 'WhatsApp',
      /* ----- Meta ----- */
      'meta.title': 'Mohsen Abdel-Moneim — Junior Frontend Developer',
      'meta.desc': 'Portfolio of Mohsen Abdel-Moneim, a Junior Frontend Developer from Banha, Egypt — building responsive, modern, user-focused web experiences.',

      /* ----- Cinema Intro ----- */
      'intro.tagline': 'A digital experience by Mohsen',

      /* ----- Navigation ----- */
      'nav.skip': 'Skip to content',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.education': 'Education',
      'nav.contact': 'Contact',
      'nav.cta': "Let's talk",

      /* ----- Hero ----- */
      'hero.status': 'Available for junior roles & freelance',
      'hero.role': 'Junior Frontend Developer',
      'hero.rolePrefix': "I'm a",
      'hero.roleA': 'Frontend Developer',
      'hero.roleB': 'Web Designer',
      'hero.roleC': 'Experience Maker',
      'hero.name1': 'Mohsen',
      'hero.name2': 'Abdel-Moneim',
      'hero.lead': 'Building <em>responsive</em>, modern &amp; <em>user-focused</em> web experiences.',
      'hero.desc': "I hold a Bachelor's degree in Management Information Systems and have hands-on experience building responsive websites and web platforms — turning designs into clean, fast interfaces with HTML, CSS, JavaScript and React.",
      'hero.cta1': 'View Projects',
      'hero.cta2': 'Download CV',
      'hero.loc': 'Banha, Qalyubia — Egypt',
      'hero.proj': '11 projects live',
      'hero.edu': 'MIS · Class of 2026',
      'hero.scroll': 'scroll',

      /* ----- Hero Stats ----- */
      'stats.proj': 'Projects',
      'stats.years': 'Years learning',
      'stats.commit': '% Passion',

      /* ----- About ----- */
      'about.eyebrow': '01 · About',
      'about.title': 'A frontend developer<br />who <span class="title-accent">ships</span>.',
      'about.note': "Every project I've built is deployed and public — I believe the best way to learn frontend is to put work live.",
      'about.p1': "I'm <strong>Mohsen Abdel-Moneim</strong> — a Junior Frontend Developer from Banha, Egypt, with a <span class=\"hl\">Bachelor's degree in Management Information Systems</span>. I build responsive, user-focused web experiences.",
      'about.p2': 'My work covers the full frontend journey: implementing designs from <span class="hl">Figma</span>, writing semantic HTML and modern CSS, wiring interactions with JavaScript and React, and shipping through a <span class="hl">Git &amp; GitHub workflow</span>. Eleven projects are live on GitHub Pages.',
      'about.p3': "Lately I've been exploring <span class=\"hl\">AI tools, prompting, and beginner AI automation</span> — using them to sharpen my workflow, never to replace the craft.",
      'about.cap1t': 'Responsive Web Development',
      'about.cap1d': 'Layouts and components that hold up from a 320px phone to a widescreen desktop.',
      'about.cap2t': 'UI Implementation',
      'about.cap2d': 'Turning Figma frames into clean, pixel-accurate HTML & CSS.',
      'about.cap3t': 'Git & GitHub Workflow',
      'about.cap3d': 'Versioned commits, public repositories, live deploys via GitHub Pages.',
      'about.cap4t': 'AI Tools & Prompting',
      'about.cap4d': 'AI as an assistant — with first steps into beginner AI automation.',

      /* ----- Profile Card ----- */
      'profile.name': 'Mohsen Abdel-Moneim',
      'profile.role': 'Junior Frontend Developer',
      'profile.locL': 'Location',
      'profile.locV': 'Banha, Qalyubia — EG',
      'profile.degL': 'Degree',
      'profile.degV': 'MIS — Class of 2026',
      'profile.focL': 'Focus',
      'profile.focV': 'Responsive web & UI',
      'profile.stL': 'Status',
      'profile.stV': 'Open to work',

      /* ----- Skills ----- */
      'skills.eyebrow': '02 · Skills',
      'skills.title': 'The toolkit behind the work.',
      'skills.note': 'No progress bars, no percentages — just the tools I actually use to ship real projects.',
      'skills.g1': 'Frontend',
      'skills.g2': 'UI / UX',
      'skills.g3': 'Tools',
      'skills.g4': 'AI',
      'skills.g5': 'Microsoft Office',
      'skills.resp': 'Responsive Web Design',
      'skills.ui': 'Basic UI/UX Design',
      'skills.ai': 'AI Tools',
      'skills.prompt': 'Prompting',
      'skills.auto': 'AI Automation',
      'skills.lvl': 'beginner',

      /* ----- Projects ----- */
      'projects.eyebrow': '03 · Projects',
      'projects.title': 'Selected work —<br />all live, all open source.',
      'projects.note': 'Every project below is deployed on GitHub Pages. Hover to feel it, click a card for details.',
      'filters.all': 'All',
      'filters.featured': 'Featured',
      'filters.frontend': 'Frontend',
      'filters.websites': 'Websites',
      'filters.platforms': 'Platforms',
      'filters.count': 'projects',
      'btn.live': 'Live Demo',
      'btn.code': 'Code',
      'proj.showAll': 'View all 11 projects',
      'proj.showLess': 'Show fewer projects',
      'tag.responsive': 'Responsive',
      'proj.more.t': 'More on GitHub',
      'proj.more.d': 'Every project is open source — browse the full list of repositories on my profile.',
      'proj.more.cta': 'Visit profile',
      'proj.hayat.cat': 'Medical platform',
      'proj.hayat.desc': 'Store essential patient information and generate QR codes for quick access during emergencies.',
      'proj.gym.cat': 'Graduation project',
      'proj.gym.desc': 'A responsive gym platform presenting workout programs and exercise information.',
      'proj.dev.cat': 'Study platform',
      'proj.dev.desc': 'Organize learning tasks and track frontend development progress in one place.',
      'proj.exam.cat': 'Exam platform',
      'proj.exam.desc': 'Online practice exams for Egyptian secondary school students, fully responsive.',
      'proj.lib.cat': 'Courses platform',
      'proj.lib.desc': 'A platform for organizing and presenting paid educational courses.',
      'proj.learn.cat': 'Educational platform',
      'proj.learn.desc': 'An educational website for presenting and organizing learning content.',
      'proj.nove.cat': 'Brand website',
      'proj.nove.desc': 'A responsive website for a fashion and accessories brand.',
      'proj.cont.cat': 'Business website',
      'proj.cont.desc': 'A responsive website for a contracting and construction business.',
      'proj.quran.cat': 'Memorization tool',
      'proj.quran.desc': 'A website supporting Quran memorization with a simple, calm user experience.',
      'proj.gz.cat': 'Workout tracker',
      'proj.gz.desc': 'A workout tracking interface built with core frontend technologies.',
      'proj.taste.cat': 'Food website',
      'proj.taste.desc': 'A food-themed responsive website built with core frontend technologies.',

      /* ----- Journey ----- */
      'journey.eyebrow': '04 · Journey',
      'journey.title': 'How I got here.',
      'journey.note': 'No borrowed experience — a path built degree-first, then project by project.',
      'tl1.p': 'Foundation', 'tl1.t': "MIS Bachelor's Degree",
      'tl1.d': "Started my Bachelor's in Management Information Systems at the Higher Institute for Advanced Studies — Katameya, building a base in systems, data, and how technology serves people.",
      'tl2.p': 'First steps', 'tl2.t': 'HTML, CSS & JavaScript',
      'tl2.d': 'Went deep into semantic HTML, modern CSS and vanilla JavaScript — practicing by building real interfaces instead of just following along.',
      'tl3.p': 'Milestone', 'tl3.t': 'Graduation Project — GymZone',
      'tl3.d': 'Designed and built a responsive gym platform as my graduation project, presenting workout programs and exercise information.',
      'tl4.p': 'Practice', 'tl4.t': 'Responsive web development',
      'tl4.d': 'Shipped project after project with responsiveness as a core requirement — layouts that survive contact with real screens, from small phones up.',
      'tl5.p': 'Workflow', 'tl5.t': 'Git, GitHub & deployment',
      'tl5.d': 'Adopted a real version-control workflow: every project lives in a public repository and is deployed through GitHub Pages.',
      'tl6.p': 'Now', 'tl6.t': "AI tools, prompting & what's next",
      'tl6.d': 'Exploring AI tools and prompting, and taking my first steps in AI automation — while looking for a junior frontend role where I can grow fast.',

      /* ----- Education ----- */
      'edu.eyebrow': '05 · Education',
      'edu.title': 'Where the systems thinking began.',
      'edu.degree': "Bachelor's Degree in Management Information Systems (MIS)",
      'edu.inst': 'Higher Institute for Advanced Studies — Katameya',
      'edu.yearL': 'Graduated',
      'edu.gradeL': 'Grade',
      'edu.gradeV': 'Good',
      'edu.fieldL': 'Field',

      /* ----- Contact ----- */
      'contact.eyebrow': '06 · Contact',
      'contact.title': "Let's build<br /><span class=\"title-accent\">something great</span>.",
      'contact.sub': 'Open to junior frontend opportunities, freelance projects, and collaborations.',
      'contact.clickCopy': 'click to copy',
      'contact.emailL': 'Email',
      'contact.phoneL': 'Phone',

      /* ----- Footer ----- */
      'footer.sub': 'Junior Frontend Developer — Banha, EG',
      'footer.note': 'Handcrafted with HTML, CSS & JavaScript.',

      /* ----- Toasts ----- */
      'toast.copied': 'Email copied!',
      'toast.copyFail': 'Copy failed',
      'toast.dark': 'Dark theme on',
      'toast.light': 'Light theme on',
      'toast.langSwitched': 'Language switched to English',
      'toast.print': 'Opening print dialog…',
      'toast.waReady': 'WhatsApp ready',
      'toast.scrolledTop': 'Back to top',
    }
  };

  /* ---------- Translate helper ---------- */
  const t = (key, lang) => {
    const dict = translations[lang] || translations.ar;
    return dict[key] ?? key;
  };

  /* ---------- Apply language ---------- */
  function apply(lang, options = {}) {
    const dict = translations[lang];
    if (!dict) return;

    const silent = options.silent === true;

    // html attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dataset.lang = lang;

    // title
    document.title = dict['meta.title'] || document.title;

    // meta description
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', dict['meta.desc'] || '');

    // [data-i18n] — text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // [data-i18n-html] — innerHTML
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // [data-i18n-content] — attribute content (for meta tags)
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      const key = el.dataset.i18nContent;
      if (dict[key] !== undefined) el.setAttribute('content', dict[key]);
    });

    // [data-i18n-placeholder] — placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    // [data-i18n-aria] — aria-label attribute
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.dataset.i18nAria;
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    // ----- Language toggle button -----
    const btn = document.getElementById('langToggle');
    if (btn) {
      const flag = btn.querySelector('.lang-flag');
      const txt = btn.querySelector('.lang-text');
      if (flag) flag.textContent = lang === 'ar' ? '🇬🇧' : '🇪🇬';
      if (txt) txt.textContent = lang === 'ar' ? 'EN' : 'AR';

      // Update aria-label
      btn.setAttribute('aria-label',
        lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
    }

    // ----- WhatsApp FAB tooltip -----
    const waFab = document.querySelector('.fab--whatsapp');
    if (waFab) {
      waFab.setAttribute('data-tooltip',
        lang === 'ar' ? 'واتساب / WhatsApp' : 'WhatsApp');
    }

    // ----- Scroll top FAB tooltip -----
    const topFab = document.querySelector('.fab--top');
    if (topFab) {
      topFab.setAttribute('data-tooltip',
        lang === 'ar' ? 'للأعلى / Top' : 'Back to top');
    }

    // ----- Toast (unless silent) -----
    if (!silent) {
      const toastMsg = dict['toast.langSwitched'];
      if (window.mohsenToast && toastMsg) {
        window.mohsenToast(toastMsg, 'bi-translate');
      }
    }

    // ----- Dispatch event for other modules -----
    window.dispatchEvent(new CustomEvent('mohsen:langchange', {
      detail: { lang }
    }));
  }

  /* ---------- Get initial language ---------- */
  function getInitial() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (e) {}
    return 'ar';
  }

  /* ---------- Set language ---------- */
  function set(lang, options = {}) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    apply(lang, options);
  }

  /* ---------- Toggle ---------- */
  function toggle() {
    const current = document.documentElement.dataset.lang || 'ar';
    set(current === 'ar' ? 'en' : 'ar');
  }

  /* ---------- Expose global API ---------- */
  window.mohsenI18n = {
    apply,
    set,
    toggle,
    getInitial,
    t: (k) => t(k, document.documentElement.dataset.lang || 'ar'),
    translations
  };

  /* ---------- Init on DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const lang = getInitial();

    // Apply immediately (silent — no toast on first load)
    apply(lang, { silent: true });

    // Toggle button
    const btn = document.getElementById('langToggle');
    btn?.addEventListener('click', () => toggle());

    // Keyboard shortcut: Ctrl/Cmd + L
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        toggle();
      }
    });
  });

})();