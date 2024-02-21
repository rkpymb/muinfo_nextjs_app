// YourComponent.js

import React, { useState, useEffect } from 'react';
import Mstyles from '../../../Styles/home.module.css'

const YourComponent = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        console.log(window.scrollY)
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${Mstyles.navbar} ${scrolling ? Mstyles.white : Mstyles.transparent}`}>
      {/* Your navbar content goes here */}
    </nav>
  );
};

export default YourComponent;
