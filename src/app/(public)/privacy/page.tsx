import React from 'react';
import { ShieldCheck, Heart, Lock, Eye } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="text-center space-y-3 border-b border-gray-200 pb-8">
        <span className="bg-brand-green-100 text-brand-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
          Ethics & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-green-900">
          Privacy Policy & Ethical Principles
        </h1>
        <p className="text-xs text-gray-500 font-light">
          Last updated: August 2026 • Rescue Foundation Ghana
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 space-y-6 text-xs text-gray-700 leading-relaxed font-light">
        
        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-brand-green-900 flex items-center space-x-2">
            <Heart className="w-4 h-4 text-amber-500" />
            <span>1. Ethical Beneficiary Protection & Responsible Photography</span>
          </h2>
          <p>
            Because Rescue Foundation Ghana works closely with vulnerable children, orphans, widows, and low-income families in rural communities, we strictly adhere to ethical photography and storytelling guidelines. We never display beneficiaries in degrading, exploitative, or sensationalized ways. Informed consent is obtained from guardians and community leaders prior to capturing or publishing media.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-brand-green-900 flex items-center space-x-2">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>2. Donor Data Confidentiality</span>
          </h2>
          <p>
            We collect personal information such as name, email address, phone number, and donation choices strictly to process contributions, generate receipts, and provide updates. We do NOT sell, rent, or trade donor information to any third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-brand-green-900 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>3. Payment Gateway Security</span>
          </h2>
          <p>
            Financial transactions (Mobile Money and Card payments) are processed through secure, PCI-DSS compliant Ghanaian payment channels such as Paystack. Secret credentials and financial keys are never stored on client-side software.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold font-heading text-brand-green-900 flex items-center space-x-2">
            <Eye className="w-4 h-4 text-amber-500" />
            <span>4. Contact Information</span>
          </h2>
          <p>
            For any privacy inquiries or request for data removal, please contact our privacy officer at info@rescuefoundationghana.org or via our Tamale headquarters.
          </p>
        </section>

      </div>

    </div>
  );
}
