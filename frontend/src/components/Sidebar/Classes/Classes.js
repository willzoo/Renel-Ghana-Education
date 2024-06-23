import React, { useContext, useEffect } from "react";
import ClassItem from '../ClassItem/ClassItem'
import './Classes.css'
import TeacherContext from "../../../TeacherContext";

function ClassesList(props) {
    const { classInfo, setClassInfo } = useContext(TeacherContext).classInfo;
    const {selectedClass, setSelectedClass} = useContext(TeacherContext).selectedClass;

    let classList = [];
    for (let i = 0; i < classInfo.classes.length; i++) {
        // add each classItem to items list with data set by each class info
        classList.push((<ClassItem id={i} data={classInfo.classes[i]} />));
    }

    // const sidebarClassElements = Array.from(document.getElementsByClassName('sidebar-class'));
    // if (sidebarClassElements) {
    //     sidebarClassElements.forEach((element) => {
    //         element.classList.remove('selected');
    //     });

    //     const clickedElement = sidebarClassElements.find(cls =>
    //         cls.class_name === selectedClass.class_name && cls.grade_level === selectedClass.grade_level
    //     );
    //     clickedElement.classList.add('selected');
    // }

    // if (selectedClass && selectedClass.id === props.data.id) {
    //     document.getElementById('class-name-edit').value = selectedClass.class_name != selectedClass.grade_level ? selectedClass.class_name : "";
    //     document.getElementById('grade-level-edit').value = selectedClass.grade_level;
    // }

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