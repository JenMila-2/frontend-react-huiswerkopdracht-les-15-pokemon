import React from 'react';
import './Button.css';

//Button component for the navigation on the main page. Button can be re-used.
function Button({children, clickHandler, disabled}) {
    return (
        <button
            type="button"
            className="navigation-button"
            onClick={clickHandler}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default Button;