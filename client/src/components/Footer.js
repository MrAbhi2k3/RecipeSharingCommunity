import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faDiscord, faInstagram, faTelegram, faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <img src={logo} alt="Logo" className="w-20 h-auto mb-2" />
          <p className="text-center md:text-left text-sm">
            &copy; {new Date().getFullYear()} MrAbhi2k3. All Rights Reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start md:mt-0 mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <NavLink to="/recipes" className="hover:text-blue-400 transition duration-200">
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink to="/favouriteRecipes" className="hover:text-blue-400 transition duration-200">
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink to="/addRecipe" className="hover:text-blue-400 transition duration-200">
                Add Recipe
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-blue-400 transition duration-200">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center md:items-end mt-4 md:mt-0">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/mrabhi2k3" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://discord.gg/qPDzU64r" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faDiscord} size="2x" />
            </a>
            <a href="https://instagram.com/mrabhi_2k3" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="https://t.me/TeleRoidGRoup" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faTelegram} size="2x" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="mailto:mrabhi2k3@example.com" className="hover:text-blue-400 transition duration-200">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider and Bottom Text */}
      <div className="border-t border-gray-700 mt-6 pt-4">
        <p className="text-center text-sm text-gray-400">
          Designed and Developed with ❤️ by MrAbhi2k3. For inquiries, contact us via social media or email.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
