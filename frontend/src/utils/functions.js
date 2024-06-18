import './global'

//------------------------------------------ GLOBAL VARIABLES ---------------------------------------------

//------------------------------------------ HELPER FUNCTIONS -----------------

function waitForDefinition(variableName) {
    return new Promise((resolve, reject) => {
        const checkInterval = 200; // Check every 200 milliseconds
        const maxChecks = 10000; // Maximum number of checks before giving up (to avoid infinite loop)
        let checks = 0;

        const intervalId = setInterval(() => {
            checks++;
            if (typeof window[variableName] !== 'undefined') {
                clearInterval(intervalId);
                resolve(window[variableName]);
            } else if (checks >= maxChecks) {
                clearInterval(intervalId);
                reject(new Error('Variable is not defined within the expected time.'));
            }
        }, checkInterval);
    });
}

//------------------------------------------- REUSABLE COMPONENTS -------------------------------------------


//------------------------------------------- CREATE NEW CLASS COMPONENT -------------------------------------------

// let addClassInfo = {
//     className: { title: "Class Name", placeholder: "Enter a class name", id: "class-name" },
// };

// let addClassDropdown = [
//     ["Grade Level", "grade-level"],
//     ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
//     ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
//     ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
// ];

// function ClassInput() {
//     let handleSubmit = (event) => {
//         event.preventDefault();
//         CloseModal("class-add");

//         let className = document.getElementById('class-name').value;
//         let gradeLevel = document.getElementById('grade-level').value;

//         let content = {
//             "class_name": className,
//             "grade_level": gradeLevel,
//             "teacher_id": "665da0b90c1d6c0c45724285",
//             "school_id": "665da7c60c1d6c0c45724286",
//             "students": []
//         };

//         classInfo.push(content);

//         selectedClass = classInfo.at(-1);

//         classInfo.sort((a, b) => {
//             return a.class_name.localeCompare(b.class_name);
//         });

//         fetch('http://127.0.0.1:8000/classes', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(content)
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data received:', data);
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });

//         // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));

//         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//         // ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level" icon="fa fa-book" />, document.getElementById("grade-level-indicator"));
//         // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
//     }

//     return (
//         <section style={{ margin: '50px' }}>
//             <form id="class-modal-form" onSubmit={handleSubmit}>
//                 <div id="class-add-text-input">
//                     <TextInput title={addClassInfo.className.title}
//                         placeholder={addClassInfo.className.placeholder}
//                         id={addClassInfo.className.id} />
//                     <br />
//                     <Dropdown data={addClassDropdown} />
//                     <br /><br /><br /><br />
//                 </div>
//                 <SubmitButton value="Create" />
//             </form>
//         </section>
//     );
// }

// ReactDOM.render(<ClassInput />, document.getElementById("class-add-modal-root"));

//------------------------------------------- EDIT CLASS COMPONENT -------------------------------------------

// function ClassEditInput() {
//     let handleSubmit = (event) => {
//         event.preventDefault();
//         CloseModal("class-edit");

//         let className = document.getElementById('class-name').value;
//         let gradeLevel = document.getElementById('grade-level').value;

//         let content = {
//             "class_name": className,
//             "grade_level": gradeLevel,
//             "teacher_id": "665da0b90c1d6c0c45724285",
//             "school_id": "665da7c60c1d6c0c45724286",
//             "students": []
//         };

//         fetch('http://127.0.0.1:8000/classes', {
//             method: "PATCH",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(content)
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data received:', data);
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });

//         // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));

//         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//         // ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level" icon="fa fa-book" />, document.getElementById("grade-level-indicator"));
//         // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
//     }

//     return (
//         <section style={{ margin: '50px' }}>
//             <form id="class-edit-modal-form" onSubmit={handleSubmit}>
//                 <div id="class-edit-text-input">
//                     <TextInput title={addClassInfo.className.title}
//                         placeholder={addClassInfo.className.placeholder}
//                         id={addClassInfo.className.id}/>
//                     <br />
//                     <Dropdown data={addClassDropdown}/>
//                     <br /><br /><br /><br />
//                 </div>
//                 <SubmitButton value="Save" />
//             </form>
//         </section>
//     );
// }

// ReactDOM.render(<ClassEditInput />, document.getElementById("class-edit-modal-root"));

//------------------------------------------- ADD NEW STUDENT COMPONENT -------------------------------------------

