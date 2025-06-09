import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const { theme } = useSelector((store) => store.theme);

  return (
    <footer
      className={`p-10 w-full ${
        theme === "light"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        <nav className="mb-6 md:mb-0">
          <h6 className="text-lg font-semibold mb-4">Developer Information</h6>
          <ul>
            <li>Adarsh Kumar</li>
            <li>8132020746</li>
            <li>therealxeroboy@gmail.com</li>
          </ul>
        </nav>

        <nav className="mb-6 md:mb-0">
          <h6 className="text-lg font-semibold mb-4">Company</h6>
          <ul className="space-y-2">
            <Link to="/app/about">
              <li>
                <a className="link link-hover">About us</a>
              </li>
            </Link>

            <Link to="/app/skills">
              <li>
                <a className="link link-hover">skills</a>
              </li>
            </Link>
            <Link to="/app/jobs">
              <li>
                <a className="link link-hover">Jobs</a>
              </li>
            </Link>
            <Link to="/app/contact">
              <li>
                <a className="link link-hover">Contact</a>
              </li>
            </Link>
          </ul>
        </nav>

        {/* <nav className="mb-6 md:mb-0">
          <h6 className="text-lg font-semibold mb-4">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://twitter.com" aria-label="Twitter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-blue-500 hover:text-blue-700 transition-colors duration-300"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-red-600 hover:text-red-800 transition-colors duration-300"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-blue-800 hover:text-blue-900 transition-colors duration-300"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav> */}
      </div>
      <div className="container mx-auto mt-10 text-center border-t border-gray-300 pt-4">
        <p className="text-sm">&copy; 2025 DevTinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
