import React from "react";
import StudentItem from "../StudentItem/StudentItem";

function StudentsList(props) {
    // document.getElementsByClassName("students-title")[0].textContent = selectedClass.class_name;

    let items = [];
    for (let i = 0; i < props.info.students.length; i++) {
        items.push((<StudentItem id={i} data={props.info.students[i]} />));
    }

    const classList = items;

    if (items.length == 0) {
        return (
            <ul className="nobullet">
                <li><div className="list-issue">There are no students that have been added to this class.</div></li>
            </ul>
        );
    }

    return (
        <ul className="nobullet">
            {classList}
        </ul>
    );
}

export default StudentsList;