// let newStudentInfo = {
//     studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name" },
//     studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id" },
//     studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob" },
//     guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name" },
//     guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact" },
//     studentMedical: { title: "Student Medical Information", placeholder: "Any known allergies? Other valuable information?", id: "student-medical" },
//     disabilityStatus: { title: "Disability Status", id: "disability-status" },
//     additionalInfo: { title: "Additional Information", placeholder: "Any additional information about the student?", id: "additional-info" },
// }

// function NewStudentInput() {
//     let handleNewStudentSubmit = (event) => {
//         event.preventDefault();
//         CloseModal("new-student");
        
//         console.log("returning student 2: " + RETURNING_STUDENT_ID);

//         let studentName = document.getElementById('student-name').value;
//         let studentID = RETURNING_STUDENT_ID;
//         let studentDOB = document.getElementById('student-dob').value;
//         let guardianName = document.getElementById('guardian-name').value;
//         let guardianContact = document.getElementById('guardian-contact').value;
//         let studentMedical = document.getElementById('student-medical').value;
//         let disabilityStatus = document.getElementById('disability-status').value;
//         let additionalInfo = document.getElementById('additional-info').value;

//         let content = {
//             'name': studentName,
//             'guardian_name': guardianName,
//             'guardian_contact': guardianContact,
//             'dob': studentDOB,
//             "student_school_id": studentID,
//             'disabled': disabilityStatus,
//             'health_conditions': studentMedical,
//             'misc_info': additionalInfo,
//             'class_id': selectedClass._id,
//             'grade_level': "Primary 2",
//             'school_id': "nb9s",
//             'history': [],
//         };

//         selectedClass.students.push(content);

//         fetch('http://127.0.0.1:8000/students', {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(content)
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data received:', data);
//             })
//             .catch(error => {
//                 console.error('There was a problem with the fetch operation:', error);
//             });

//         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//         // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));
//         // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
//     }

//     return (
//         <section style={{ margin: '50px' }}>
//             <form id="new-student-form" onSubmit={handleNewStudentSubmit}>
//                 <section id="new-student-text-input">
//                     <TextInput title={newStudentInfo.studentName.title}
//                         placeholder={newStudentInfo.studentName.placeholder}
//                         id={newStudentInfo.studentName.id} />
//                     <TextInput title={newStudentInfo.studentDOB.title}
//                         placeholder={newStudentInfo.studentDOB.placeholder}
//                         id={newStudentInfo.studentDOB.id} />
//                     <TextInput title={newStudentInfo.guardianName.title}
//                         placeholder={newStudentInfo.guardianName.placeholder}
//                         id={newStudentInfo.guardianName.id} />
//                     <TextInput title={newStudentInfo.guardianContact.title}
//                         placeholder={newStudentInfo.guardianContact.placeholder}
//                         id={newStudentInfo.guardianContact.id} />
//                     <TextInput title={newStudentInfo.studentMedical.title}
//                         placeholder={newStudentInfo.studentMedical.placeholder}
//                         id={newStudentInfo.studentMedical.id} />
//                     <br />
//                     <Checkbox id={newStudentInfo.disabilityStatus.id}
//                         name={newStudentInfo.disabilityStatus.id}
//                         title={newStudentInfo.disabilityStatus.title} />
//                     <TextInput title={newStudentInfo.additionalInfo.title}
//                         placeholder={newStudentInfo.additionalInfo.placeholder}
//                         id={newStudentInfo.additionalInfo.id} />
//                 </section>
//                 <br /><br /><br /><br />
//                 <SubmitButton value="Add" />
//             </form>
//         </section>
//     );
// }

// ReactDOM.render(<NewStudentInput />, document.getElementById("new-student-modal-root"));

//------------------------------------------- EDIT STUDENT COMPONENT -------------------------------------------

// let editStudentInfo = {
//     studentName: { title: "Student Name", placeholder: "Please enter student name", id: "student-name-edit" },
//     studentID: { title: "Student ID", placeholder: "Please enter student ID", id: "student-id-edit" },
//     studentDOB: { title: "Date of Birth", placeholder: "Format: DD/MM/YYYY", id: "student-dob-edit" },
//     guardianName: { title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name-edit" },
//     guardianContact: { title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact-edit" },
//     studentMedical: { title: "Student Medical Information", placeholder: "Any known allergies? Other valuable information?", id: "student-medical-edit" },
//     disabilityStatus: { title: "Disability Status", id: "disability-status-edit" },
//     additionalInfo: { title: "Additional Information", placeholder: "Any additional information about the student?", id: "additional-info-edit" },
// }

