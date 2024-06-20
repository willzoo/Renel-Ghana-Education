import './App.css';
// import {classInfo, selectedClass, teacherID} from '../utils/global'
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Modals from './Modals/Modals'
import { useEffect, useState, useContext } from 'react';
import { CloseModal, OpenModal } from '../utils/functions'
import TeacherContext from '../TeacherContext';

function App() {
    // export let RETURNING_STUDENT_ID = '';
    // export var teacherID = "665da0b90c1d6c0c45724285";

    const [classInfo, setClassInfo] = useState({
        "name": "Patrick Kallenbach",
        "email": "pkallenbach21@gmail.com",
        "school_name": "PK Yonge DRS",
        'classes': []
    });

    const [selectedClass, setSelectedClass] = useState(null);

    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/teachers/665da0b90c1d6c0c45724285/classes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setClassInfo(data);

                classInfo.classes.sort((a, b) => {
                    return a.class_name.localeCompare(b.class_name);
                });

                setSelectedClass(classInfo.classes[0]);

                CloseModal('loading');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);

                CloseModal('loading');
                OpenModal('error');
            });
    }, []);

    return (
        // Teacher context allows for classInfo and selectedClass to be passed throughout the application
        <TeacherContext.Provider value={{
            'classInfo': { classInfo, setClassInfo },
            'selectedClass': { selectedClass, setSelectedClass },
            'selectedStudent': { selectedStudent, setSelectedStudent }
        }}>
            <section>
                <div className="background">
                    <Modals /> {/* add each modal to the page */}
                    <Sidebar /> {/* add sidebar content */}
                    <Dashboard /> {/* add dashboard content */}
                </div>
            </section>
        </TeacherContext.Provider>
    );
}

export default App;
