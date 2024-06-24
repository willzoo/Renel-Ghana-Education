import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Indicators.css'

function Indicator(props) {
    return (
        <section>
            <div className="row">
                <div>
                    <div className={`icon ${props.info.theme}`}>
                        <FontAwesomeIcon icon={props.info.icon} />
                    </div>
                    <p className="label">{props.info.title}</p>
                </div>
                <p className="value">{props.info.value}</p>
            </div>
        </section>
    );
}
export default Indicator;