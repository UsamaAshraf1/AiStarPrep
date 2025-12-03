import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { startFreeTrail } from "../../../store/others/otherServices";
import { useModal } from "../../../helper/ModalContext";
import FreeTrailSubject from "../../../Components/Modals/FreeTrailSubject";

function FreeTrialDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, closeModal } = useModal();

  const handleSubscribe = async () => {
    openModal(<FreeTrailSubject onClose={closeModal} />);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Why Join Section */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">
          Why Should You Join the AiStar Prep Platform?
        </h2>
        <ul className="list-disc list-inside text-xl font-normal space-y-2">
          <li>Time is short – Work smarter, not harder.</li>
          <li>
            Practice, practice, practice – Hone your exam-taking skills with an
            AI tutor.
          </li>
          <li>
            Don't get stuck – Get real-time feedback and hints for tough
            questions.
          </li>
          <li>
            Laser focus – Select a topic in learn mode and keep practicing until
            your weaknesses turn into strengths.
          </li>
          <li>
            Breathe – That A* is just around the corner, and we're here to help
            you get it!
          </li>
        </ul>
      </section>
      {/* Trial Timeline Section */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold">How Your Free Trial Works:</h2>
        <ul className="list-disc list-inside text-xl font-normal space-y-2">
          <li>Sign up with an account for a 7 day Free Trial.</li>
          <li>
            You can only choose one subject for your free trial, so share with
            your friends!
          </li>
          <li>
            Practice and learn with 1,000s of questions and real-time AI powered
            tutors.
          </li>
          <li>
            Laser focus – Select a topic in learn mode and keep practicing until
            your weaknesses turn into strengths.
          </li>
          <li>
            After your 7 day Free Trial, sign up for as many subjects as you
            need and start your journey to A* Success.
          </li>
        </ul>
      </section>

      {/* <section className="space-y-4">
        <h2 className="text-2xl font-bold">How your free trial works?</h2>

        <ul className="space-y-6 list-disc">
          <li className="space-y-1 ml-4">
            <h3 className="text-lg font-bold">Today</h3>
            <p className="text-lg">
              Get instant access to all features and start exploring.
            </p>
          </li>

          <li className="space-y-1 ml-4">
            <h3 className="text-lg font-bold">In 5 Days</h3>
            <p className="text-lg">
              We'll send you a friendly reminder that your trial is about to
              end.
            </p>
          </li>

          <li className="space-y-1 ml-4">
            <h3 className="text-lg font-bold">In 7 Days</h3>
            <p className="text-lg">
              You'll be charged $10 per subject each month if you decide to
              continue. Cancel anytime before this date to avoid charges.
            </p>
          </li>
        </ul>
      </section> */}

      {/* Action Buttons */}
      <div className="flex flex-col items-center space-y-4 pt-4">
        <button
          onClick={() => navigate("/user/subscription-plans")}
          className="text-[#0072CF] transition-colors underline underline-offset-2"
        >
          View all plans
        </button>
        <button
          className="bg-[#0072CF] text-white px-24 py-3 rounded-full transition-colors w-full md:w-auto"
          onClick={() => handleSubscribe()}
        >
          Start My Free Trial
        </button>
      </div>
    </div>
  );
}

export default FreeTrialDetails;
