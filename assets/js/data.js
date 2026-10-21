/* =========================================================
   وهبة سيستم — بيانات الديمو
   كل الأرقام والأسماء هنا تجريبية. التواريخ تُحسب نسبةً إلى
   تاريخ اليوم حتى تبقى لوحة التحكم حيّة في أي وقت تُفتح فيه.
   ========================================================= */

const DB = {
  store: {
    name: 'وهبة سيستم',
    tagline: 'أثاث منزلي فاخر',
    legal: 'مؤسسة وهبة للأثاث',
    vatNumber: '310224568700003',
    crNumber: '4030558792',
    phone: '+966 12 664 8800',
    email: 'hello@wahba.sa',
    address: 'طريق الأمير سلطان، حي الروضة، جدة',
    vatRate: 15,
    invoicePrefix: 'INV-2026-',
    currency: 'ر.س',
    openTime: '10:00 ص — 11:00 م',
    demo: true,
  },

  nav: [
    { group: 'الرئيسية', items: [
      { id: 'dashboard', label: 'لوحة التحكم', icon: 'layout' },
    ]},
    { group: 'المبيعات', items: [
      { id: 'pos', label: 'نقطة البيع', icon: 'scan' },
      { id: 'sales', label: 'طلبات البيع', icon: 'bag', count: 3, actionable: true },
      { id: 'invoices', label: 'الفواتير', icon: 'receipt', count: 2, actionable: true },
    ]},
    { group: 'المخزون', items: [
      { id: 'inventory', label: 'المنتجات', icon: 'box', count: 5, actionable: true },
      { id: 'warehouses', label: 'المخازن', icon: 'warehouse' },
      { id: 'purchases', label: 'المشتريات', icon: 'truck' },
    ]},
    { group: 'العلاقات', items: [
      { id: 'customers', label: 'العملاء', icon: 'users' },
    ]},
    { group: 'التحليلات', items: [
      { id: 'reports', label: 'التقارير', icon: 'chart' },
    ]},
    { group: 'النظام', items: [
      { id: 'settings', label: 'الإعدادات', icon: 'settings' },
    ]},
  ],

  team: [
    { id: 'u1', name: 'أحمد وهبة', role: 'المدير العام', avatar: 'u-ahmed.jpg', initials: 'أو' },
    { id: 'u2', name: 'منى صالح', role: 'المحاسبة', avatar: 'u-mona.jpg', initials: 'مص' },
    { id: 'u3', name: 'خالد رأفت', role: 'مسؤول المخزون', avatar: 'u-khaled.jpg', initials: 'خر' },
    { id: 'u4', name: 'ريم القحطاني', role: 'المبيعات', avatar: 'u-reem.jpg', initials: 'رق' },
    { id: 'u5', name: 'يوسف العمري', role: 'المشتريات', avatar: 'u-yousef.jpg', initials: 'يع' },
  ],

  categories: ['الكل', 'أطقم جلوس', 'كنبات', 'غرف نوم', 'طاولات', 'كراسي', 'مكاتب', 'تخزين', 'تجاري'],

  products: [
    { id: 'P01', sku: 'WH-SOF-1001', name: 'كنبة لانا المخملية', cat: 'كنبات', img: 'sofa-lana.jpg', price: 4850, cost: 3150, stock: 8, reorder: 4, warehouse: 'المعرض الرئيسي', supplier: 'الدار التركية', material: 'مخمل إيطالي', color: 'أخضر زمردي', size: '220 × 95 × 82 سم', warranty: '5 سنوات', sold: 24, rating: 4.8, arrived: 12 },
    { id: 'P02', sku: 'WH-SOF-1002', name: 'كنبة تيرازا الجلدية', cat: 'كنبات', img: 'dining.jpg', price: 7200, cost: 5100, stock: 4, reorder: 2, warehouse: 'المعرض الرئيسي', supplier: 'الدار التركية', material: 'جلد طبيعي', color: 'كراميل', size: '240 × 100 × 84 سم', warranty: '7 سنوات', sold: 11, rating: 4.9, arrived: 6 },
    { id: 'P03', sku: 'WH-SOF-1003', name: 'كنبة مارون', cat: 'كنبات', img: 'sofa-tan.jpg', price: 3650, cost: 2400, stock: 12, reorder: 4, warehouse: 'فرع الرياض', supplier: 'مصنع الأثاث الوطني', material: 'قماش كتان', color: 'طيني', size: '200 × 92 × 80 سم', warranty: '4 سنوات', sold: 19, rating: 4.6, arrived: 15 },
    { id: 'P04', sku: 'WH-SET-2001', name: 'طقم جلوس ميلانو', cat: 'أطقم جلوس', img: 'sofa-cream.jpg', price: 6400, cost: 4300, stock: 3, reorder: 2, warehouse: 'المعرض الرئيسي', supplier: 'الدار التركية', material: 'قماش بوكل', color: 'رمادي دافئ', size: 'طقم 3 + 1 + طاولة', warranty: '5 سنوات', sold: 8, rating: 4.7, arrived: 4 },
    { id: 'P05', sku: 'WH-SET-2002', name: 'طقم جلوس سكاي', cat: 'أطقم جلوس', img: 'interior-warm.jpg', price: 9800, cost: 6900, stock: 2, reorder: 2, warehouse: 'المعرض الرئيسي', supplier: 'الدار التركية', material: 'قماش مقاوم للبقع', color: 'بيج رملي', size: 'طقم ركنة 6 مقاعد', warranty: '6 سنوات', sold: 6, rating: 4.8, arrived: 2 },
    { id: 'P06', sku: 'WH-BED-3001', name: 'سرير كينغ أرك', cat: 'غرف نوم', img: 'interior-arch.jpg', price: 8900, cost: 6100, stock: 5, reorder: 2, warehouse: 'مستودع الشرقية', supplier: 'بيوت الشرق', material: 'خشب بلوط + قماش', color: 'عاجي', size: 'كينغ 200 × 200 سم', warranty: '6 سنوات', sold: 9, rating: 4.9, arrived: 5 },
    { id: 'P07', sku: 'WH-BED-3002', name: 'سرير ملكي كلاسيك', cat: 'غرف نوم', img: 'bed-neutral.jpg', price: 11500, cost: 8200, stock: 2, reorder: 1, warehouse: 'مستودع الشرقية', supplier: 'بيوت الشرق', material: 'خشب صلب + قماش', color: 'فضي فحمي', size: 'كينغ 200 × 210 سم', warranty: '8 سنوات', sold: 4, rating: 4.7, arrived: 3 },
    { id: 'P08', sku: 'WH-CHR-4001', name: 'كرسي إليز', cat: 'كراسي', img: 'chair-rose.jpg', price: 1250, cost: 780, stock: 14, reorder: 5, warehouse: 'المعرض الرئيسي', supplier: 'مصنع الأثاث الوطني', material: 'قماش مخملي', color: 'عاجي', size: '68 × 70 × 78 سم', warranty: '3 سنوات', sold: 31, rating: 4.5, arrived: 18 },
    { id: 'P09', sku: 'WH-CHR-4002', name: 'كرسي صفا', cat: 'كراسي', img: 'living-room.jpg', price: 1480, cost: 950, stock: 9, reorder: 4, warehouse: 'فرع الرياض', supplier: 'الدار التركية', material: 'قماش كريب', color: 'خردلي', size: '72 × 78 × 80 سم', warranty: '4 سنوات', sold: 22, rating: 4.8, arrived: 10 },
    { id: 'P10', sku: 'WH-CHR-4003', name: 'كرسي طعام أجيلي', cat: 'كراسي', img: 'armchair.jpg', price: 620, cost: 380, stock: 26, reorder: 10, warehouse: 'المعرض الرئيسي', supplier: 'مصنع الأثاث الوطني', material: 'قماش تويد', color: 'رمادي حجري', size: '48 × 55 × 86 سم', warranty: '3 سنوات', sold: 58, rating: 4.6, arrived: 30 },
    { id: 'P11', sku: 'WH-CHR-4004', name: 'كرسي بار نوردك', cat: 'كراسي', img: 'chair-wood.jpg', price: 390, cost: 240, stock: 32, reorder: 12, warehouse: 'مستودع الشرقية', supplier: 'بيوت الشرق', material: 'خشب زان', color: 'رمادي فاتح', size: '38 × 38 × 75 سم', warranty: '2 سنة', sold: 44, rating: 4.4, arrived: 40 },
    { id: 'P12', sku: 'WH-TBL-5001', name: 'طاولة طعام أوريا', cat: 'طاولات', img: 'dining-wood.jpg', price: 2950, cost: 1900, stock: 6, reorder: 3, warehouse: 'فرع الرياض', supplier: 'بيوت الشرق', material: 'خشب أبيض مصبوغ', color: 'أبيض مطفي', size: 'قطر 120 سم', warranty: '4 سنوات', sold: 15, rating: 4.6, arrived: 8 },
    { id: 'P13', sku: 'WH-DSK-6001', name: 'مكتب أعمال 140', cat: 'مكاتب', img: 'office-desk.jpg', price: 2100, cost: 1450, stock: 7, reorder: 3, warehouse: 'معرض المدينة', supplier: 'أوكا للأثاث المكتبي', material: 'خشب + معدن', color: 'رمادي فاتح', size: '140 × 70 × 75 سم', warranty: '5 سنوات', sold: 13, rating: 4.7, arrived: 9 },
    { id: 'P14', sku: 'WH-STO-7001', name: 'وحدة تخزين لين', cat: 'تخزين', img: 'decor.jpg', price: 1890, cost: 1200, stock: 3, reorder: 3, warehouse: 'معرض المدينة', supplier: 'بيوت الشرق', material: 'خشب MDF مُلبّس', color: 'بلوط فاتح', size: '90 × 35 × 190 سم', warranty: '3 سنوات', sold: 7, rating: 4.3, arrived: 3 },
    { id: 'P15', sku: 'WH-SET-2003', name: 'طقم جلوس بوهو', cat: 'أطقم جلوس', img: 'mirror-hall.jpg', price: 5400, cost: 3700, stock: 4, reorder: 2, warehouse: 'المعرض الرئيسي', supplier: 'الدار التركية', material: 'قماش بولي', color: 'رمادي دخاني', size: 'طقم 3 + 2 + طاولة', warranty: '5 سنوات', sold: 10, rating: 4.6, arrived: 5 },
    { id: 'P16', sku: 'WH-BUS-8001', name: 'طقم انتظار أعمال', cat: 'مكاتب', img: 'lounge.jpg', price: 6900, cost: 4800, stock: 1, reorder: 2, warehouse: 'معرض المدينة', supplier: 'أوكا للأثاث المكتبي', material: 'قماش أكريليك', color: 'رمادي بارد', size: 'طقم 4 مقاعد', warranty: '5 سنوات', sold: 3, rating: 4.5, arrived: 2 },
    { id: 'P17', sku: 'WH-BUS-8002', name: 'طقم كافيه صناعي', cat: 'تجاري', img: 'bedroom.jpg', price: 4300, cost: 2900, stock: 2, reorder: 2, warehouse: 'مستودع الشرقية', supplier: 'أوكا للأثاث المكتبي', material: 'خشب + قماش', color: 'فحمي', size: 'طقم 6 مقاعد', warranty: '3 سنوات', sold: 5, rating: 4.2, arrived: 2 },
    { id: 'P18', sku: 'WH-SOF-1004', name: 'كنبة ركنة ظل', cat: 'كنبات', img: 'sofa-green.jpg', price: 5950, cost: 4100, stock: 0, reorder: 2, warehouse: 'فرع الرياض', supplier: 'مصنع الأثاث الوطني', material: 'قماش مقاوم', color: 'فحمي', size: 'ركنة 280 × 180 سم', warranty: '5 سنوات', sold: 7, rating: 4.5, arrived: 4 },
    { id: 'P19', sku: 'WH-SET-2004', name: 'طقم جلوس نُور', cat: 'أطقم جلوس', img: 'bed-linen.jpg', price: 7450, cost: 5200, stock: 1, reorder: 2, warehouse: 'المعرض الرئيسي', supplier: 'الدار التركية', material: 'قماش بوكل', color: 'عاجي دافئ', size: 'طقم 3 + كرسي + طاولتان', warranty: '5 سنوات', sold: 6, rating: 4.9, arrived: 2 },
    { id: 'P20', sku: 'WH-SET-2005', name: 'طقم جلوس بانوراما', cat: 'أطقم جلوس', img: 'room-arch.jpg', price: 4200, cost: 2900, stock: 11, reorder: 4, warehouse: 'معرض المدينة', supplier: 'مصنع الأثاث الوطني', material: 'قماش بولي', color: 'رمادي طبيعي', size: 'طقم 3 + طاولة', warranty: '4 سنوات', sold: 14, rating: 4.4, arrived: 12 },
  ],

  customers: [
    { id: 'C01', name: 'سارة العتيبي', type: 'فرد', phone: '055 214 8890', email: 'sara.a@example.com', city: 'جدة', since: '2023-02-11', tier: 'بلاتيني', orders: 9, spent: 128400, balance: 0, avatar: 'c-sara.jpg', note: 'تفضل الألوان المحايدة والتسليم يوم الخميس.' },
    { id: 'C02', name: 'شركة الفخامة للمقاولات', type: 'شركة', phone: '012 665 4471', email: 'projects@fakhama.example', city: 'الرياض', since: '2022-06-04', tier: 'ذهبي', orders: 14, spent: 342000, balance: 18500, avatar: null, initials: 'فخ', note: 'حساب آجل 30 يومًا. جهة الاتصال: م. تركي الدوسري.' },
    { id: 'C03', name: 'فندق دار السلام', type: 'شركة', phone: '012 220 1180', email: 'procurement@darsalam.example', city: 'جدة', since: '2021-09-19', tier: 'بلاتيني', orders: 22, spent: 512750, balance: 0, avatar: null, initials: 'دس', note: 'توريد أثاث الغرف والأجنحة. تسليم على مراحل.' },
    { id: 'C04', name: 'محمد الحربي', type: 'فرد', phone: '050 887 3421', email: 'm.harbi@example.com', city: 'جدة', since: '2024-01-08', tier: 'فضي', orders: 5, spent: 46200, balance: 3200, avatar: 'c-mohammed.jpg', note: 'باقي دفعة عند الاستلام.' },
    { id: 'C05', name: 'نورة القحطاني', type: 'فرد', phone: '056 330 7712', email: 'noura.q@example.com', city: 'المدينة', since: '2023-11-02', tier: 'ذهبي', orders: 7, spent: 88900, balance: 0, avatar: 'c-noura.jpg', note: 'عميلة تصاميم داخلية، ترسل مخططات قبل الطلب.' },
    { id: 'C06', name: 'مكتب رؤية للاستشارات', type: 'شركة', phone: '011 482 9060', email: 'office@ruyaa.example', city: 'الرياض', since: '2024-03-27', tier: 'فضي', orders: 6, spent: 73500, balance: 7400, avatar: null, initials: 'رؤ', note: 'تجهيز مكاتب الإدارة والاجتماعات.' },
    { id: 'C07', name: 'عبدالله الشمري', type: 'فرد', phone: '053 909 2244', email: '', city: 'الدمام', since: '2025-07-14', tier: 'برونزي', orders: 2, spent: 18600, balance: 0, avatar: 'c-abdullah.jpg', note: '' },
    { id: 'C08', name: 'مريم الزهراني', type: 'فرد', phone: '054 118 6630', email: 'mariam.z@example.com', city: 'جدة', since: '2026-09-30', tier: 'جديد', orders: 1, spent: 9800, balance: 0, avatar: 'c-mariam.jpg', note: 'أول عملية شراء — متابعة بعد التسليم.' },
    { id: 'C09', name: 'مؤسسة البناء الحديث للمقاولات والتوريدات العامة', type: 'شركة', phone: '013 845 2200', email: 'info@modern-build.example', city: 'الخبر', since: '2024-05-16', tier: 'ذهبي', orders: 11, spent: 264300, balance: 12600, avatar: null, initials: 'بح', note: 'عقد توريد سنوي — فروع المنطقة الشرقية.' },
    { id: 'C00', name: 'عميل نقدي', type: 'فرد', phone: '—', email: '', city: 'جدة', since: '2026-01-01', tier: 'عادي', orders: 0, spent: 0, balance: 0, avatar: null, initials: 'نق', walkIn: true, note: 'حساب افتراضي لمبيعات الكاش.' },
  ],

  suppliers: [
    { id: 'S01', name: 'مصنع الأثاث الوطني', contact: 'م. فهد العمري', phone: '012 638 4410', city: 'جدة', category: 'كنبات وكراسي', balance: 126400, rating: 4.8, lead: 7, since: 2019 },
    { id: 'S02', name: 'الدار التركية', contact: 'سليم أوزكان', phone: '+90 212 445 88', city: 'إسطنبول', category: 'أطقم جلوس فاخرة', balance: 218900, rating: 4.6, lead: 21, since: 2020 },
    { id: 'S03', name: 'بيوت الشرق', contact: 'أ. هند المطيري', phone: '013 882 1177', city: 'الدمام', category: 'غرف نوم وخشب', balance: 48300, rating: 4.3, lead: 10, since: 2021 },
    { id: 'S04', name: 'مفروشات الرياض', contact: 'أ. سلطان الغامدي', phone: '011 226 8890', city: 'الرياض', category: 'مفروشات وتخزين', balance: 12750, rating: 4.1, lead: 5, since: 2022 },
    { id: 'S05', name: 'أوكا للأثاث المكتبي', contact: 'م. لمى الشهري', phone: '011 405 7712', city: 'الرياض', category: 'أثاث مكتبي وتجاري', balance: 86200, rating: 4.7, lead: 14, since: 2020 },
  ],

  warehouses: [
    { id: 'W1', name: 'المعرض الرئيسي', city: 'جدة', manager: 'خالد رأفت', used: 62, capacity: 100, value: 1842000, shelves: 24, lastCount: 3 },
    { id: 'W2', name: 'فرع الرياض', city: 'الرياض', manager: 'ريم القحطاني', used: 27, capacity: 45, value: 1215000, shelves: 18, lastCount: 8 },
    { id: 'W3', name: 'مستودع الشرقية', city: 'الدمام', manager: 'يوسف العمري', used: 41, capacity: 66, value: 2148000, shelves: 46, lastCount: 5 },
    { id: 'W4', name: 'معرض المدينة', city: 'المدينة', manager: 'أحمد وهبة', used: 22, capacity: 36, value: 640000, shelves: 12, lastCount: 11 },
  ],

  orders: [
    { id: 'SO-1048', customerId: 'C03', offset: 0, status: 'قيد التجهيز', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'ريم القحطاني', items: [{ pid: 'P04', qty: 2 }, { pid: 'P10', qty: 6 }], note: 'تسليم على مرحلتين — الجناح الشرقي أولًا.' },
    { id: 'SO-1047', customerId: 'C01', offset: 0, status: 'مكتمل', channel: 'المعرض', payment: 'مدى', salesperson: 'ريم القحطاني', items: [{ pid: 'P01', qty: 1 }, { pid: 'P11', qty: 2 }], note: '' },
    { id: 'SO-1046', customerId: 'C02', offset: 0, status: 'بانتظار الدفع', channel: 'مباشر', payment: 'آجل', salesperson: 'أحمد وهبة', items: [{ pid: 'P13', qty: 4 }, { pid: 'P08', qty: 4 }], note: 'أمر شراء داخلي رقم 4412.' },
    { id: 'SO-1045', customerId: 'C08', offset: 0, status: 'مكتمل', channel: 'المعرض', payment: 'تابي', salesperson: 'منى صالح', items: [{ pid: 'P15', qty: 1 }, { pid: 'P14', qty: 1 }], note: '' },
    { id: 'SO-1049', customerId: 'C09', offset: 1, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P09', qty: 5 }, { pid: 'P12', qty: 2 }, { pid: 'P08', qty: 4 }], note: 'توريد فرع الخبر — أمر شراء داخلي.' },
    { id: 'SO-1044', customerId: 'C05', offset: 1, status: 'مكتمل', channel: 'المعرض', payment: 'مدى', salesperson: 'ريم القحطاني', items: [{ pid: 'P06', qty: 1 }, { pid: 'P10', qty: 4 }, { pid: 'P11', qty: 3 }], note: '' },
    { id: 'SO-1043', customerId: 'C04', offset: 1, status: 'مكتمل', channel: 'المعرض', payment: 'فيزا', salesperson: 'منى صالح', items: [{ pid: 'P02', qty: 1 }], note: '' },
    { id: 'SO-1042', customerId: 'C07', offset: 1, status: 'ملغي', channel: 'المعرض', payment: 'نقدًا', salesperson: 'ريم القحطاني', items: [{ pid: 'P03', qty: 1 }], note: 'إلغاء بطلب العميل قبل التسليم.' },
    { id: 'SO-1041', customerId: 'C02', offset: 2, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P05', qty: 1 }, { pid: 'P19', qty: 1 }, { pid: 'P08', qty: 2 }], note: '' },
    { id: 'SO-1040', customerId: 'C06', offset: 2, status: 'قيد التجهيز', channel: 'مباشر', payment: 'آجل', salesperson: 'منى صالح', items: [{ pid: 'P07', qty: 1 }], note: 'التسليم بعد تجهيز المصعد.' },
    { id: 'SO-1039', customerId: 'C03', offset: 3, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P12', qty: 2 }, { pid: 'P09', qty: 4 }], note: '' },
    { id: 'SO-1038', customerId: 'C01', offset: 3, status: 'مكتمل', channel: 'المعرض', payment: 'مدى', salesperson: 'ريم القحطاني', items: [{ pid: 'P09', qty: 1 }, { pid: 'P10', qty: 2 }, { pid: 'P13', qty: 1 }], note: '' },
    { id: 'SO-1037', customerId: 'C05', offset: 4, status: 'مكتمل', channel: 'المعرض', payment: 'فيزا', salesperson: 'منى صالح', items: [{ pid: 'P06', qty: 1 }, { pid: 'P01', qty: 1 }, { pid: 'P11', qty: 1 }], note: '' },
    { id: 'SO-1036', customerId: 'C02', offset: 4, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P17', qty: 2 }, { pid: 'P16', qty: 2 }, { pid: 'P10', qty: 8 }], note: '' },
    { id: 'SO-1035', customerId: 'C08', offset: 5, status: 'مكتمل', channel: 'المعرض', payment: 'مدى', salesperson: 'ريم القحطاني', items: [{ pid: 'P01', qty: 1 }], note: '' },
    { id: 'SO-1034', customerId: 'C04', offset: 5, status: 'قيد التجهيز', channel: 'المعرض', payment: 'تابي', salesperson: 'منى صالح', items: [{ pid: 'P19', qty: 1 }], note: '' },
    { id: 'SO-1033', customerId: 'C06', offset: 6, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P13', qty: 2 }, { pid: 'P08', qty: 3 }, { pid: 'P12', qty: 1 }], note: '' },
    { id: 'SO-1032', customerId: 'C07', offset: 6, status: 'بانتظار الدفع', channel: 'المعرض', payment: 'آجل', salesperson: 'ريم القحطاني', items: [{ pid: 'P12', qty: 1 }], note: '' },
    { id: 'SO-1031', customerId: 'C03', offset: 7, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P05', qty: 2 }, { pid: 'P07', qty: 1 }], note: '' },
    { id: 'SO-1030', customerId: 'C01', offset: 9, status: 'مكتمل', channel: 'المعرض', payment: 'مدى', salesperson: 'ريم القحطاني', items: [{ pid: 'P06', qty: 1 }], note: '' },
    { id: 'SO-1029', customerId: 'C02', offset: 11, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P04', qty: 4 }, { pid: 'P19', qty: 2 }, { pid: 'P08', qty: 6 }], note: '' },
    { id: 'SO-1028', customerId: 'C05', offset: 12, status: 'مكتمل', channel: 'المعرض', payment: 'فيزا', salesperson: 'منى صالح', items: [{ pid: 'P15', qty: 1 }], note: '' },
    { id: 'SO-1027', customerId: 'C03', offset: 13, status: 'مكتمل', channel: 'مباشر', payment: 'تحويل بنكي', salesperson: 'أحمد وهبة', items: [{ pid: 'P20', qty: 3 }, { pid: 'P12', qty: 2 }], note: '' },
  ],

  purchaseOrders: [
    { id: 'PO-2026-118', supplierId: 'S01', offset: 2, status: 'مستلم', total: 48200, items: 18, expected: 'تم الاستلام' },
    { id: 'PO-2026-117', supplierId: 'S02', offset: 5, status: 'قيد الشحن', total: 72600, items: 24, expected: '28 أكتوبر' },
    { id: 'PO-2026-116', supplierId: 'S01', offset: 9, status: 'مستلم', total: 31400, items: 12, expected: 'تم الاستلام' },
    { id: 'PO-2026-115', supplierId: 'S03', offset: 1, status: 'مسودة', total: 18900, items: 8, expected: 'بانتظار الاعتماد' },
    { id: 'PO-2026-114', supplierId: 'S04', offset: 14, status: 'مستلم', total: 9750, items: 6, expected: 'تم الاستلام' },
    { id: 'PO-2026-113', supplierId: 'S02', offset: 20, status: 'متأخر', total: 54300, items: 20, expected: 'كان متوقعًا 18 أكتوبر' },
  ],

  tasks: [
    { id: 'T1', title: 'تجهيز طلب فندق دار السلام للتسليم غدًا', meta: 'SO-1048 · 8 قطع', due: 'اليوم 4:00 م', priority: 'عالية', done: false, page: 'sales' },
    { id: 'T2', title: 'متابعة عرض سعر تجهيز أجنحة الفندق', meta: 'C03 · 46,000 ر.س', due: 'اليوم 6:30 م', priority: 'عالية', done: false, page: 'customers' },
    { id: 'T3', title: 'جرد ركن غرف النوم في مستودع الشرقية', meta: 'W3 · 24 صنفًا', due: 'غدًا 11:00 ص', priority: 'عادية', done: false, page: 'warehouses' },
    { id: 'T4', title: 'اعتماد أمر الشراء PO-2026-115', meta: 'بيوت الشرق · 18,900 ر.س', due: 'اليوم', priority: 'عادية', done: false, page: 'purchases' },
    { id: 'T5', title: 'إرسال فاتورة INV-2026-1050 للعميل', meta: 'شركة الفخامة · آجل 30 يومًا', due: 'أمس', priority: 'متأخرة', done: true, page: 'invoices' },
  ],

  activity: [
    { userId: 'u4', action: 'أنشأت طلب بيع', target: 'SO-1048', targetPage: 'sales', meta: 'فندق دار السلام · 16,520 ر.س', time: 'اليوم 10:42 ص' },
    { userId: 'u3', action: 'استلم شحنة من', target: 'مصنع الأثاث الوطني', targetPage: 'purchases', meta: '18 صنفًا · مستودع الشرقية', time: 'اليوم 9:58 ص' },
    { userId: 'u2', action: 'سجّلت دفعة على', target: 'INV-2026-1051', targetPage: 'invoices', meta: 'سارة العتيبي · 5,630 ر.س', time: 'اليوم 9:30 ص' },
    { userId: 'u1', action: 'عدّل سعر', target: 'طقم جلوس نُور', targetPage: 'inventory', meta: 'من 7,900 إلى 7,450 ر.س', time: 'أمس 7:12 م' },
    { userId: 'u4', action: 'أضافت عميلة جديدة', target: 'مريم الزهراني', targetPage: 'customers', meta: 'جدة · عميلة جديدة', time: 'أمس 5:44 م' },
  ],

  notifications: [
    { title: 'فاتورتان متأخرتان', body: 'إجمالي 9,640 ر.س — يحتاج متابعة تحصيل.', page: 'invoices', tone: 'warning' },
    { title: 'نفد مخزون «كنبة ركنة ظل»', body: 'آخر قطعة بيعت من فرع الرياض.', page: 'inventory', tone: 'danger' },
    { title: 'شحنة الدار التركية في الطريق', body: '24 قطعة — الوصول المتوقع 28 أكتوبر.', page: 'purchases', tone: 'info' },
    { title: 'تقرير الأسبوع جاهز', body: 'نمو المبيعات 12.4% مقارنة بالأسبوع الماضي.', page: 'reports', tone: 'success' },
  ],

  monthly: [
    { label: 'يناير', sales: 318000, orders: 62 },
    { label: 'فبراير', sales: 342000, orders: 68 },
    { label: 'مارس', sales: 401000, orders: 74 },
    { label: 'أبريل', sales: 376000, orders: 71 },
    { label: 'مايو', sales: 424000, orders: 79 },
    { label: 'يونيو', sales: 398000, orders: 73 },
    { label: 'يوليو', sales: 452000, orders: 83 },
    { label: 'أغسطس', sales: 471000, orders: 87 },
    { label: 'سبتمبر', sales: 436000, orders: 81 },
    { label: 'أكتوبر', sales: 486000, orders: 92 },
  ],

  categoryShare: [
    { label: 'أطقم جلوس', value: 34 },
    { label: 'غرف نوم', value: 24 },
    { label: 'كنبات', value: 17 },
    { label: 'طاولات وكراسي', value: 15 },
    { label: 'مكاتب وتجاري', value: 10 },
  ],

  branches: [
    { name: 'المعرض الرئيسي — جدة', value: 186, target: 220 },
    { name: 'فرع الرياض', value: 142, target: 180 },
    { name: 'معرض المدينة', value: 98, target: 140 },
    { name: 'مستودع الشرقية (توريد)', value: 74, target: 120 },
  ],
};

/* ---------- أدوات مساعدة ---------- */

const MONTHS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const WEEKDAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const WEEKDAYS_SHORT = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

function isoOffset(n) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

function parseISO(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, 12);
}

function dateLabel(iso) {
  const d = parseISO(iso);
  return `${d.getDate()} ${MONTHS_AR[d.getMonth()]} ${d.getFullYear()}`;
}

function shortDate(iso) {
  const d = parseISO(iso);
  return `${d.getDate()} ${MONTHS_AR[d.getMonth()]}`;
}

function relativeDay(iso) {
  if (iso === isoOffset(0)) return 'اليوم';
  if (iso === isoOffset(1)) return 'أمس';
  return shortDate(iso);
}

function fmt(n) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Math.round(n || 0));
}

function fmt2(n) {
  const v = Math.round((n || 0) * 100) / 100;
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: v % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(v);
}

function money(n) {
  return `${fmt(n)} <span class="cur">ر.س</span>`;
}

function moneyPlain(n) {
  return `${fmt(n)} ر.س`;
}

function pct(n, digits = 1) {
  return `${n.toFixed(digits)}%`;
}

function productById(id) {
  return DB.products.find(p => p.id === id);
}

function customerById(id) {
  return DB.customers.find(c => c.id === id);
}

function supplierById(id) {
  return DB.suppliers.find(s => s.id === id);
}

function teamById(id) {
  return DB.team.find(t => t.id === id);
}

function orderItems(order) {
  return order.items.map(it => {
    const p = productById(it.pid);
    return { ...it, product: p, total: p.price * it.qty };
  });
}

function orderTotal(order) {
  return orderItems(order).reduce((s, it) => s + it.total, 0);
}

function orderCount(order) {
  return order.items.reduce((s, it) => s + it.qty, 0);
}

function orderDate(order) {
  return isoOffset(order.offset);
}

function orderNet(order) {
  const total = orderTotal(order);
  return Math.round(total / (1 + DB.store.vatRate / 100));
}

function vatOf(total) {
  return Math.round(total - total / (1 + DB.store.vatRate / 100));
}

function invoices() {
  return DB.orders
    .filter(o => o.status !== 'ملغي')
    .map((o, i) => {
      let status = 'مدفوعة';
      if (o.payment === 'آجل') status = o.status === 'بانتظار الدفع' ? 'متأخرة' : 'جزئية';
      if (o.status === 'قيد التجهيز' && o.payment === 'آجل') status = 'جزئية';
      const total = orderTotal(o);
      const dueStatus = o.payment === 'آجل' && o.status === 'بانتظار الدفع' ? 'متأخرة' : '';
      return {
        id: `${DB.store.invoicePrefix}${String(Number(o.id.split('-')[1]) + 4).padStart(4, '0')}`,
        orderId: o.id,
        customerId: o.customerId,
        issued: isoOffset(o.offset),
        due: isoOffset(dueStatus === 'متأخرة' ? o.offset + 4 : o.offset - 30),
        status,
        total,
        paid: status === 'مدفوعة' ? total : status === 'متأخرة' ? 0 : Math.round(total * 0.4),
        payment: o.payment,
        items: orderItems(o),
      };
    });
}

function invoiceById(id) {
  return invoices().find(inv => inv.id === id);
}

function invoiceForOrder(orderId) {
  return invoices().find(inv => inv.orderId === orderId);
}

function isToday(offset) {
  return offset === 0;
}

function todayOrders() {
  return DB.orders.filter(o => o.offset === 0 && o.status !== 'ملغي');
}

function kpis() {
  const today = todayOrders();
  const sales = today.reduce((s, o) => s + orderTotal(o), 0);
  const profit = today.reduce((s, o) => s + orderItems(o).reduce((a, it) => a + (it.product.price - it.product.cost) * it.qty, 0), 0);
  const count = today.length;
  const avg = count ? sales / count : 0;
  const pending = DB.orders.filter(o => o.status === 'قيد التجهيز').length;
  return { sales, profit, count, avg, pending };
}

function salesSeries(days = 7) {
  const rows = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = parseISO(isoOffset(i));
    const total = DB.orders
      .filter(o => o.offset === i && o.status !== 'ملغي')
      .reduce((s, o) => s + orderTotal(o), 0);
    rows.push({
      offset: i,
      label: days <= 7 ? WEEKDAYS_SHORT[d.getDay()] : `${d.getDate()} ${MONTHS_AR[d.getMonth()].slice(0, 3)}`,
      full: WEEKDAYS_AR[d.getDay()],
      value: total,
      today: i === 0,
    });
  }
  return rows;
}

function topProducts(limit = 5) {
  return [...DB.products].sort((a, b) => b.sold - a.sold).slice(0, limit);
}

function lowStock() {
  return DB.products.filter(p => p.stock <= p.reorder);
}

function stockTone(p) {
  if (p.stock === 0) return { label: 'نفد المخزون', tone: 'danger' };
  if (p.stock <= p.reorder) return { label: 'منخفض', tone: 'warning' };
  return { label: 'متوفر', tone: 'success' };
}

const STATUS_TONE = {
  'مكتمل': 'success',
  'مدفوعة': 'success',
  'مستلم': 'success',
  'قيد التجهيز': 'info',
  'قيد الشحن': 'info',
  'بانتظار الدفع': 'warning',
  'جزئية': 'warning',
  'مسودة': 'neutral',
  'ملغي': 'neutral',
  'متأخرة': 'danger',
  'متأخر': 'danger',
  'عالية': 'danger',
  'عادية': 'neutral',
  'متأخرة ': 'danger',
};

function toneOf(label) {
  return STATUS_TONE[label] || 'neutral';
}

function statusPill(label, extra = '') {
  return `<span class="pill pill-${toneOf(label)} ${extra}"><span class="dot"></span>${label}</span>`;
}

function categorySales(total) {
  const basis = total || DB.monthly[DB.monthly.length - 1].sales;
  return DB.categoryShare.map((c, i) => ({
    ...c,
    amount: Math.round(basis * c.value / 100),
    color: `var(--chart-${i + 1})`,
  }));
}

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('');
}

/* الحالة القابلة للتعديل داخل الديمو */
const STATE = {
  cart: [],
  posCustomer: null,
  customerId: 'C01',
  invoiceId: null,
  inventory: { query: '', cat: 'الكل', status: 'الكل', sort: 'name', dir: 1, page: 1, per: 8 },
  sales: { tab: 'الكل', query: '' },
  invoiceTab: 'الكل',
  purchasesTab: 'orders',
  reportRange: '12m',
  settingsTab: 'store',
  sidebarCollapsed: false,
};
