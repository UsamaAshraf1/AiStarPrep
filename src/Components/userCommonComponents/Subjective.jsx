import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LuUpload } from "react-icons/lu";
import {
  extractTextFunApi,
} from "../../store/learn/learnServices";
import { renderQuestionContent } from "../../helper/QuestionStructure";

const Subjective = ({ question, onAnswer }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userText, setUserText] = useState(""); // State for user-typed text
  const [finalText, setFinalText] = useState(""); // Holds the combined text
  const dispatch = useDispatch();
  // const { openModal, closeModal } = useModal();

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files); // Convert FileList to array
    if (files.length === 0) return;

    event.target.files = null; // Reset the input field
    setImages([]); // Clear previous images
    setLoading(true);

    try {
      const resultAction = await dispatch(extractTextFunApi(files));
      if (extractTextFunApi.fulfilled.match(resultAction)) {
        const text = resultAction.payload;

        const updatedText = userText ? `${userText}\n${text}` : text;
        setFinalText(updatedText);
        onAnswer(updatedText);
      } else {
        console.error("Text extraction failed:", resultAction.payload);
      }
    } catch (error) {
      console.error("Error extracting text:", error);
    } finally {
      setLoading(false);
    }

    // Generate image previews
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imagePreviews]); // Append new images
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setUserText(text);
    setFinalText(text);
    onAnswer(text); // Send final combined text
  };

  return (
    <div>
      {/* Question Section */}
      <div>
        <h2 className="text-4xl font-bold mb-4 text-center">
          Subjective Question
        </h2>
        {renderQuestionContent(question?.question)}
        
        {/* <p className="text-[18px] font-medium text-[#1A1A1A] text-center leading-relaxed">
          {question?.question}
        </p> */}

        {question?.parts && question.parts.length > 0 && (
          <ul className="mt-3 space-y-2">
            {question.parts.map((part) => (
              <li key={part._id} className="text-[16px] text-[#333]">
                <span className="font-semibold">{part.part_id}:</span>{" "}
                {part.part_question}
              </li>
            ))}
          </ul>
        )}
        
      </div>

      {/* Answer Input */}
      <div className="relative flex justify-center mt-6">
        <textarea
          className="w-full max-w-2xl p-4 border-2 border-gray-300 rounded-lg bg-gray-100 text-gray-900"
          rows="6"
          placeholder={
            loading
              ? "Extracting text..."
              : "Write Answer or Upload hand written answer image here by clicking on upload button"
          }
          value={finalText} // Use final text state
          onChange={handleTextChange} // Handle user input
        />
        {/* Loader inside textarea */}
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-opacity-60 p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#0072CF] border-solid"></div>
          </div>
        )}

        {/* File Upload Button with Icon */}
        <label className="absolute bottom-1 right-4 md:right-16 bg-[#0072CF] text-white p-2 rounded-full cursor-pointer shadow-md">
          <LuUpload size={20} />
          <input
            type="file"
            accept="image/*"
            multiple // Allow multiple image uploads
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>
    </div>
  );
};

export default Subjective;
