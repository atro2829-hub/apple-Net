import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الخدمة - Apple.NET",
  description: "شروط استخدام خدمة Apple.NET لإدارة الهوت سبوت. يرجى قراءة هذه الشروط بعناية قبل استخدام التطبيق.",
  robots: "index, follow",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="bg-gradient-to-l from-[#1B7A3D] to-[#22A24D] text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black mb-2">شروط الخدمة</h1>
          <p className="text-white/80 text-sm">آخر تحديث: يونيو ٢٠٢٦</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-8 text-gray-800 leading-relaxed">
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">📄</span>
            مقدمة
          </h2>
          <p className="text-gray-600 mb-3">
            مرحبًا بك في Apple.NET. تطبيقنا يوفر خدمات إدارة الهوت سبوت وبيع كروت الإنترنت وإدارة الرصيد. باستخدامك لهذا التطبيق، فإنك توافق على الالتزام بشروط الخدمة التالية.
          </p>
          <p className="text-gray-600">
            يرجى قراءة هذه الشروط بعناية قبل استخدام التطبيق. إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام التطبيق.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">✅</span>
            قبول الشروط
          </h2>
          <p className="text-gray-600">
            بإنشاء حساب أو استخدام التطبيق، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بهذه الشروط. إذا كنت تستخدم التطبيق نيابة عن مؤسسة، فإنك تقر بأنك مخول بالموافقة على هذه الشروط نيابة عنها.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🌐</span>
            وصف الخدمة
          </h2>
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">شراء كروت الإنترنت</p>
                <p className="text-gray-600 text-sm">شراء كروت هوت سبوت بفئات مختلفة تناسب احتياجاتك من البيانات والمدة الزمنية.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">إدارة الرصيد</p>
                <p className="text-gray-600 text-sm">إيداع الرصيد في حسابك ومتابعة رصيدك الحالي وسجل المعاملات.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">خدمات Starlink</p>
                <p className="text-gray-600 text-sm">الاستفادة من خدمات الإنترنت عبر الأقمار الصناعية حيثما تتوفر.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-[#1B7A3D] font-bold mt-0.5">•</span>
              <div>
                <p className="font-semibold text-gray-800">تقديم طلبات الشبكة</p>
                <p className="text-gray-600 text-sm">تقديم طلب لإنشاء شبكة هوت سبوت جديدة في منطقتك.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">👤</span>
            حساب المستخدم
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> يجب أن تكون bilgilerك صحيحة ودقيقة عند التسجيل</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> أنت مسؤول عن الحفاظ على سرية بيانات حسابك</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> يجب إبلاغنا فورًا عن أي استخدام غير مصرح به لحسابك</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> يُحظر إنشاء أكثر من حساب واحد دون إذن مسبق</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> يحق لنا تعليق أو إغلاق أي حساب يخالف هذه الشروط</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">💳</span>
            المدفوعات والرصيد
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> جميع الأسعار معروضة بالريال اليمني وهي شاملة الضريبة</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> الرصيد غير قابل للتحويل إلى حساب آخر إلا بإذن الإدارة</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> الكروت المشتراة غير قابلة للاسترداد بعد تفعيلها</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> يتم تأكيد عمليات الإيداع يدويًا من قبل الإدارة</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> يحق لنا تعديل الأسعار مع إشعار مسبق</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🚫</span>
            الاستخدام المحظور
          </h2>
          <p className="text-gray-600 mb-3">يُحظر عليك استخدام التطبيق للأغراض التالية:</p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-red-500">✗</span> أي نشاط غير قانوني أو احتيالي</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> محاولة الوصول غير المصرح به إلى أنظمة أو حسابات أخرى</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> إساءة استخدام خدمة العملاء أو إنشاء طلبات وهمية</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> نشر محتوى ضار أو مسيء أو مضايق</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> محاولة التلاعب بالرصيد أو النظام</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> استخدام حسابات متعددة للاستفادة من عروض محدودة</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> إعادة بيع الخدمة دون إذن كتابي</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">⚡</span>
            حدود المسؤولية
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> التطبيق مقدمة &quot;كما هو&quot; دون ضمانات صريحة أو ضمنية</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> لا نضمن استمرارية الخدمة دون انقطاع</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> لا نكون مسؤولين عن الأضرار غير المباشرة أو العرضية</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> مسؤوليتنا الإجمالية لا تتجاوز المبلغ الذي دفعته لنا خلال ٣٠ يومًا السابقة</li>
            <li className="flex gap-2"><span className="text-[#1B7A3D]">✓</span> لا نكون مسؤولين عن انقطاع الخدمة بسبب ظروف خارجة عن إرادتنا</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🔄</span>
            التعديلات والتحديثات
          </h2>
          <p className="text-gray-600">
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سنبلغ المستخدمين بالتغييرات الجوهرية عبر إشعار داخل التطبيق قبل ٧ أيام على الأقل من تفعيلها. استمرارك في استخدام التطبيق بعد التعديل يعني موافقتك على الشروط الجديدة.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">🚪</span>
            إنهاء الخدمة
          </h2>
          <p className="text-gray-600 mb-3">
            يحق لك حذف حسابك في أي وقت عبر التواصل مع الدعم. كما يحق لنا تعليق أو إنهاء حسابك في الحالات التالية:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex gap-2"><span className="text-red-500">✗</span> مخالفة هذه الشروط</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> نشاط احتيالي أو مشبوه</li>
            <li className="flex gap-2"><span className="text-red-500">✗</span> عدم استخدام الحساب لمدة تزيد عن ١٢ شهرًا</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">⚖️</span>
            القانون الحاكم
          </h2>
          <p className="text-gray-600">
            تخضع هذه الشروط وتفسر وفقًا لقوانين الجمهورية اليمنية. أي نزاع ينشأ عن هذه الشروط أو استخدام التطبيق يخضع لل اختصاص القضائي الحصري للمحاكم اليمنية المختصة.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-[#1B7A3D] mb-3 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#E8F5E9] flex items-center justify-center text-sm">📞</span>
            التواصل
          </h2>
          <div className="bg-[#E8F5E9] rounded-2xl p-4">
            <p className="text-gray-700 mb-2">لأي استفسارات حول شروط الخدمة:</p>
            <ul className="space-y-1 text-gray-600">
              <li className="flex gap-2"><span className="text-[#1B7A3D]">📧</span> البريد الإلكتروني: support@applenet.com</li>
              <li className="flex gap-2"><span className="text-[#1B7A3D]">📱</span> واتساب: 967774146432+</li>
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
