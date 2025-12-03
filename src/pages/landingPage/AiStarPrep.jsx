import React, { useState } from "react";
import { FaBolt, FaGraduationCap } from "react-icons/fa";
import { FcDocument } from "react-icons/fc";
import { LuStar, LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How does AiStar Prep generate questions?",
    answer:
      "Our AI analyzes 10 years of real past exam papers, marking schemes, examiner reports and syllabus guidelines to create practice questions that mirror the actual exams.",
  },
  {
    question: "Is this app suitable for all O & A Level subjects?",
    answer:
      "Yes! AiStar Prep covers the top 10 O & A Level subjects, ensuring you get targeted practice.",
  },
  {
    question: "How long is the free trial?",
    answer:
      "We’re offering limited-time free access so you can experience the benefits firsthand.",
  },
  {
    question: "How much does a monthly subscription cost?",
    answer:
      "The monthly subscription will be available at $10 per subject, with every 4th subject free! And you can earn discount vouchers for each friend you refer to our platform.",
  },
  {
    question: "Is this better than using past papers?",
    answer:
      "Yes! While past papers are useful, AiStar Prep goes a step further by:\n✅ Generating new, exam-style questions based on patterns from past papers\n✅ Providing instant AI feedback so you know exactly where you need to improve\n✅ Helping you master concepts rather than just memorizing past answers",
  },
  {
    question: "How is AI feedback useful?",
    answer:
      "Our AI doesn’t just tell you if you’re right or wrong—it analyzes your answers, highlights mistakes, and gives step-by-step explanations to help you improve.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Yes! AiStar Prep provides performance tracking, so you can monitor your strengths, weaknesses, and improvements over time.",
  },
];

