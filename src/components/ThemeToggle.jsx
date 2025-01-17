import React, { useState, useEffect, useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from "react-tooltip";

const ThemeToggle = ({classList}) => {
   const { darkMood, setDarkMood } = useContext(AuthContext);

   function handleThemeToggle() {
      setDarkMood(!darkMood);
      // toast.success(!darkMood ? 'Dark Mood Applied' : 'Light Mood Applid');
   }

   return (
      <button
         onClick={handleThemeToggle}
         className={`p-3 rounded-xl focus:outline-none transition-all duration-300 bg-gray-200/40 dark:bg-gray-800/20 shadow-md hover:shadow-lg dark-light-mood`}
         aria-label="Toggle Theme"
      >
         {!darkMood ? (
            <FaMoon className="text-gray-600 text-xl dark:text-gray-300" />
         ) : (
            <FaSun className="text-yellow-400 text-xl" />
         )}

         <Tooltip
            anchorSelect=".dark-light-mood"
            content={!darkMood ? "Dark Mood" : "Light Mood"}
         />
      </button>
   );
};

export default ThemeToggle;