// function EditStudentInput(props) {
//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const studentData = {
//             name: document.getElementById(editStudentInfo.studentName.id).value,
//             student_school_id: document.getElementById(editStudentInfo.studentID.id).value,
//             dob: document.getElementById(editStudentInfo.studentDOB.id).value,
//             guardian_name: document.getElementById(editStudentInfo.guardianName.id).value,
//             guardian_contact: document.getElementById(editStudentInfo.guardianContact.id).value,
//             health_conditions: document.getElementById(editStudentInfo.studentMedical.id).value,
//             disabled: document.getElementById(editStudentInfo.disabilityStatus.id).checked,
//             misc_info: document.getElementById(editStudentInfo.additionalInfo.id).value
//         };

//         fetch(`http://127.0.0.1:8000/students/${props.student._id}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(studentData)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Student information updated:', data);
//             const studentIndex = selectedClass.students.findIndex(student => student._id === props.student._id);
//             if (studentIndex > -1) {
//                 selectedClass.students[studentIndex] = studentData;
//                 selectedClass.students[studentIndex]['_id'] = props.student._id;
//                 // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//             }
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
//         CloseModal("edit-student");

//         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//     };

//     console.log("Edit student input called: " + props.student.name);
//     return (
//         <section style={{ margin: '50px' }}>
//             <form id="edit-student-form" onSubmit={handleSubmit}>
//                 <section id="edit-student-text-input">
//                     <TextInput title={editStudentInfo.studentName.title}
//                         placeholder={editStudentInfo.studentName.placeholder}
//                         id={editStudentInfo.studentName.id} 
//                         defaultValue={props.student.name} />
//                     <TextInput title={editStudentInfo.studentDOB.title}
//                         placeholder={editStudentInfo.studentDOB.placeholder}
//                         id={editStudentInfo.studentDOB.id}
//                         defaultValue={props.student.dob} />
//                     <TextInput title={editStudentInfo.studentID.title}
//                         placeholder={editStudentInfo.studentID.placeholder}
//                         id={editStudentInfo.studentID.id}
//                         defaultValue={props.student.student_school_id} />
//                     <TextInput title={editStudentInfo.guardianName.title}
//                         placeholder={editStudentInfo.guardianName.placeholder}
//                         id={editStudentInfo.guardianName.id}
//                         defaultValue={props.student.guardian_name} />
//                     <TextInput title={editStudentInfo.guardianContact.title}
//                         placeholder={editStudentInfo.guardianContact.placeholder}
//                         id={editStudentInfo.guardianContact.id}
//                         defaultValue={props.student.guardian_contact} />
//                     <TextInput title={editStudentInfo.studentMedical.title}
//                         placeholder={editStudentInfo.studentMedical.placeholder}
//                         id={editStudentInfo.studentMedical.id}
//                         defaultValue={props.student.health_conditions} />
//                     <br />
//                     <Checkbox id={editStudentInfo.disabilityStatus.id}
//                         name={editStudentInfo.disabilityStatus.id}
//                         title={editStudentInfo.disabilityStatus.title}
//                         defaultValue={props.student.disabled} />
//                     <TextInput title={editStudentInfo.additionalInfo.title}
//                         placeholder={editStudentInfo.additionalInfo.placeholder}
//                         id={editStudentInfo.additionalInfo.id}
//                         defaultValue={props.student.misc_info} />
//                 </section>
//                 <br /><br /><br /><br />
//                 <SubmitButton value="Save" />
//             </form>
//         </section>
//     );
// }

//------------------------------------------- ADD RETURNING STUDENT COMPONENT -------------------------------------------      

// let returningStudentInfo = {
//     studentID: { title: "Student ID", placeholder: "Find Student", id: "returning-student-id-request" },
// }

// function ReturningStudentInput() {
//     const handleSubmit = (event) => {
//         event.preventDefault();

