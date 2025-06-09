import React from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const { theme } = useSelector((store) => store.theme); // Accessing the theme from Redux
  const hasNotification = false; // Toggle this to true to simulate notifications

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme === 'light'
          ? 'bg-gray-900 text-white'
          : 'bg-gradient-to-l from-[#7DC387] to-[#DBE9EA] text-gray-800'
      }`}
    >
      {hasNotification ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">You have new notifications!</h2>
          <p className="text-lg">Check out the latest updates and alerts.</p>
        </div>
      ) : (
        <div className="text-center">
          <img
            src="https://img.freepik.com/free-vector/neon-style-coming-soon-glowing-background-design_1017-25516.jpg"
            alt="Coming Soon"
            className="mx-auto  w-60 h-60 mb-6 rounded-lg shadow-lg"
          />
          <h2 className="text-2xl font-semibold mb-4">No Notifications Yet</h2>
          <p className="text-lg">
            It seems like you're all caught up! We'll notify you when there’s something new. Stay tuned for updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
