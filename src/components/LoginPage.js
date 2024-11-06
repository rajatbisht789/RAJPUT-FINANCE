import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import axios from 'axios';

const LoginPage = () => {
  const modalRef = useRef(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    otp: ['', '', '', '', '', '']
  });
  const [loggedUser, setLoggedUser] = useState({
    id: null,
    phoneNumber: '',
    userName: '',
    admin: false
  });
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Track the loggedUser state changes
  useEffect(() => {
    if (loggedUser.id) {
      localStorage.setItem("loggedUserData", JSON.stringify(loggedUser));
      const loggedUserData = localStorage.getItem("loggedUserData");
      console.log(loggedUserData)
    }
  }, [loggedUser]);

  useEffect(() => {
    const callback = (otplessUser) => {
      try {
        const mobileMap = otplessUser.identities.find(
          (item) => item.identityType === "MOBILE"
        )?.identityValue;
        setUser(otplessUser);
        setIsLoading(false);
        navigateAccordingToRole();
      } catch (error) {
        console.error('Error handling user info:', error);
      }
    };

    if (window.OTPless) {
      window.OTPlessSignin = new window.OTPless(callback);
      setSdkLoaded(true);
    } else {
      console.error('OTPless SDK not found');
    }
  }, []);

  const navigateAccordingToRole = () => {
    if (loggedUser.phoneNumber === '') {
      // window.location.reload(); // Optionally reload the page
    } else if (loggedUser.admin) {
      navigate("/admin");
    } else {
      navigate("/active-loan");
    }
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(step + 1);
    } else if (step === 2) {
      verifyOTP();
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length > 1) return; // Allow only one character
    const otp = [...formData.otp];
    otp[index] = value;
    setFormData({ ...formData, otp });
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const phoneAuth = () => {
    try {
      if (!sdkLoaded) {
        console.error('OTPless SDK not initialized');
        return;
      }

      window.OTPlessSignin.initiate({
        channel: "PHONE",
        phone: formData.phone,
        countryCode: "+91",
      });
    } catch (error) {
      console.error('Error initiating phone authentication:', error);
    }
  };

  const fetchUserData = async () => {
    const phoneNumber = formData.phone;

    try {
      const response = await axios.get(`http://localhost:8080/rajputFinance/api/user/getUserByPhoneNumber/${phoneNumber}`);
      setLoggedUser(response.data);  // Update state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const verifyOTP = () => {
    setIsLoading(true);
    const otpString = formData.otp.join('');
    try {
      if (!sdkLoaded) {
        console.error('OTPless SDK not initialized');
        return;
      }

      window.OTPlessSignin.verify({
        channel: "PHONE",
        phone: formData.phone,
        otp: otpString,
        countryCode: "+91",
      });
      fetchUserData(); // Ensure this happens after OTP verification
      // Handle success/failure of OTP verification here
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  // Call navigateAfterLogin whenever loggedUser is updated
  useEffect(() => {
    navigateAccordingToRole();
  }, [loggedUser]);  // This will trigger when loggedUser is updated

  return (
    <div className="min-h-screen bg-background flex justify-center items-center">
      <div ref={modalRef} className="bg-white rounded p-6 w-96">
        <h3 className="text-xl text-center mb-4 p-2">
          Sign In To Rajput Finance
        </h3>
        <form onSubmit={handleNext}>
          {step === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="mobile-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="border rounded w-full py-2 px-3 text-gray-700"
                />
              </div>
              <p className="text-sm text-gray-600">We'll send you an OTP for verification.</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={phoneAuth}
                  className="flex items-center bg-[var(--color-primary)] text-white py-2 px-4 rounded shadow transition-shadow duration-300 hover:shadow-xl"
                >
                  Request OTP
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              {isLoading ? <Loader /> : (
                <>
                  <div className="mb-4" id="otp-section">
                    <label className="block text-gray-700 mb-2" htmlFor="otp">
                      Enter OTP
                    </label>
                    <div className="flex justify-between">
                      {formData.otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          id={`otp-input-${index}`}
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="border rounded w-12 h-12 text-center text-xl"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Check your phone for the OTP.</p>
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="flex items-center text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                    <button
                      onClick={verifyOTP}
                      className="flex items-center bg-[var(--color-primary)] text-white py-2 px-4 rounded shadow transition-shadow duration-300 hover:shadow-xl"
                    >
                      Verify OTP
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          <p className="mt-4 text-gray-600 text-sm text-center">
            By signing in, you agree to our <a href="/terms" className="text-blue-500 underline">Terms of Use</a> and <a href="/privacy" className="text-blue-500 underline">Privacy Policy</a>.
          </p>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
