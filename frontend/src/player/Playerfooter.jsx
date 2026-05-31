

import React from 'react';

const Playerfooter = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Gradient Logo Text */}
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white text-transparent">
             Dev
            </h1>
          </div>

          {/* Navigation Links */}
          <nav className="mb-6">
            <ul className="flex space-x-8">
              <li>
                <a href="#" className="text-red-500 hover:text-red-400">
                  HOME
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  TAGS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  SUPPORT
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  TERMS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  DMCA
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  18 U.S.C. 2257
                </a>
              </li>
            
            </ul>
          </nav>

          {/* Description */}
          <p className="text-center mb-4 text-gray-400">
            SpicyMMS - Tons of desi MMS and Indian sex videos!
          </p>

          {/* Copyright */}
          <p className="text-center text-gray-500">
            © 2026. SpicyMMS.com - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Playerfooter;