import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/multi.css";


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
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      {/* Left Side: Contact Information */}
      <div className="w-full md:w-1/2 p-8 text-white space-y-4 md:mr-4">
        <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
        <p className="text-lg">We help you to grow your share Recipes with Public and get more views.</p>
        <p className="text-md">
          <strong>Email:</strong> mailus@mrabhi2k3.me
        </p>
        <p className="text-md">
          <strong>Phone:</strong> +123 456 7890
        </p>
        <p className="text-md">
          <strong>Telegram:</strong> <a className="text-black text-1xl font-bold hover:text-blue-500" href="https://t.me/MrAbhi2k3"> @MrAbhi2k3</a>
        </p>
      </div>

      {/* Right Side: Contact Form */}
      <div className="w-full md:w-1/2 p-8 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <form
          onSubmit={onSubmit}
          className={`space-y-6 ${shakeAnimation ? "animate-shake" : ""}`}
        >
          <h2 className="text-2xl font-bold text-gray-800">Contact Us</h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            placeholder="Your Name"
            className="w-full mb-3 p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={onChange}
            placeholder="Subject"
            className="w-full mb-3 p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <textarea
            name="issue"
            value={issue}
            onChange={onChange}
            placeholder="Issue"
            className="w-full mb-3 p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="telegramUsername"
            value={telegramUsername}
            onChange={onChange}
            placeholder="Telegram Username"
            className="w-full mb-3 p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-25 text-center bg-blue-600 hover:bg-gray-900 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 font-medium"
          >
            Send Me Now
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ContactForm;