//         CloseModal("returning-student");
//         let id = document.getElementById("returning-student-id-request").value;
//         //Global variable to be used later with in add new student
//         RETURNING_STUDENT_ID = document.getElementById("returning-student-id-request").value;
//         console.log("returning student: " + RETURNING_STUDENT_ID);
//         if (selectedClass.students.find(student => student.student_school_id === id)) {
//             OpenModal("edit-student", id);
//         }
//         else {
//             OpenModal("new-student");
//         }

//     }

//     return (
//         <section style={{ margin: '50px' }}>
//             <form id="returning-student-form" onSubmit={handleSubmit}>
//                 <section id="returning-student-text-input">
//                     <TextInput title={returningStudentInfo.studentID.title}
//                         placeholder={returningStudentInfo.studentID.placeholder}
//                         id={returningStudentInfo.studentID.id} />
//                     </section>
//                 <br /><br /><br /><br />
//                 <SubmitButton value="Search" />
//             </form>
//         </section>
//     );
// }

// ReactDOM.render(<ReturningStudentInput />, document.getElementById("returning-student-modal-root"));

//------------------------------------------- ADD TRANSFER STUDENT COMPONENT -------------------------------------------

// let transferStudentInfo = {
//     studentID: { title: "Student ID", placeholder: "Student ID", id: "student-id" },
// }

// function TransferStudentInput() {
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         CloseModal('transfer-student');
//     }

//     return (
//         <section style={{ margin: '50px' }}>
//             <form id="transfer-student-form" onSubmit={handleSubmit}>
//                 <section id="transfer-student-text-input">
//                     <TextInput title={transferStudentInfo.studentID.title}
//                         placeholder={transferStudentInfo.studentID.placeholder}
//                         id={transferStudentInfo.studentID.id} />
//                 </section>
//                 <br /><br /><br /><br />
//                 <SubmitButton value="Select" />
//             </form>
//         </section>
//     );
// }

// ReactDOM.render(<TransferStudentInput />, document.getElementById("transfer-student-modal-root"));

//------------------------------------------- MODAL -------------------------------------------

const pause = (time) => new Promise(resolve => setTimeout(resolve, time));

export const OpenModal = (id, studentID = "-1") => {
    let underlay = document.getElementById(`${id}-modal-underlay`);
    underlay.classList.add("blurred-modal-underlay");

    let modal = underlay.querySelector(`#${id}-modal`);
    modal.classList.add("displayed-modal");

    underlay.style.display = "block";

    if (id == "edit-student" && studentID !== "-1") {
        console.log(`Editing student with ID: ${studentID}`);
    }
}

export const CloseModal = async (id) => {
    let underlay = document.getElementById(`${id}-modal-underlay`);
    underlay.classList.remove("blurred-modal-underlay");

    let modal = underlay.querySelector(`#${id}-modal`);
    modal.classList.remove("displayed-modal");
    await pause(200);

    try {

        let textInputs = Array.from(modal.querySelector(`#${id}-text-input`).children);

        textInputs.forEach((item) => {
            try {
                Array.from(item.children).forEach((input => {
                    input.value = "";
                }));
            } catch (e) { };
        });
    } catch (e) { };

    underlay.style.display = "none";

    // Unmount the React component for the edit student modal
    if (id === "edit-student") {
        // ReactDOM.unmountComponentAtNode(document.getElementById("edit-student-modal-root"));
    }
}

//------------------------------------------- CLASS LIST ITEM COMPONENTS -------------------------------------------

var teacherID = "665da0b90c1d6c0c45724285";
var classInfo;
var selectedClass;

// function ClassItem(props) {
//     const handleEditClick = () => {
//         OpenModal('class-edit');
//     }

//     const handleClassClick = () => {
//         selectedClass = props.data;
//         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//         // ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level" icon="fa fa-book" />, document.getElementById("grade-level-indicator"));
//         // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"));
//     };

//     return (
//         <li>
//             <div className="sidebar-class" onClick={handleClassClick}>
//                 <div>
//                     <p className="class-info">{props.data.class_name}</p>
//                     <p className="class-info-body">{props.data.grade_level}</p>
//                     <p className="class-info-body">Total Enrolled Students: {props.data.students.length}</p>
//                 </div>
//                 <div className="edit-button">
//                     <p className="edit-text" onClick={handleEditClick}>Edit</p>
//                 </div>
//             </div>
//         </li>
//     );
// }

// function AddClasses(props) {
//     let items = [];
//     for (let i = 0; i < props.classes.length; i++) {
//         items.push((<ClassItem data={props.classes[i]} />));
//     }

