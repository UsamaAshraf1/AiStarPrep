import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
  const navigate = useNavigate()
  return (
    <div className="relavtive min-h-screen bg-white">
      {/* Header */}
      <div className="absolute w-full top-5 z-50">
        <div className="flex items-center justify-between px-5 md:px-10">
          <button
            onClick={() => navigate('/')}
            className="text-[#0072CF] flex items-center"
          >
            <FaArrowLeft className="mr-2" />
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-bold tracking-tight text-blue-600 sm:text-5xl">
            Terms and Conditions for AiStarPrep
          </h1>
          <p className="mt-4 text-center text-gray-600">
            Effective Date: February 26, 2024
          </p>
          <p className="mt-6 text-center text-gray-600">
            Welcome to AiStarPrep! These Terms and Conditions ("Terms") govern
            your use of the AiStarPrep platform ("Platform"), a service provided
            by AiStarPrep. By accessing or using the Platform, you agree to
            comply with and be bound by these Terms. If you do not agree, you
            must not use the Platform.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Section 1: Definitions */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">1. Definitions</h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">Platform</h3>
                <p>
                  Refers to AiStarPrep and its associated web and mobile
                  applications.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">User</h3>
                <p>
                  Any individual who registers, accesses, or uses the Platform.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Administrator</h3>
                <p>
                  Individuals authorized by AiStarPrep to manage and oversee
                  Platform operations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Subscription Plan
                </h3>
                <p>
                  The paid or free plans Users can select for Platform access.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              2. User Responsibilities
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Account Registration
                </h3>
                <p>
                  Users must provide accurate information during registration
                  and maintain the confidentiality of their login credentials.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Prohibited Activities
                </h3>
                <p>Users agree not to:</p>
                <ul className="mt-2 list-inside list-disc space-y-2">
                  <li>
                    Engage in unauthorized access, reverse engineering, or data
                    scraping.
                  </li>
                  <li>
                    Use the Platform for illegal purposes or infringe on
                    intellectual property rights.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Data Accuracy</h3>
                <p>
                  Users are responsible for ensuring all submitted data is
                  accurate and updated.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Platform Usage Policies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              3. Platform Usage Policies
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Learn and Exam Modes
                </h3>
                <p>
                  Users may access AI-driven content for educational purposes
                  only.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Content Uploads</h3>
                <p>
                  Users must not upload or share content that violates any
                  third-party rights.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  System Integrity
                </h3>
                <p>Users must not disrupt the Platform’s operations.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Subscription Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              4. Subscription Terms
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">Plans and Fees</h3>
                <p>
                  Users can select from available subscription plans. Fees are
                  displayed during checkout.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Renewal and Cancellation
                </h3>
                <p>
                  Subscriptions renew automatically unless canceled before the
                  renewal date. Cancellations can be processed via the
                  Subscription Management Screen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Refunds</h3>
                <p>
                  Refunds are subject to AiStarPrep’s discretion and must comply
                  with stated policies.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              5. Intellectual Property
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">Ownership</h3>
                <p>
                  All content, AI-generated materials, and design elements are
                  the exclusive property of AiStarPrep.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">User Content</h3>
                <p>
                  Users retain ownership of content they upload but grant
                  AiStarPrep a license to use it for operational purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Account Suspension and Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              6. Account Suspension and Termination
            </h2>
            <div className="mt-6 space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">Suspension</h3>
                <p>Accounts may be suspended for violations of these Terms.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Termination</h3>
                <p>
                  Repeated violations may result in permanent account
                  termination.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7: Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              7. Limitation of Liability
            </h2>
            <p className="mt-6 text-gray-600">AiStarPrep is not liable for:</p>
            <ul className="mt-4 list-inside list-disc space-y-3 text-gray-600">
              <li>User errors or misuse of the Platform.</li>
              <li>Loss of data due to external factors.</li>
              <li>
                Service interruptions caused by maintenance or unforeseen
                events.
              </li>
            </ul>
          </section>

          {/* Section 8: Modifications to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">
              8. Modifications to Terms
            </h2>
            <p className="mt-6 text-gray-600">
              AiStarPrep reserves the right to update these Terms. Users will be
              notified of significant changes via email or Platform
              notifications.
            </p>
          </section>

          {/* Section 9: Contact Us */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900">9. Contact Us</h2>
            <p className="mt-6 text-gray-600">
              For questions or concerns about these Terms, contact us at{" "}
              <a
                href="mailto:support@aistarprep.com"
                className="text-blue-600 hover:underline"
              >
                support@aistarprep.com
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
