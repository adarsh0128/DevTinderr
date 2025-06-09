const About = () => {
  return (
    <div
      className="about-container relative mx-auto p-10 rounded-2xl shadow-lg max-w-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-500 ease-in-out"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-xl">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900 tracking-wider">
          About Abhishek Singh
        </h2>
        <div className="info-container space-y-8 text-gray-800">
          <div className="section bg-white bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-xl font-semibold mb-1">Schooling</p>
            <p className="text-lg">
              Sadhana Devi Vidyapith , Samastipur , Bihar - Percentage:{" "}
              <span className="highlight text-blue-700 font-bold">85.6%</span>
            </p>
          </div>

          <div className="section bg-white bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-xl font-semibold mb-1">Intermediate</p>
            <p className="text-lg">
              Sadhana Devi Vidyapith , Samastipur , Bihar - Percentage:{" "}
              <span className="highlight text-blue-700 font-bold">81%</span>
            </p>
          </div>

          <div className="section bg-white bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-xl font-semibold mb-1">Current Education</p>
            <p className="text-lg">
              Pursuing B.Tech in ECE from National Institute of Technology ,
              Agartala (2022-26)
            </p>
          </div>

          <div className="section bg-white bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-xl font-semibold mb-1">Skills</p>
            <p className="text-lg">Web Development, DSA , CS Fundamentals</p>
          </div>

          {/* <div className="section bg-white bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-xl font-semibold mb-1">Internship</p>
            <p className="text-lg">Innomatics Research Labs, Hyderabad</p>
          </div> */}

          <div className="section bg-white bg-opacity-70 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <p className="text-xl font-semibold mb-1">Contact Information</p>
            <p className="text-lg">
              <span className="font-semibold">Mobile:</span>{" "}
              <a
                href="tel:+918132020746"
                className="text-blue-500 hover:text-blue-700 hover:underline transition duration-300"
              >
                8132020746
              </a>
            </p>
            <p className="text-lg">
              <span className="font-semibold">WhatsApp:</span>{" "}
              <a
                href="https://wa.me/8132020746"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-800 hover:underline transition duration-300"
              >
                8132020746
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <a
            href="https://drive.google.com/file/d/1keW3TO7YNsnITt0kUZUyEVg-NRZSACv7/view?usp=drivesdk"
            download
            className="download-button py-3 px-8 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-110 transition duration-300"
          >
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
