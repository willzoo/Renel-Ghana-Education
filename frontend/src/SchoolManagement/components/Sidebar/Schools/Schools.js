import React, { useContext, useEffect } from "react";
import SchoolItem from '../SchoolItem/SchoolItem'
import './Schools.css'
import AdminContext from "../../../../AdminContext";

function SchoolsList(props) {
    const { schoolInfo, setSchoolInfo } = useContext(AdminContext).schoolInfo;
    const {selectedSchool, setSelectedSchool} = useContext(AdminContext).selectedSchool;
    const {selectedTeacher, setSelectedTeacher} = useContext(AdminContext).selectedTeacher;

    const deselectAll = () => {
        if (!selectedSchool) return;
    
        const sidebarSchoolElements = Array.from(document.getElementsByClassName('sidebar-school'));
        if (!sidebarSchoolElements) return;
    
        sidebarSchoolElements.forEach((element) => {
          element.classList.remove('selected');
        });
        
        setSelectedSchool(null);
        setSelectedTeacher(null);
    }

    let schoolList = [];
    for (let i = 0; i < schoolInfo.length; i++) {
        // add each schoolItem to items list with data set by each class info
        schoolList.push((<SchoolItem id={i} data={schoolInfo[i]} />));
    }

    return (
        <div className="sidebar-schools-container" onClick={deselectAll}>
            {/* Section title */}
            <h1>Schools</h1>
            <p>Select a school to view students</p>

            {/* Display list of schools */}
            <div id="schools-root" className="sidebar-schools">
                <section>
                    <ul className="nobullet"> {/* Display list with no bullet points */}
                        {schoolList.length === 0 ? /* if school list is empty, display list-issue, otherwise display schools */
                            (<li key="error"><div className="list-issue">There are no schools in the database.</div></li>) :
                            (schoolList)
                        }
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default SchoolsList;