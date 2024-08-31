import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/multi.css"

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className={`bg-white p-6 rounded-lg shadow-md ${
          shakeAnimation ? "animate-shake" : ""
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Your Name"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="subject"
          value={subject}
          onChange={onChange}
          placeholder="Subject"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <textarea
          name="issue"
          value={issue}
          onChange={onChange}
          placeholder="Issue"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="telegramUsername"
          value={telegramUsername}
          onChange={onChange}
          placeholder="Telegram Username"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
