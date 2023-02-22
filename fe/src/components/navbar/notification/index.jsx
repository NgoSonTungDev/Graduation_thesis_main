import React from "react";
import "./index.scss"
export default function Notification(props) {
    return (
        <div>
            <div className="men">
                <div className={`notification ${props.type}`}>
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    );
}