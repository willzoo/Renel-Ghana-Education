import React, { useContext } from "react";
import TeacherContext from "../../../TeacherContext";

import './Profile.css'

function Profile() {
    const {classInfo, setClassInfo} = useContext(TeacherContext).classInfo;

    return (
        <section className="profile">
            <p id="teacher-name" className="name">{classInfo.name}</p>
            <p id="school-name" className="info">{classInfo.school_name}</p>
            <br />
            <p id="teacher-email" className="info" style={{fontSize: '15px'}}>{classInfo.email}</p>
        </section>
    );
}

export default Profile;