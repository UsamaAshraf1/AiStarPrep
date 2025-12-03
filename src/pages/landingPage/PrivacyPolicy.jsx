import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="absolute w-full top-5 z-50">
        <div className="flex items-center justify-between px-5 md:px-10">
          <button
            onClick={() => navigate(-1)}
            className="text-[#0072CF] flex items-center"
          >
            <FaArrowLeft className="mr-2" />
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
            Privacy Policy for AiStarPrep
          </h1>
          <p className="mt-4 text-center text-gray-600">
            Effective Date: February 26, 2024
          </p>
          <p className="mt-6 text-center text-gray-600">
            At AiStarPrep, your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your personal data when
            you access or use the AiStarPrep platform ("Platform"). By using the
            Platform, you agree to the practices described in this policy.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section 1: Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              1. Information We Collect
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Personal Information
                </h3>
                <p>
                  Full Name, Email Address, Password, and optional referral
                  codes during registration.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Usage Data</h3>
                <p>
                  Metrics related to platform activities, including learning
                  progress, preferences, and analytics.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Payment Information
                </h3>
                <p>
                  Collected securely via third-party payment processors like
                  Stripe.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Technical Data</h3>
                <p>
                  Device information, IP addresses, and browser types for
                  security and analytics.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              2. How We Use Your Information
            </h2>
            <ul className="mt-6 list-inside list-disc space-y-3 text-gray-600">
              <li>
                <span className="font-semibold">Platform Operations:</span> To
                provide and enhance learning experiences.
              </li>
              <li>
                <span className="font-semibold">Personalization:</span>{" "}
                AI-generated insights and tailored question sets.
              </li>
              <li>
                <span className="font-semibold">Customer Support:</span> To
                respond to queries and troubleshoot issues.
              </li>
              <li>
                <span className="font-semibold">Compliance and Security:</span>{" "}
                Ensuring legal and operational compliance.
              </li>
              <li>
                <span className="font-semibold">Marketing:</span> Sending
                promotional materials (opt-out available).
              </li>
            </ul>
          </section>

          {/* Section 3: Data Sharing Policies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Data Sharing Policies
            </h2>
            <p className="mt-6 text-gray-600">
              We do not sell or share your data with third parties, except as
              required for:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-3 text-gray-600">
              <li>
                <span className="font-semibold">Service Providers:</span>{" "}
                Payment processing, hosting, and AI services.
              </li>
              <li>
                <span className="font-semibold">Legal Compliance:</span>{" "}
                Responding to lawful requests from authorities.
              </li>
              <li>
                <span className="font-semibold">Business Transfers:</span> In
                the event of mergers or acquisitions.
              </li>
            </ul>
          </section>

          {/* Section 4: Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Data Retention
            </h2>
            <ul className="mt-6 list-inside list-disc space-y-3 text-gray-600">
              <li>
                <span className="font-semibold">Account Information:</span>{" "}
                Retained for as long as your account is active.
              </li>
              <li>
                <span className="font-semibold">Usage Data:</span> Retained for
                analytics and operational purposes.
              </li>
              <li>
                <span className="font-semibold">Deleted Accounts:</span>{" "}
                Personal data is permanently deleted within 30 days.
              </li>
            </ul>
          </section>

          {/* Section 5: Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">5. Your Rights</h2>
            <p className="mt-6 text-gray-600">
              Under applicable laws, you have rights including:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-3 text-gray-600">
              <li>
                <span className="font-semibold">Access and Portability:</span>{" "}
                Request access to or a copy of your data.
              </li>
              <li>
                <span className="font-semibold">Correction:</span> Rectify
                inaccurate personal information.
              </li>
              <li>
                <span className="font-semibold">Deletion:</span> Request
                permanent deletion of your data.
              </li>
              <li>
                <span className="font-semibold">Data Restrictions:</span> Limit
                certain data uses under specific circumstances.
              </li>
            </ul>
            <p className="mt-4 text-gray-600">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:info@aistarprep.com"
                className="text-blue-600 hover:underline"
              >
                info@aistarprep.com
              </a>
              .
            </p>
          </section>

          {/* Section 6: Security Measures */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Security Measures
            </h2>
            <p className="mt-6 text-gray-600">
              We employ industry-standard measures such as:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-3 text-gray-600">
              <li>
                <span className="font-semibold">Encryption:</span> For data in
                transit and at rest.
              </li>
              <li>
                <span className="font-semibold">Access Controls:</span>{" "}
                Restricted access to sensitive data.
              </li>
              <li>
                <span className="font-semibold">Monitoring:</span> Regular
                system audits to identify vulnerabilities.
              </li>
            </ul>
          </section>

          {/* Section 7: Third-Party Integrations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Third-Party Integrations
            </h2>
            <ul className="mt-6 list-inside list-disc space-y-3 text-gray-600">
              <li>
                <span className="font-semibold">OpenAI API:</span> For
                AI-powered features.
              </li>
              <li>
                <span className="font-semibold">Stripe:</span> For secure
                payment processing.
              </li>
              <li>
                <span className="font-semibold">Hosting Services:</span> AWS and
                Vercel for scalable infrastructure.
              </li>
            </ul>
          </section>

          {/* Section 8: International Users */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              8. International Users
            </h2>
            <p className="mt-6 text-gray-600">
              If you access the Platform from outside the United States, you
              consent to data transfer and processing in the United States,
              which may have different data protection laws.
            </p>
          </section>

          {/* Section 9: Policy Updates */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              9. Policy Updates
            </h2>
            <p className="mt-6 text-gray-600">
              We may update this Privacy Policy periodically. Notifications of
              significant changes will be provided via email or the Platform.
            </p>
          </section>

          {/* Section 10: Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">10. Contact Us</h2>
            <p className="mt-6 text-gray-600">
              For questions or concerns about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:info@aistarprep.com"
                className="text-blue-600 hover:underline"
              >
                info@aistarprep.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 py-8 text-center text-sm text-gray-600">
          <p>Last updated: February 26, 2024</p>
          <p className="mt-2">
            © {new Date().getFullYear()} AiStarPrep. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