//     const classList = items;

//     if (items.length == 0) {
//         return (
//             <section>
//                 <ul className="nobullet">
//                     <li><div className="list-issue">There are no classes associated with this teacher.</div></li>
//                 </ul>
//             </section>
//         );
//     }

//     return (
//         <section>
//             <ul className="nobullet">
//                 {classList}
//             </ul>
//         </section>
//     );
// }

// fetch(`http://127.0.0.1:8000/teachers/${teacherID}/classes`, {
//     method: "GET",
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Data received:', data);
//         classInfo = data;

//         classInfo.sort((a, b) => {
//             return a.class_name.localeCompare(b.class_name);
//         });

//         selectedClass = classInfo[0];
//         // ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });

// function Indicator(props) {
//     return (
//         <section>
//             <div className="row">
//                 <div>
//                     <div className={`upper-info-icon-shape ${props.theme}`}>
//                         <i className={`${props.icon} upper-info-icon`}></i>
//                     </div>
//                     <p className="label">{props.title}</p>
//                 </div>
//                 <p className="value">{props.value}</p>
//             </div>
//         </section>
//     );
// }

// waitForDefinition('selectedClass')
//     .then(() => {
//         console.log("Selected class defined for grade level")
//         // ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level" icon="fa fa-book" />, document.getElementById("grade-level-indicator"))
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// waitForDefinition('selectedClass')
//     .then((value) => {
//         console.log("Selected class defined for students")
//         // ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students" icon="fa fa-graduation-cap" />, document.getElementById("num-students-indicator"))
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// ReactDOM.render(<Indicator title="Current Term" value="2" theme="term-number" icon="fa fa-calendar-o" />, document.getElementById("current-term-indicator"))

//------------------------------------------- STUDENT LIST ITEM COMPONENTS -------------------------------------------

// var students = [
//     {
//         name: "Bob Ross",
//         parent_contact: "thisisaparentcontact@gmail.com",
//         dob: 1,
//         student_school_id: "bap5",
//         disabled: "Yes",
//         health_conditions: "a couple",
//         misc_info: ""
//     }
// ];

// function StudentItem(props) {
//     const handleEdit = (event) => {
//         console.log("Student item function called")
//         // ReactDOM.render(<EditStudentInput student={props.data} />, document.getElementById("edit-student-modal-root"));
//         OpenModal("edit-student");
//     }
//     return (
//         <li>
//             <div className="student-list-item">
//                 <div>
//                     <p className="student-info">{props.data.name}</p>
//                     <p className="student-info-body">Student ID: {props.data.student_school_id}</p>
//                     <p className="student-info-body">Disability: {props.data.disabled}</p>
//                 </div>
//                 <div>
//                     <p className="student-info">Parent Contact Information</p>
//                     <p className="student-info-body">{props.data.guardian_contact}</p>
//                 </div>
//                 <div>
//                     <p className="student-info-body" onClick={handleEdit}>Edit</p>
//                 </div>
//             </div>
//         </li>
//     );
// }

// function AddStudents(props) {
//     document.getElementsByClassName("students-title")[0].textContent = selectedClass.class_name;

//     let items = [];
//     for (let i = 0; i < props.students.length; i++) {
//         items.push((<StudentItem data={props.students[i]} />));
//     }

//     const classList = items;

//     if (items.length == 0) {
//         return (
//             <ul className="nobullet">
//                 <li><div className="list-issue">There are no students that have been added to this class.</div></li>
//             </ul>
//         );
//     }

//     return (
//         <ul className="nobullet">
//             {classList}
//         </ul>
//     );
// }

// waitForDefinition('classInfo')
//     .then((value) => {
//         console.log('classInfo is defined:', value);
//         document.getElementById("teacher-name").textContent = "We need to add this";
//         document.getElementById("teacher-email").textContent = "and also this @gmail.com";
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// waitForDefinition('selectedClass')
//     .then((value) => {
//         console.log('selectedClass is defined:', value);
//         // ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
//     })
//     .catch((error) => {
//         console.error(error);
//     });

// waitForDefinition('selectedClass')
//     .then((value) => {
//         console.log('selectedClass is defined:', value);
//         CloseModal("loading");
//     })
//     .catch((error) => {
//         console.error(error);
//     });