function AiStarPrep() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <div className="min-h-screen min-w-screen">
      {/* Header */}

      {/* Hero Section */}
      <section className="bg-[#E8F6FF]">
        <nav className="container mx-auto px-4 lg:px-10 py-6 flex justify-between items-center">
          <div className="w-12 md:w-32">
            <img
              src="/AiStar.png"
              alt="AI Star Prep Logo"
              className="object-contain w-full"
            />
          </div>
          <div className="flex gap-2 md:gap-4">
            <a
              href="/auth/signup" >
              <button
                className="bg-[#0077ff] text-white px-3 md:px-6 py-2.5 rounded-full hover:bg-[#0066dd] transition-colors"
              >
                Get Started
              </button>
            </a>
            <a
              href="/auth/signin" >
              <button
                className="border-2 border-[#0077ff] text-[#0077ff] px-3 md:px-6 py-2 rounded-full hover:bg-[#0077ff] hover:text-white transition-colors"
              >
                Sign In
              </button>
            </a>
          </div>
        </nav>

        <div className="container mx-auto px-4 lg:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center mx-4">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                🚀 Ace Your O & A Level Exams with AI-Powered Practice
                {/* <span className="block">AI Star Prep</span> */}
              </h1>
              <p className="text-[#313131] text-base md:text-lg">
                Welcome to AiStar Prep—the AI-powered tool that revolutionizes O
                & A Level exam prep. Whether you’re brushing up on tough topics
                or simulating exam conditions, we’ve got you covered. Get smart
                question generation, real-time feedback, and detailed analytics
                to master every topic and ace your exams with confidence!
              </p>
              <a href='/auth/signup'>
                <button className="px-6 py-3 bg-[#0072CF] text-white rounded-full mt-3">
                  Start Your Free Trial Now
                </button>
              </a>
              <div className="flex justify-start items-center">
                <div className="flex flex-row items-center justify-center gap-3">
                  {/* Overlapping Images */}
                  <div className="flex -space-x-3">
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden relative">
                      <img
                        src={"/assets/images/avatars/1.png"}
                        alt={`Student`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden relative">
                      <img
                        src={"/assets/images/avatars/2.png"}
                        alt={`Student`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden relative">
                      <img
                        src={"/assets/images/avatars/3.png"}
                        alt={`Student`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden relative">
                      <img
                        src={"/assets/images/avatars/4.png"}
                        alt={`Student`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border-2 border-white overflow-hidden relative">
                      <img
                        src={"/assets/images/avatars/5.png"}
                        alt={`Student`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="text-left">
                    <h3 className="text-base md:text-lg font-medium text-gray-900">
                      10K+ Student
                    </h3>
                    <p className="text-blue-600 text-sm">
                      have started their studies
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="assets/images/heroSection.png"
                alt="Student with books"
                width={600}
                height={600}
                className="object-contain"
              />
              <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3 z-10">
                {" "}
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl">★</span>
                  <span className="text-3xl font-bold text-[#0072CF] ">
                    4.8
                  </span>{" "}
                </div>
                <p className="text-sm text-gray-600">5K+ Reviews</p>{" "}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-[#F9FAFC]">
        <div className="container mx-auto  px-4 lg:px-10 py-16 ">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 text-[#07222C]">
              How It Works
            </h2>
            {/* <p className="text-gray-600 max-w-2xl mx-auto">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking
            </p> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-0 md:px-5 lg:px-10">
            <div className="p-6 rounded-[25px] border shadow hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-[15px] bg-[#3D81C2] flex justify-center items-center mb-3">
                <FcDocument className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#07222C]">
                Get AI-Generated Exam Questions{" "}
              </h3>
              <p className="text-[#565A5B]">
                AiStar Prep analyzes past papers and creates realistic,
                exam-style questions tailored to your syllabus.
              </p>
            </div>
            <div className="p-6 rounded-[25px] border shadow hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-[15px] bg-[#99BE47] flex justify-center items-center mb-3">
                <FaBolt className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#07222C]">
                Practice & Get Instant Feedback
              </h3>
              <p className="text-[#565A5B]">
                Solve questions and receive AI-powered insights to pinpoint weak
                areas.
              </p>
            </div>
            <div className="p-6 rounded-[25px] border shadow hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-[15px] bg-[#FB6238] flex justify-center items-center mb-3">
                <FaGraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#07222C]">
                Master Every Concept & Boost Confidence
              </h3>
              <p className="text-[#565A5B]">
                Track your progress, refine your skills, and walk into your exam
                fully prepared!
              </p>
            </div>
          </div>
        </div>

        <div className="relative container mx-auto  px-4 lg:px-10 py-16 ">
          {/* Assessment Platform Section */}
          <div className="mx-auto max-w-7xl">
            {/* Decorative dots */}
            <div className="absolute left-8 top-2/3 h-4 w-4 rounded-full bg-emerald-500"></div>
            <div className="absolute left-8 top-10 h-4 w-4 rounded-full bg-blue-600"></div>
            <div className="absolute right-16 top-8 h-4 w-4 rounded-full bg-pink-500"></div>

            {/* Hero Section */}
            <div className="mb-8 lg:mb-0 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16 z-0">
              {/* Image */}
              <div className="relative mx-auto aspect-square w-full max-w-xl">
                <div className="absolute inset-0 rounded-t-full bg-[#FF7759]"></div>
                <img
                  src="/assets/images/landingPage/boyCaryyingBooks.png"
                  alt="Student with backpack"
                  width={600}
                  height={600}
                  className="relative z-10"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-[#040428] lg:text-3xl">
                  Why AiStar Prep?{" "}
                </h1>
                <div className="space-y-6">
                  {/* <p className="text-lg text-[#504D4E]">
                    AI Star Prep can help you to:
                  </p> */}
                  <ul className="space-y-4">
                    {[
                      "Trained on 10+ Years of Past Papers",
                      "Personalized AI Feedback",
                      "Exam-Style Revision",
                      "No More Guesswork",
                    ].map((text, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-lg text-[#504D4E]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        {text}
                      </li>
                    ))}
                  </ul>
                  <p className="text-lg text-[#504D4E]">
                    Practice with questions modeled on real exams. Identify
                    mistakes and improve fast. Get comfortable with the format
                    before test day. Know what to expect and where to focus.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="grid gap-4 rounded-2xl bg-blue-600 p-8 lg:grid-cols-2 lg:gap-8 z-10">
              {/* Learn Mode */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                  <div>
                    <img
                      src="/assets/images/landingPage/icons/lock.png"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Learn Mode
                  </h3>
                  <p className="text-blue-100">
                    Choose a subject or topic and practice with unlimited
                    AI-generated questions. Get hints as you go and review full
                    solutions to strengthen your understanding—no pressure, just
                    progress.
                  </p>
                </div>
              </div>

              {/* Exam Mode */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                  <div>
                    <img
                      src="/assets/images/landingPage/icons/calculator.png"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    Exam Mode
                  </h3>
                  <p className="text-blue-100">
                    Take an AI-generated exam to push yourself under real test
                    conditions, with optional hints to challenge your readiness
                    before the big day. Don’t forget to review the correct
                    solutions at the end to improve with each attempt!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto  px-4 lg:px-10 py-16 ">
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 text-[#07222C]">
              What our Students say{" "}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-0 md:px-5 lg:px-10">
            <div className="p-6 rounded-[25px] border shadow hover:shadow-lg transition-shadow flex flex-col justify-between items-between">
              {/* <h3 className="text-xl font-semibold mb-3 text-[#07222C]">
                Great Platform{" "}
              </h3> */}
              <p className="text-base font-medium text-[#565A5B]">
                AiStar Prep helped me feel way more confident! The AI-generated
                questions were spot on, and my past paper scores improved in
                just a few weeks!
              </p>
              <div className="border my-2"></div>
              <div className="flex flex-row items-center justify-start gap-6">
                <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full border-2 border-white overflow-hidden relative">
                  <img
                    src={"/assets/images/avatars/1.png"}
                    alt={`Student`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <div className="text-left">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">
                    Sarah, A-Level Student{" "}
                  </h3>
                  <div className="flex flex-row gap-1">
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-[25px] border shadow hover:shadow-lg transition-shadow  flex flex-col justify-between items-between">
              {/* <h3 className="text-xl font-semibold mb-3 text-[#07222C]">
                Great Platform{" "}
              </h3> */}
              <p className="text-base font-medium text-[#565A5B]">
                This app is a lifesaver! It helped me understand tricky concepts
                and practice smarter.
              </p>
              <div className="border my-2"></div>
              <div className="flex flex-row items-center justify-start gap-6">
                <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full border-2 border-white overflow-hidden relative">
                  <img
                    src={"/assets/images/avatars/2.png"}
                    alt={`Student`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <div className="text-left">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">
                    Ki-Yong Jim, O-Level Student{" "}
                  </h3>
                  <div className="flex flex-row gap-1">
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-[25px] border shadow hover:shadow-lg transition-shadow flex flex-col justify-between items-between">
              {/* <h3 className="text-xl font-semibold mb-3 text-[#07222C]">
                Howard Clayton{" "}
              </h3> */}
              <div>
                <p className="text-base font-medium text-[#565A5B]">
                  AiStar Prep made my exam prep so much easier! The personalized
                  questions and progress tracking helped me stay on top of my
                  studies.
                </p>
              </div>
              <div className="border my-2"></div>
              <div className="flex flex-row items-center justify-start gap-6">
                <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full border-2 border-white overflow-hidden relative">
                  <img
                    src={"/assets/images/avatars/5.png"}
                    alt={`Student`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <div className="text-left">
                  <h3 className="text-base md:text-lg font-medium text-gray-900">
                    Liam Patel, A-Level Student{" "}
                  </h3>
                  <div className="flex flex-row gap-1">
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                    <LuStar className="text-[#F1C40F]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0072CF] text-white py-16">
        <div className="container mx-auto px-4 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                Join Thousands of Students Preparing Smarter!
              </h2>
              <p className="text-blue-100 w-full md:w-2/3">
                Why wait? Join the thousands of students who trust AI Star Prep
                to elevate their exam preparation. With personalized learning,
                authentic exam simulations, and powerful analytics, success is
                just a click away.
              </p>
              <a href='/auth/signup'>
                <button className="px-6 py-3 bg-white text-[#0072CF] font-medium rounded-full mt-3">
                  Start Your Free Trial Now
                </button>
              </a>
            </div>
            <div className="relative flex justify-between">
              <img
                src={"/assets/images/landingPage/pencilTable.jpg"}
                alt="Educational supplies"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 lg:px-10 py-16 relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Illustration */}
          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full ">
              <img
                src="/assets/images/landingPage/faqs.png"
                alt="Education illustration"
                className="w-full"
              />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex-shrink-0">
                      {openIndex === index ? (
                        <svg
                          className="h-6 w-6 text-[#0072CF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-6 w-6 text-[#0072CF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      )}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pb-4 pr-12">
                      <p className="text-[#3C3C43D9]">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-16 py-0 bg-[#0072CF] flex items-center justify-between">
        <div className="container mx-auto px-4 text-center text-white flex flex-col md:flex-row items-center justify-between md:justify-between">
          <div className="order-2 md:order-1">
            <p>2025 © AiStar Prep PTE Ltd</p>
          </div>
          <div className="order-1 md:order-2 flex items-center gap-3">
            <p>
              <Link
                to="/privacy-policy"
                className="underline underline-offset-2"
              >
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link
                to="/terms-and-conditions"
                className="underline underline-offset-2"
              >
                Terms and Conditions
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AiStarPrep;
