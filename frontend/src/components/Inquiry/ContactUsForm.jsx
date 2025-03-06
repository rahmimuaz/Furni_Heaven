import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./contactUsForm.css";
import { ToastContainer, Bounce } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { createNotify } from "./ToastMessages";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    setFormData({ username: storedName, email: storedEmail, message: "" });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5001/inquiries", formData);
      createNotify("Inquiry submitted successfully!");
      setStatusMessage("Inquiry submitted successfully!");
      setIsSubmitted(true);
      setFormData({ username: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setStatusMessage("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="contact-container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    {/* Video Element
    <video className="video-background" controls muted autoPlay>
        <source src="/homepage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

      <div className="d-flex flex-row justify-content-center align-items-stretch gap-4 w-100" style={{ maxWidth: "1200px" }}>
        {/* Contact Us Form Box */}
        <div className="contact-form-box card shadow-sm p-5" style={{ flex: 1, minWidth: "300px" }}>
          {isSubmitted ? (
            <div className="text-center">
              <CheckCircleIcon style={{ color: "#36b936", fontSize: "60px" }} />
              <p className="mt-5" style={{ fontSize: "30px", color: "black" }}>Thanks for contacting us!</p>
              <button className="btn btn-warning fw-bold mt-5" onClick={() => navigate("/queries")}>
                <ListAltIcon /> View my inquiries
              </button>
            </div>
          ) : (
            <>
              <p className="fw-bold" style={{ fontSize: "30px", color: "black" }}>Contact Us</p>
              {statusMessage && <p style={{ color: statusMessage.includes("Failed") ? "red" : "green" }}>{statusMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="form-label fw-bold" htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="form-control" />
                  {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
                </div>
                <div className="mt-3">
                  <label className="form-label fw-bold" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} className="form-control" disabled />
                </div>
                <div className="mt-3">
                  <label className="form-label fw-bold" htmlFor="message">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="form-control"></textarea>
                  {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
                </div>
                <button className="btn btn-dark w-100 rounded-3 mt-4" type="submit">Submit</button>
              </form>
            </>
          )}
        </div>

        {/* AI Chat Box */}
        <div className="ai-chat-box" style={{ flex: 1, minWidth: "300px", border: "1px #774625", padding: "20px", borderRadius: "8px",backgroundColor:"#bcb4a2" }}>
          <p className="text-center fw-bold" style={{ fontSize: "22px", textDecoration: "underline",color:"black" }}>Get Quick Answers</p>
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/N584UKdgFYHKg6caTLFNC"
            title="Chatbot"
            width="100%"
            style={{ height: "100%", minHeight: "500px", border: "none" }}
            frameBorder="0"
          />
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={5000} hideProgressBar theme="light" transition={Bounce} />
    </div>
  );
};

export default ContactUsForm;
