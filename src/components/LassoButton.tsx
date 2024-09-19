import React from "react";
import './LassoButton.css';

interface LassoButtonProps {
  onClick: () => void;
  children: React.ReactNode; 
}

const LassoButton: React.FC<LassoButtonProps> = ({ onClick, children }) => {
  return (
    <div className="lasso" onClick={onClick}>
      <div className="lasso-text">
        {children} {/* O texto é passado como children */}
      </div>
      <div className="lasso-wrap">
        <div className="lasso-triangle"></div>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="58px" height="58px" viewBox="0 0 16 16" preserveAspectRatio="none">
          <circle cx="8" cy="8" r="6.215" transform="rotate(90 8 8)" />
        </svg>
      </div>
      <div className="lasso-border"></div>
    </div>
  );
};

export default LassoButton;
