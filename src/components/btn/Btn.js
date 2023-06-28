import React from 'react'
import "./btn.css"

export default function Btn({ className, onClick, icon, text }) {
    return (
        <button
            className={`btn ${className}`}
            onClick={onClick}
        >
            <div className="icon-wrapper">
                <i>{icon}</i>
            </div>
            <span>{text}</span>
        </button>
    )
}
