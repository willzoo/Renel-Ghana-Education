import React, { useContext, useEffect } from "react";
import ClassItem from '../ClassItem/ClassItem'
import './Classes.css'
import TeacherContext from "../../../../TeacherContext";

function Classes() { // container for classes
    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;
    const {selectedStudent, setSelectedStudent} = useContext(TeacherContext).selectedStudent;

    const deselectAll = () => { // deleselct all classes when the background is clicked
        setSelectedClass(null); // deselect class
        setSelectedStudent(null); // deselect student
    }

    let classList = []; // initialize blank class list
    for (let i = 0; i < classInfo.classes.length; i++) {
        classList.push((<ClassItem id={i} data={classInfo.classes[i]}/>)); // add new class item to list
    }

    return (
        <div className="sidebar-classes-container" onClick={deselectAll}> {/* deselect all classes when backdrop is selected */}
            {/* Section title */}
            <h1>Classes</h1>
            <p>Select a class to view students</p>
            {/* Display list of classes */}
            <div id="classes-root" className="sidebar-classes">
                <section>
                    <ul className="nobullet"> {/* Display list with no bullet points */}
                        {classList.length === 0 ? /* if class list is empty, display list-issue, otherwise display classes */
                            (<li key="error"><div className="list-issue">There are no classes associated with this teacher.</div></li>) :
                            (classList)
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default Classes;