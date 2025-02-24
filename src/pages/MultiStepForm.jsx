import { useState } from "react";
import { auth } from "../firebase"; // Ensure correct import path
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFirstName,setEmail, setSchool, setGraduated, setToggleOption, setGraduationYear } from "../store/formSlice";
const steps = ["route1", "route2", "route3", "route4", "route5"];

const categorySkills = {
  Growth: [
    "Go-To-Market Strategy",
    "Customer Segmentation",
    "Partnership Strategy",
    "Pitch Deck",
    "Grants",
  ],
  Finance: ["Financial Modeling", "Cost Optimization", "Strategic Finance"],
  Strategy: [
    "Competitor Analysis",
    "Product Strategy",
    "Data Analytics",
    "Commercial Negotiation",
  ],
  Technology: ["Cyber Security"],
  "Non-Profits": ["Sales & Marketing"],
};

const MultiStepForm = ({ step }) => {
  const dispatch = useDispatch();
  const {firstName, email, school, graduated, selectedOptions, graduationYear} = useSelector((state) => state.form);
  const [error, setError] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const currentStep = steps.indexOf(location.pathname.split("/").pop());

  const options = [
    "Friend or colleague",
    "Newsletter",
    "Google Search",
    "Career Services Office",
    "Professor or Academic Advisor",
    "LinkedIn",
    "Other",
  ];

  const toggleOption = (option) => {
    dispatch(setToggleOption(option));
  };


  const toggleCategory = (category) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
  
      // Auto-select skills based on categories
      let newSkills = [];
      newCategories.forEach((cat) => {
        newSkills = [...newSkills, ...categorySkills[cat]];
      });
  
      setSelectedProjects(newSkills);
      return newCategories;
    });
  };

  const toggleProject = (project) => {
    setSelectedProjects((prev) =>
      prev.includes(project) ? prev.filter((p) => p !== project) : [...prev, project]
    );
    console.log(selectedProjects);
  };
  const nextStep = async () => {
    
    if(currentStep === 0 && firstName){
      dispatch(setFirstName(firstName));
    }

    if (currentStep === 0 && !firstName) {
      setError("First name is required");
      return;
    }

    if (currentStep === 2 && !school) {
      setError("school name is required");
      return;
    }


    if (currentStep === 4) {
      if (!email) {
        setError("Email is required");
        return;
      }
  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, "DefaultPassword123");
        await sendEmailVerification(userCredential.user);
        alert("Verification email sent! Please check your inbox.");
      } catch (error) {
        setError(error.message);
        return;
      }
    }
  

    setError("");
    if (currentStep < steps.length - 1) {
      navigate(`/onboarding/${steps[currentStep + 1]}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      navigate(`/onboarding/${steps[currentStep - 1]}`);
    }
  };

  return (
    <div className="p-6">
      {/* Step Indicator */}
      <div className="flex space-x-8 mb-6">
        {["Name", "Preferences", "Education", "Submit", "Email"].map((label, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                currentStep === index ? "bg-black text-white" : "bg-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <p className={`text-sm ${currentStep === index ? "font-bold" : "text-gray-500"}`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 0 && (
        <div>
          <h2 className="text-xl font-bold">First, what’s your name?</h2>
          <label className="block mt-4">First name</label>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded-lg"
            value={firstName}
            onChange={(e) => dispatch(setFirstName(e.target.value))}
          />
          {error && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      )}

      {currentStep === 1 && (
        <div>
        <h2 className="text-xl font-bold">What projects are you interested in?</h2>
        <p className="text-gray-500">Select as many as you like</p>
    
        {/* Categories */}
        <div className="flex space-x-4 mt-4">
          {Object.keys(categorySkills).map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                className="cursor-pointer"
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
    
        {/* Projects */}
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(categorySkills)
            .flat()
            .map((project) => (
              <button
                key={project}
                className={`px-3 py-1 border rounded-full text-sm flex items-center ${
                  selectedProjects.includes(project)
                    ? "bg-black text-white"
                    : "border-gray-300 text-gray-700"
                }`}
                onClick={() => toggleProject(project)}
              >
                {project}
              </button>
            ))}
        </div>
      </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2 className="text-xl font-bold">Which school did you (or do you) attend?</h2>
          <p className="mt-2 text-gray-600">You can add more credentials later.</p>
          <input
            type="text"
            className="w-full mt-2 p-2 border rounded-lg"
            placeholder="Type here"
            value={school}
            onChange={(e) => dispatch(setSchool(e.target.value))}
          />
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="checkbox"
              checked={graduated}
              onChange={() => dispatch(setGraduated(!graduated))}
            />
            <label className="text-gray-700">I have graduated</label>
          </div>
          <div className="flex items-center mt-2 space-x-2">
            <input
              type="checkbox"
              checked={!graduated}
              onChange={() => dispatch(setGraduated(!graduated))}
            />
            <label className="text-gray-700">I will graduate in</label>
            <input
              type="number"
              className="w-16 border rounded-lg p-1"
              value={graduationYear}
              onChange={(e) => dispatch(setGraduationYear(e.target.value))}
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      )}

      {currentStep === 3 && (
        <div>
        <h2 className="text-xl font-bold">How did you hear about us?</h2>
        <div className="mt-4 space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOption(option)}
                className="cursor-pointer"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      )}

      {currentStep === 4 && (
        <div>
          <h2 className="text-xl font-bold">Lastly, what’s your email?</h2>
          <label className="block mt-4">Email</label>
          <input
            type="email"
            className="w-full mt-2 p-2 border rounded-lg"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          {error && <p className="text-red-500 text-sm mt-1">Required</p>}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <button className="px-4 py-2 border rounded-lg text-gray-700" onClick={prevStep}>
            Back
          </button>
        )}
        <button
          className={`px-6 py-2 text-white font-semibold rounded-lg ${
            currentStep === steps.length - 1 ? "bg-green-500" : "bg-black"
          }`}
          onClick={nextStep}
        >
          {currentStep === steps.length - 1 ? "Submit" : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
