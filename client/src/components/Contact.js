import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaTelegramPlane, FaRegEnvelope, FaFileAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../css/multi.css"; // Assuming custom CSS

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    issue: "",
    telegramUsername: "",
  });
  const [shakeAnimation, setShakeAnimation] = useState(false);
  const { name, subject, issue, telegramUsername } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !subject || !issue || !telegramUsername) {
      setShakeAnimation(true);
      toast.error("Please fill in all fields");
      setTimeout(() => setShakeAnimation(false), 500);
      return;
    }

    try {
      const telegramToken = "6916219268:AAEMmRZrnYWsa9di_TJf2GrbLHs46B2QJ5k";
      const chatId = "-1002143952930";
      const message = `Name: ${name}\nSubject: ${subject}\nIssue: ${issue}\nTelegram Username: @${telegramUsername}`;

      const response = await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        }
      );

      if (response.ok) {
        toast.success("Message sent successfully");
        setFormData({ name: "", subject: "", issue: "", telegramUsername: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending the message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-gray-200 animate-gradient-x">
      {/* Left Side: Contact Information */}
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-8 space-y-6 backdrop-filter backdrop-blur-lg hover:shadow-2xl transition-all duration-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
        <p className="text-lg font-light text-gray-600">
          We’re here to help! Get in touch and let us know how we can assist you.
        </p>
        <form
          onSubmit={onSubmit}
          className={`space-y-6 ${shakeAnimation ? "animate-shake" : ""}`}
        >
          <div className="relative">
            <FaUser className="absolute text-gray-400 left-3 top-3" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <FaRegEnvelope className="absolute text-gray-400 left-3 top-3" />
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={onChange}
              placeholder="Subject"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="relative">
            <FaFileAlt className="absolute text-gray-400 left-3 top-3" />
            <textarea
              name="issue"
              value={issue}
              onChange={onChange}
              placeholder="Describe your issue"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              rows="4"
            />
          </div>

          <div className="relative">
            <FaTelegramPlane className="absolute text-gray-400 left-3 top-3" />
            <input
              type="text"
              name="telegramUsername"
              value={telegramUsername}
              onChange={onChange}
              placeholder="Telegram Username"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            Send Message
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactForm;
