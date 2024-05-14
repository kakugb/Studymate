import Header from "../../partials/Header";
import Sidebar from "../../partials/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import grade from '../../pic/grade.jpg'
function PsychometricUser() {
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [selectedTestQuestions, setSelectedTestQuestions] = useState([]);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [totalIncorrect, setTotalIncorrect] = useState(0);
  const [attemptedQuizIds, setAttemptedQuizIds] = useState([]);

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/psychometric-test/psyhometric`,
        config
      );
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const handleTestButtonClick = async (testId) => {
    if (!attemptedQuizIds.includes(testId)) {
      try {
        const token = sessionStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://localhost:5000/psychometric-test/psyhometric/${testId}`,
          config
        );
        setSelectedTestId(testId);
        setSelectedTestQuestions(response.data.questions);
        // Reset total correct and incorrect answers when a new test is selected
        setTotalCorrect(0);
        setTotalIncorrect(0);
      } catch (error) {
        console.error("Error fetching test questions:", error);
      }
    } else {
      toast.error("You have already attempted this quiz.");
    }
  };

  const handleSubmitResults = async () => {
    // Calculate total correct and incorrect answers
    let correct = 0;
    let incorrect = 0;
    selectedTestQuestions.forEach((question, index) => {
      const selectedOptionIndex = document.querySelector(`input[name=q${index}]:checked`);
      if (selectedOptionIndex) {
        const selectedOption = selectedOptionIndex.value;
        if (selectedOption === question.options[question.correctOptionIndex].optionText) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });
    setTotalCorrect(correct);
    setTotalIncorrect(incorrect);
    setAttemptedQuizIds([...attemptedQuizIds, selectedTestId]);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="w-full h-screen bg-gray-200 md:pl-60 overflow-auto" style={{ backgroundImage: `url(${grade})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="md:ml-6 md:mr-4 mt-2">
            {/* Content of the dashboard */}
            <div class="max-w-md mx-auto bg-white p-8 rounded-md shadow-md s">
              <h1 class="text-3xl font-bold mb-6 text-green-400 text-center text-success">
                Psychometric Tests
              </h1>

              {tests.map((test) => (
                <div key={test._id} class="mb-8">
                  <button
                    onClick={() => handleTestButtonClick(test._id)}
                    class="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {test.name}
                  </button>
                </div>
              ))}

              {selectedTestId && (
                <div>
                  <h3 class="text-2xl font-bold mb-6 text-center">
                    Selected Test: {tests.find((test) => test._id === selectedTestId).name}
                  </h3>
                  {attemptedQuizIds.includes(selectedTestId) && (
                    <p class="text-center text-red-500 font-bold mb-4">
                      You have already attempted this quiz.
                    </p>
                  )}
                  {selectedTestQuestions.length > 0 && !attemptedQuizIds.includes(selectedTestId) && (
                    selectedTestQuestions.map((quest, index) => (
                      <div key={index} class="flex flex-col mb-4">
                        <label for={`q${index}`} class="text-lg text-gray-800 mb-2">
                          {quest.questionText}
                        </label>
                        {quest.options && quest.options.length > 0 ? (
                          quest.options.map((option, optionIndex) => (
                            <div key={optionIndex} class="flex items-center space-x-4">
                              <input
                                type="radio"
                                id={`q${index}-${optionIndex}`}
                                name={`q${index}`}
                                value={option.optionText}
                                class="mr-2"
                                required
                              />
                              <label for={`q${index}-${optionIndex}`} class="text-gray-700">
                                {option.optionText}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p>No options available</p>
                        )}
                      </div>
                    ))
                  )}
                  {selectedTestQuestions.length > 0 && !attemptedQuizIds.includes(selectedTestId) && (
                    <div class="flex justify-center">
                      <button
                        onClick={handleSubmitResults}
                        class="block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                      >
                        Submit Results
                      </button>
                    </div>
                  )}
                  {attemptedQuizIds.includes(selectedTestId) && (
                    <div class="text-center mt-4">
                      <p>Total Correct Answers: {totalCorrect}</p>
                      <p>Total Incorrect Answers: {totalIncorrect}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Other components and content */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default PsychometricUser;
