"use client";
import { useEffect, useState } from "react";
import "@mdi/font/css/materialdesignicons.min.css";

type FormData = {
  vehicles_assets: string;
  industry: string;
  interests: string;
  contact_method: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  company_name: string;
  message: string;
  privacy_policy: boolean;
};

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [formData, setFormData] = useState<FormData>({
    vehicles_assets: "",
    industry: "",
    interests: "",
    contact_method: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    company_name: "",
    message: "",
    privacy_policy: false
  });
  const [notification, setNotification] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleOptionClick = (field: keyof FormData, value: string, isCheckbox = false) => {
    if (isCheckbox) {
      const currentValues = formData[field].toString().split(",").filter(Boolean);
      const updated = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      setFormData(prev => ({ ...prev, [field]: updated.join(",") }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const isOptionSelected = (field: keyof FormData, value: string) =>
    formData[field].toString().split(",").includes(value);

  const nextStep = () => {
    const requiredFields: Record<number, keyof FormData> = {
      1: "industry", // Step 1 is now mandatory
      2: "interests",
      3: "contact_method"
    };
    const currentField = requiredFields[step];
    
    if (currentField && !formData[currentField]) {
      setNotification("Please select an option before proceeding.");
      return;
    }
    
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(prev => prev + 1);
      setIsTransitioning(false);
    }, 300);
  };

  const prevStep = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(prev => prev - 1);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("Submitting your form...");

    const requiredFields = [
      "first_name",
      "last_name",
      "phone_number",
      "email",
      "company_name",
      "privacy_policy",
    ] as const;

    const isValid = requiredFields.every(
      (field) =>
        formData[field] &&
        (typeof formData[field] !== "boolean" || formData[field])
    );

    if (!isValid) {
      setNotification("Please fill out all fields correctly before submitting the form.");
      setIsSubmitting(false);
      setSubmitStatus(null);
      return;
    }

    try {
      // Prepare data with email including selected options
      const submissionData = {
        ...formData,
        email: `${formData.email} [Industry: ${formData.industry || 'Not selected'} | Services: ${formData.interests || 'Not selected'} | Contact: ${formData.contact_method || 'Not selected'}]`
      };

      const res = await fetch("/api/multistep-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitStatus("✅ Form submitted successfully!");
        setNotification("✅ Form submitted successfully!");
        setIsTransitioning(true);
        setTimeout(() => {
          setStep(5); // success page
          setIsTransitioning(false);
          setIsSubmitting(false);
        }, 1500);
      } else {
        setSubmitStatus("❌ Failed to submit form");
        setNotification("❌ " + result.message);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("❌ Network error");
      setNotification("⚠️ Something went wrong! Please try again.");
      setIsSubmitting(false);
    }
  };  

  const renderOption = (val: string, selectedVal: string, field: keyof FormData, iconClass: string) => (
    <div
      key={val}
      className={`cursor-pointer px-6 py-4 rounded-lg border text-center font-medium flex flex-col items-center gap-2 w-32 h-32 justify-center transform transition-all duration-200 ${
        selectedVal === val || isOptionSelected(field, val) 
          ? "bg-indigo-600 text-white border-indigo-600 scale-105" 
          : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:scale-105"
      }`}
      onClick={() => handleOptionClick(field, val, field === "interests")}
    >
      <i className={`mdi ${iconClass} text-3xl`} />
      <span>{val}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-gradient-to-b from-gray-950 p-8 rounded-lg shadow-xl border border-gray-800 relative">
        {/* Progress indicator */}
        <div className="text-center text-indigo-400 text-lg font-semibold mb-6">
          <div className="flex justify-center items-center mb-3">
            {[...Array(totalSteps)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className={`rounded-full h-3 w-3 ${i + 1 <= step ? "bg-indigo-500" : "bg-gray-700"} transition-colors duration-500`}></div>
                {i < totalSteps - 1 && (
                  <div className={`h-[2px] w-8 ${i + 1 < step ? "bg-indigo-500" : "bg-gray-700"} transition-colors duration-500`}></div>
                )}
              </div>
            ))}
          </div>
          Step <span className="text-indigo-300">{step}</span> of <span className="text-indigo-300">{totalSteps}</span>
        </div>

        {notification && (
          <div className="bg-red-900 text-white p-3 rounded mb-4 text-center border border-red-700 animate-fadeIn">
            {notification}
          </div>
        )}

        <div className="min-h-[400px] flex items-center justify-center">
          <div className={`w-full h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-center text-white">What industry is your business in?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8 justify-items-center">
                  {[
                    ["Hydrology", "mdi-store"],
                    ["Agricultural Studies", "mdi-factory"],
                    ["Disaster Management Studies", "mdi-lan"],
                    ["Urban Studies", "mdi-desktop-mac"],
                    ["Forestry and Ecology", "mdi-hospital"],
                    ["Photogrammetry", "mdi-home"],
                    ["Climatology", "mdi-earth"],
                    ["Energy Sector", "mdi-map"],
                    ["Health GIS ", "mdi-map-marker"],
                    ["Geographic Information System", "mdi-leaf"],
                    ["Capacity Building Cell","mdi-map"]
                  ].map(([val, icon]) => renderOption(val, formData.industry, "industry", icon))}
                </div>
                <div className="flex justify-center mt-8">
                  <button 
                    type="button" 
                    className={`py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200 transform hover:-translate-y-1 ${
                      formData.industry 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg" 
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`} 
                    onClick={nextStep}
                    disabled={!formData.industry}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-center text-white">What services are you interested in?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8 justify-items-center">
                  {[
                  ["Consulting", "mdi-lightbulb-on"],
                  ["Integration", "mdi-connection"],
                  ["Development", "mdi-code-braces"],
                  ["Maintenance", "mdi-wrench"],
                  ["Training", "mdi-school"],
                  ["Support", "mdi-headset"]
                  ].map(([val, icon]) => renderOption(val, formData.interests, "interests", icon))}
                </div>
                <p className="text-gray-400 text-center mb-6 text-sm">Select multiple options if needed</p>
                <div className="flex justify-between mt-8">
                  <button type="button" className="border border-indigo-500 text-indigo-400 hover:bg-gray-800 py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200" onClick={prevStep}>Back</button>
                  <button 
                    type="button" 
                    className={`py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200 transform hover:-translate-y-1 ${
                      formData.interests 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg" 
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`} 
                    onClick={nextStep}
                    disabled={!formData.interests}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-center text-white">How would you prefer to be contacted?</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {[
                    ["Email", "mdi-email"],
                    ["Phone", "mdi-phone"],
                    ["Video Call", "mdi-video"],
                    ["In Person", "mdi-account-box"]
                  ].map(([val, icon]) => renderOption(val, formData.contact_method, "contact_method", icon))}
                </div>
                <div className="flex justify-between mt-8">
                  <button type="button" className="border border-indigo-500 text-indigo-400 hover:bg-gray-800 py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200" onClick={prevStep}>Back</button>
                  <button 
                    type="button" 
                    className={`py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200 transform hover:-translate-y-1 ${
                      formData.contact_method 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg" 
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`} 
                    onClick={nextStep}
                    disabled={!formData.contact_method}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="text-xl font-bold mb-6 text-center text-white">Tell us about yourself</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="first_name" className="block text-gray-300 mb-2">First Name *</label>
                    <input
                      type="text"
                      id="first_name"
                      placeholder="First Name"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block text-gray-300 mb-2">Last Name *</label>
                    <input
                      type="text"
                      id="last_name"
                      placeholder="Last Name"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                    <div>
                    <label htmlFor="phone_number" className="block text-gray-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone_number"
                      placeholder="Phone Number"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.phone_number}
                      onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData(prev => ({ ...prev, phone_number: value }));
                      }}
                      pattern="[0-9]{10}"
                      maxLength={10}
                      title="Phone number must be 10 digits"
                      required
                    />
                    {formData.phone_number && formData.phone_number.length !== 10 && (
                      <p className="text-red-200 text-sm mt-1">Phone number must be exactly 10 digits</p>
                    )}
                    </div>
                  <div className="md:col-span-2">
                    <label htmlFor="company_name" className="block text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      id="company_name"
                      placeholder="Company Name"
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea
                      id="message"
                      placeholder="Your message here..."
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    ></textarea>
                  </div>
                  <div className="md:col-span-2 flex items-start gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="privacy_policy"
                      className="mt-1 bg-gray-800 border border-gray-700 rounded text-indigo-600 focus:ring-indigo-500"
                      checked={formData.privacy_policy}
                      onChange={(e) => setFormData(prev => ({ ...prev, privacy_policy: e.target.checked }))}
                      required
                    />
                    <label htmlFor="privacy_policy" className="text-gray-300">
                      I agree to the <span className="text-indigo-400 underline cursor-pointer">Privacy Policy</span> *
                    </label>
                  </div>
                </div>

                {/* Submit Status - Moved right above the submit button */}
                {submitStatus && (
                  <div className={`p-3 rounded mb-6 text-center border animate-fadeIn ${
                    submitStatus.includes("✅") 
                      ? "bg-green-900 text-white border-green-700" 
                      : submitStatus.includes("❌")
                      ? "bg-red-900 text-white border-red-700"
                      : "bg-blue-900 text-white border-blue-700"
                  }`}>
                    {submitStatus}
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <button 
                    type="button" 
                    className="border border-indigo-500 text-indigo-400 hover:bg-gray-800 py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200"
                    onClick={prevStep}
                    disabled={isSubmitting}
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className={`py-2 px-8 min-w-[120px] rounded-lg transition-all duration-200 transform hover:-translate-y-1 ${
                      isSubmitting 
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                        : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="text-center py-12">
                <div className="text-5xl text-green-500 mb-6 animate-bounce">
                  <i className="mdi mdi-check-circle"></i>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Thank You!</h2>
                <p className="text-gray-300 mb-8">Your information has been submitted successfully. We'll be in touch with you shortly.</p>
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                  <h3 className="text-lg font-semibold text-indigo-400 mb-3">Summary of your submission:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-gray-400">Industry: <span className="text-white">{formData.industry}</span></p>
                      <p className="text-gray-400">Services: <span className="text-white">{formData.interests}</span></p>
                    </div>
                    <div>
                      <p className="text-gray-400">Contact via: <span className="text-white">{formData.contact_method}</span></p>
                      <p className="text-gray-400">Name: <span className="text-white">{formData.first_name} {formData.last_name}</span></p>
                      <p className="text-gray-400">Company: <span className="text-white">{formData.company_name}</span></p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button 
                    type="button" 
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-8 min-w-[180px] rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1"
                    onClick={() => {
                      setIsTransitioning(true);
                      setTimeout(() => {
                        setStep(1);
                        setFormData({
                          vehicles_assets: "",
                          industry: "",
                          interests: "",
                          contact_method: "",
                          first_name: "",
                          last_name: "",
                          phone_number: "",
                          email: "",
                          company_name: "",
                          message: "",
                          privacy_policy: false
                        });
                        setIsTransitioning(false);
                        setSubmitStatus(null);
                      }, 300);
                    }}
                  >
                    Start New Application
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}