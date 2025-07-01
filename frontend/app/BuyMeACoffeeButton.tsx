// components/BuyMeACoffeeButton.tsx
import React from 'react';

const BuyMeACoffeeButton: React.FC = () => {
  return (
    <div className="flex justify-center mt-8">
      <a href="https://buymeacoffee.com/nihalnoor" target="_blank" rel="noopener noreferrer">
        <img
          src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=YOUR_USERNAME&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"
          alt="Buy Me a Coffee"
          style={{ height: '50px !important', width: '200px !important' }}
        />
      </a>
    </div>
  );
};

export default BuyMeACoffeeButton;