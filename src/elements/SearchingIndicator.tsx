import React from 'react';
import '../style/SearchingIndicator.css'; 

const SearchingIndicator = () => {
    return (
        <div className="searching-indicator">
            <div className="loading-circle"></div>
            <p>Searching for another player...</p>
        </div>
    );
};

export default SearchingIndicator;
