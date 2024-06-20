import React from "react";
import ClassItem from '../ClassItem/ClassItem'
import './Classes.css'

function ClassesList(props) {
    let classList = [];
    for (let i = 0; i < props.info.classes.length; i++) {
        // add each classItem to items list with data set by each class info
        classList.push((<ClassItem id={i} data={props.info.classes[i]} />));
    }

    return (
        <div className="sidebar-classes-container">
            {/* Section title */}
            <h1>Classes</h1>
            <p>Select a class to view students</p>

            {/* Display list of classes */}
            <div id="classes-root" className="sidebar-classes">
                <section>
                    <ul className="nobullet"> {/* Display list with no bullet points */}
                        {classList.length === 0 ? /* if class list is empty, display list-issue, otherwise display classes */
                            (<li><div className="list-issue">There are no classes associated with this teacher.</div></li>) :
                            (classList)
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default ClassesList;