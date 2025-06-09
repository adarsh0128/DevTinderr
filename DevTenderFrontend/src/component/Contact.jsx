import { useState } from "react";


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Here you can add code to send the form data to your backend or email service

    // Simulating a successful submission
    setSuccess(true);

    // Clear the form fields
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container bg-gradient-to-r from-blue-900 to-purple-900 p-10 rounded-2xl shadow-lg max-w-4xl mx-auto mt-10 mb-10 relative z-10">
      <h2 className="text-4xl font-bold text-center text-white mb-6 tracking-wider">
        Contact Me
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white text-lg mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-white text-lg mb-2" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300"
            placeholder="Your Email"
          />
        </div>

        <div>
          <label className="block text-white text-lg mb-2" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-3 rounded-lg border border-gray-300"
            rows="4"
            placeholder="Your Message"
          ></textarea>
        </div>

        <div className="text-center mt-4">
          <button
            type="submit"
            className="bg-white text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </form>

      {success && (
        <div className="mt-4 text-center text-white text-lg">
          Message sent successfully!
        </div>
      )}
    </div>
  );
};

export default Contact;
