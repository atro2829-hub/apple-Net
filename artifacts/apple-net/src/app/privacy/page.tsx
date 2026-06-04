import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية - Apple.NET",
  description: "سياسة الخصوصية لتطبيق Apple.NET لإدارة الهوت سبوت. تعرف على كيفية حماية بياناتك ومعلوماتك الشخصية.",
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-l from-[#1B7A3D] to-[#22A24D] text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black mb-2">سياسة الخصوصية</h1>
          <p className="text-white/80 text-sm">آخر تحديث: يونيو ٢٠٢٦</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🔒</span>
            مقدمة
          </h2>
          <p className="text-gray-600 mb-3">
            نحن في Apple.NET نولي أهمية قصوى لحماية خصوصيتك وبياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية المعلومات التي تقدمها عند استخدام تطبيقنا.
          </p>
          <p className="text-gray-600">
            باستخدامك لتطبيق Apple.NET، فإنك توافق على الممارسات الموضحة في هذه السياسة. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام التطبيق.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">📋</span>
            المعلومات التي نجمعها
          </h2>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">معلومات الحساب</p>
                <p className="text-gray-600 text-sm">البريد الإلكتروني، اسم المستخدم، ورقم الهاتف (اختياري) عند إنشاء حساب جديد.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">بيانات المعاملات</p>
                <p className="text-gray-600 text-sm">سجل شراء الكروت، عمليات الإيداع، وتاريخ الرصيد. هذه البيانات ضرورية لتقديم الخدمة.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">معلومات الجهاز</p>
                <p className="text-gray-600 text-sm">نوع الجهاز، نظام التشغيل، وإصدار التطبيق لأغراض تحسين الأداء وتجربة المستخدم.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">بيانات الموقع</p>
                <p className="text-gray-600 text-sm">المحافظة والمديرية التي تحددها لعرض الشبكات المتاحة في منطقتك.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🎯</span>
            كيف نستخدم معلوماتك
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> تقديم خدمات الهوت سبوت وإدارة الحساب</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> معالجة عمليات شراء الكروت والإيداع</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> إرسال إشعارات مهمة حول حسابك ومعاملاتك</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> تحسين أداء التطبيق وتجربة المستخدم</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> منع الاحتيال وحماية الأمان</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> التواصل معك بشأن تحديثات الخدمة</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🛡️</span>
            حماية بياناتك
          </h2>
          <p className="text-gray-600 mb-3">
            نتخذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفشاء أو الإتلاف، بما في ذلك:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> تشفير البيانات أثناء النقل باستخدام بروتوكولات SSL/TLS</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> تخزين البيانات على خوادم Firebase الآمنة من Google</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> مصادقة آمنة باستخدام Firebase Authentication</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> فحص دوري لأنظمة الأمان</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> تقييد وصول الموظفين إلى البيانات الشخصية</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🔗</span>
            مشاركة المعلومات مع أطراف ثالثة
          </h2>
          <p className="text-gray-600 mb-3">
            لا نبيع أو نؤجر أو نتاجر بمعلوماتك الشخصية. قد نشارك معلوماتك فقط في الحالات التالية:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> مع مقدمي الخدمات الذين يساعدوننا في تشغيل التطبيق (مثل Firebase/Google)</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> عند الطلب القانوني من الجهات المختصة</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> لحماية حقوقنا أو سلامة المستخدمين</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> بموافقتك الصريحة</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">📱</span>
            الإشعارات
          </h2>
          <p className="text-gray-600">
            قد نرسل إشعارات لدفعية لإعلامك بتحديثات مهمة مثل: تأكيد الشراء، تحديثات الرصيد، أو إشعارات أمنية. يمكنك إدارة تفضيلات الإشعارات من إعدادات التطبيق أو إعدادات جهازك.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🍪</span>
            ملفات تعريف الارتباط والتتبع
          </h2>
          <p className="text-gray-600">
            نستخدم تقنيات التخزين المحلي (localStorage) لحفظ تفضيلاتك وحالة تسجيل الدخول. لا نستخدم ملفات تعريف ارتباط تتبع من أطراف ثالثة. يتم تخزين جميع البيانات محليًا على جهازك فقط.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">👤</span>
            حقوقك
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> حق الوصول إلى بياناتك الشخصية</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> حق تصحيح البيانات غير الدقيقة</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> حق حذف حسابك وبياناتك</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> حق الاعتراض على معالجة بياناتك</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> حق نقل بياناتك</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">👶</span>
            خصوصية الأطفال
          </h2>
          <p className="text-gray-600">
            التطبيق غير موجه للأطفال دون سن ١٣ عامًا. لا نجمع عمدًا معلومات شخصية من الأطفال. إذا اكتشفنا أن طفلاً دون ١٣ عامًا قدم معلومات شخصية، فسنحذف هذه المعلومات فورًا.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">📝</span>
            التعديلات على السياسة
          </h2>
          <p className="text-gray-600">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنبلغك بأي تغييرات جوهرية عبر إشعار داخل التطبيق أو عبر البريد الإلكتروني. استمرارك في استخدام التطبيق بعد نشر التغييرات يعني موافقتك على السياسة المحدثة.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">📞</span>
            التواصل معنا
          </h2>
          <div className="bg-[#E8F5E9] rounded-2xl p-4">
            <p className="text-gray-700 mb-2">إذا كانت لديك أي أسئلة أو استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا:</p>
            <ul className="space-y-1 text-gray-600">
              <li className="flex gap-2"><span className="text-[#1B7A3D]">📧</span> عبر البريد الإلكتروني: support@applenet.com</li>
              <li className="flex gap-2"><span className="text-[#1B7A3D]">📱</span> عبر واتساب: 967774146432+</li>
            </ul>
          </div>
        </section>

        {/* Back link */}
        <div className="text-center py-6 border-t border-gray-100">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-[#1B7A3D] font-bold hover:underline"
          >
            ← العودة إلى التطبيق
          </a>
        </div>
      </main>
    </div>
  );
}
