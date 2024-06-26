import React from "react";
import './Loading.css'

function Loading() {
    return (
        <div className="loading-container">
            <svg width="50" height="50" viewBox="-30 -30 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle className="loading" r="12"  stroke="#aaaaaa" strokeWidth="4" strokeLinecap="round" strokeDashoffset="67px" fill="transparent" strokeDasharray="94.2px"></circle>
            </svg>
        </div>
    )
}

export default Loading;