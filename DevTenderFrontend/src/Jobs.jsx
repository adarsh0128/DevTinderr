import React from 'react';

const Jobs = () => {
  return (
    <div className="jobs-container bg-gradient-to-r from-blue-900 to-purple-900 p-10 rounded-2xl shadow-lg max-w-4xl mx-auto mt-10 mb-10 relative z-10">
      <h2 className="text-4xl font-bold text-center text-white mb-6 tracking-wider">
        Job Opportunities
      </h2>
      <p className="text-xl text-white mb-4">
        I am a fresher currently learning web development and actively seeking job opportunities. I have completed an internship, where I gained valuable experience and practical skills in web technologies.
      </p>
      
      <h3 className="text-3xl font-semibold text-white mb-4">About Me</h3>
      <p className="text-lg text-white mb-6">
        I am passionate about web development and eager to apply my skills in a professional environment. I am dedicated to continuous learning and growth in this exciting field.
      </p>

      <h3 className="text-3xl font-semibold text-white mb-4">Looking For:</h3>
      <ul className="list-disc list-inside text-lg text-white">
        <li>Junior Web Developer Positions</li>
        <li>Internships in Web Development</li>
        <li>Opportunities to learn and grow within a team</li>
      </ul>

      <h3 className="text-3xl font-semibold text-white mb-4">Skills:</h3>
      <ul className="list-disc list-inside text-lg text-white">
        <li>HTML, CSS, JavaScript</li>
        <li>React.js</li>
        <li>Version Control (Git)</li>
        <li>Responsive Web Design</li>
      </ul>

      <h3 className="text-3xl font-semibold text-white mb-4">Backend Technologies:</h3>
      <ul className="list-disc list-inside text-lg text-white">
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <li>Firebase</li>
      </ul>

      <h3 className="text-3xl font-semibold text-white mb-4">Projects:</h3>
      <p className="text-lg text-white mb-6">
        I have worked on several projects, including clones of popular websites like Netflix, YouTube, and Swiggy, utilizing both front-end and back-end technologies to create full-stack applications.
      </p>

      <div className="text-center mt-8">
        <button className="bg-white text-purple-700 font-semibold py-2 px-4 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-300">
          Contact Me
        </button>
      </div>
    </div>
  );
};

export default Jobs;
