import React, { useState } from "react";

const Client = () => {
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_URL}/send-sms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumbers, // No need to split the string, server handles it
        message,
      }),
    });

    const data = await response.json();

    if (data.message === "Bulk SMS sent successfully") {
      alert("Bulk SMS sent successfully!");
    } else {
      const errors = data.results.map((result) => result.message);
      alert(`Error sending bulk SMS: ${errors.join(", ")}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="phone-numbers">Phone numbers (comma-separated):</label>
      <textarea
        id="phone-numbers"
        value={phoneNumbers}
        onChange={(e) => setPhoneNumbers(e.target.value)}
        required
      />
      <br />
      <label htmlFor="message">Message:</label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <br />
      <button className="btn btn-Acc" type="submit">
        Send SMS
      </button>
    </form>
  );
};

export default Client;
