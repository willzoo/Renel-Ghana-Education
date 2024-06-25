import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../Indicators.css'

function Indicator(props) { // base indicator text and icon
    return (
        <section>
            <div className="row"> {/* container for indicator content */}
                <div>
                    <div className={`icon ${props.info.theme}`}> {/* add icon shape with icon inside, color is based on passed theme */}
                        <FontAwesomeIcon icon={props.info.icon} />
                    </div>
                    <p className="label">{props.info.title}</p> {/* add label on the left */}
                </div>
                <p className="value">{props.info.value}</p> {/* add value on the right */}
            </div>
        </section>
    );
}
export default Indicator;