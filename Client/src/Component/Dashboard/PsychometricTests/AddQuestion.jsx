import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../../partials/Header";
import Sidebar from "../../../partials/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import grade from '../../../pic/grade.jpg'
function AddQuestion() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: [{ optionText: "" }, { optionText: "" }, { optionText: "" }],
      correctOptionIndex: 0,
    },
  ]);

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
        "http://localhost:5000/psychometric-test/psyhometric",
        config
      );
      setTests(response.data);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const handleTestIdChange = (e) => {
    setSelectedTestId(e.target.value);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "option") {
      newQuestions[index].options[value.index].optionText = value.text;
    } else if (field === "correctOptionIndex") {
      newQuestions[index].correctOptionIndex = value;
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const addOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push({ optionText: "" });
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let response;
      if (selectedTestId !== "new") {
        response = await axios.post(
          `http://localhost:5000/psychometric-test/psyhometric/${selectedTestId}`,
          { questions },
          config
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/psychometric-test/psyhometric",
          { name, description, questions },
          config
        );
      }
      toast.success("Test added successfully");
      setTimeout(() => {
        navigate("/PsychometricTests");
      }, 2000);
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar component */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar component */}
        <Header />

        {/* Main content */}
        <main className="w-full h-screen bg-gray-200 md:pl-60"  style={{ backgroundImage: `url(${grade})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {/* Your main content goes here */}
          <div className="md:ml-6 md:mr-4 mt-2">
            {/* Content of the dashboard */}
            <div className="w-full  overflow-auto flex justify-center">
              <form
                onSubmit={handleSubmit}
                className="w-max-md md:w-[40%] h-auto bg-gray-300 p-4 rounded-md"
              >
                <div className="md:flex md:items-center mb-4">
                  <div className="md:w-1/3">
                    <label
                      className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                      htmlFor="test-name"
                    >
                      Test Name
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <select
                      className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                      id="test-name"
                      value={selectedTestId}
                      onChange={handleTestIdChange}
                    >
                      <option value="">Select a test</option>
                      {tests.map((test) => (
                        <option key={test._id} value={test._id}>
                          {test.name}
                        </option>
                      ))}
                      <option value="new">New Test</option>
                    </select>
                  </div>
                </div>
                {selectedTestId === "new" && (
                  <div>
                    <div className="md:flex md:items-center mb-4">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="new-test-name"
                        >
                          New Test Name
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="new-test-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-4">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="new-test-description"
                        >
                          New Test Description
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <textarea
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id="new-test-description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {questions.map((question, index) => (
                  <div key={index}>
                    <div className="md:flex md:items-center mb-4">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor={`question-${index + 1}`}
                        >
                          Question {index + 1}
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id={`question-${index + 1}`}
                          type="text"
                          value={question.questionText}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "questionText",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex}>
                        <div className="md:flex md:items-center mb-4">
                          <div className="md:w-1/3">
                            <label
                              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                              htmlFor={`option-${index + 1}-${optionIndex + 1}`}
                            >
                              Option {optionIndex + 1}
                            </label>
                          </div>
                          <div className="md:w-2/3">
                            <input
                              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                              id={`option-${index + 1}-${optionIndex + 1}`}
                              type="text"
                              value={option.optionText}
                              onChange={(e) =>
                                handleQuestionChange(index, "option", {
                                  index: optionIndex,
                                  text: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="md:flex md:items-center mb-4">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor={`correct-option-${index}`}
                        >
                          Correct Option Index
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                          id={`correct-option-${index}`}
                          type="number"
                          min="0"
                          max={question.options.length - 1}
                          value={question.correctOptionIndex}
                          onChange={(e) =>
                            handleQuestionChange(
                              index,
                              "correctOptionIndex",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="w-full flex justify-around">
                      {index === questions.length - 1 && (
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                          type="button"
                          onClick={() => removeOption(index)}
                        >
                          Remove Option
                        </button>
                      )}

                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        type="button"
                        onClick={() => addOption(index)}
                      >
                        Add Option
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="submit"
                  className="w-full rounded mt-4 flex justify-center bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-dark-3 transition duration-150 ease-in-out hover:bg-neutral-700 hover:shadow-dark-2 focus:bg-neutral-700 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-dark-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                >
                  Add Test
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddQuestion;
