import React from "react"

const IconsBtn = ({
    text , 
    onClick, 
    children, 
    disabled = false, 
    customClasses = "" ,

}) => {
    return (
        <button
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center gap-2 rounded-lg bg-yellow-500 px-5 py-4 font-semibold text-gray-900 hover:scale-95 transition-all durable-200 ${customClasses} `}
        >

        <span>{text} </span>
        {children}


        </button>

    )
}


export default IconsBtn;