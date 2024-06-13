function waitForDefinition(variableName) {
    return new Promise((resolve, reject) => {
      const checkInterval = 200; // Check every 50 milliseconds
      const maxChecks = 100; // Maximum number of checks before giving up (to avoid infinite loop)
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
  //Reusable HTML components
  const TextInput = (props) => {
    return (
      <section className="modal-text-input">
        <p class="modal-text-label">{props.title}</p>
        <input placeholder={props.placeholder} title={props.title} type="text" id={props.id} required/>
      </section>
    )
  }
    
  const SubmitButton = (props) => {
    return (
      <div className="modal-submit">
        <input type="submit" value={props.value}/>
      </div>
    );
  }
          

        
        const Dropdown = (props) => {
          let name = props.data[0][0];
          let id = props.data[0][1];

            return (
              <section className="modal-text-input">
                <select title={name} id={id} name={id} required>
                  <option className="modal-dropdown-default" value="" disabled selected> {name} </option>
                  {props.data.slice(1).map((group, index) => (
                    <optgroup key={index} label={group[0]}>
                      {group.slice(1).map((option, optionIndex) => (
                      <option key={optionIndex}>{option}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </section>
            );
          };

          const Checkbox = (props) => {
            return (
              <section className="modal-text-input">
                <label class="modal-text-label" for={props.id}>{props.title} &ensp;</label>
                <input class="modal-text-input" type="checkbox" id={props.id} name={props.name} value={props.title}/>
              </section>
            );
          }
         // functions for class add tool

         let addClassInfo = {
            className: {title: "Class Name", placeholder: "Enter a class name", id: "class-name"},
          }

          // grade dropdown data

          let addClassDropdown = [
            ["Grade Level", "grade-level"],
            ["Kindergarten", "Kindergarten 1", "Kindergarten 2"],
            ["Primary", "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
            ["Junior High", "Junior High 1", "Junior High 2", "Junior High 3"],
          ]

          // class description

          // build html and handle submission
          function Input() {
            let handleSubmit = (event) => {
              event.preventDefault();
              CloseModal("class-add");

              let className = document.getElementById('class-name').value;
              let gradeLevel = document.getElementById('grade-level').value;

              let content = {"class_name": className,
              "grade_level": gradeLevel,
              "teacher_id": "665da0b90c1d6c0c45724285",
              "school_id": "665da7c60c1d6c0c45724286",
              "students": []};

              classInfo.push(content);
              
              fetch('http://127.0.0.1:8000/classes',
                {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(content)
                }
              )
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log('Data received:', data);
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });

              ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));
            }

            return (
              <section style={{ margin: '50px' }}>
                <form id="class-modal-form" onSubmit={handleSubmit}>
                  <div id="class-add-text-input">
                  <TextInput title={addClassInfo.className.title}
                    placeholder={addClassInfo.className.placeholder}
                    id={addClassInfo.className.id}/>
                  <br/>
                  <Dropdown data={addClassDropdown} />
                  <br/><br/><br/><br/>
                  </div>
                  <SubmitButton value="Create"/>
                </form>
              </section>
            )
          }
          
          ReactDOM.render(<Input />, document.getElementById("class-add-modal-root"));
           // functions for new student tool

           let newStudentInfo = {
            studentName: {title: "Student Name", placeholder: "Please enter student name", id: "student-name"},
            studentID: {title: "Student ID", placeholder: "Please enter student ID", id: "student-id"},
            guardianName: {title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name"},
            guardianContact: {title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact"},
            studentMedical: {title: "Student Medical Information", placeholder: "Any known allergies? Other valuable information?", id: "student-medical"},
            disabilityStatus: {title: "Disability Status", id: "disability-status"},
            additionalInfo: {title: "Additional Information", placeholder: "Any additional information about the student?", id: "additional-info"},
          }

          // build html and handle submission
          function Input() {
            let handleNewStudentSubmit = (event) => {
              event.preventDefault();
              CloseModal("new-student");

              let studentName = document.getElementById('student-name').value;
              let studentID = document.getElementById('student-id').value;
              let guardianName = document.getElementById('guardian-name').value;
              let guardianContact = document.getElementById('guardian-contact').value;
              let studentMedical = document.getElementById('student-medical').value;
              let disabilityStatus = document.getElementById('disability-status').value;
              let additionalInfo = document.getElementById('additional-info').value;

              let content = {
                'name': studentName,
                'parent_contact': guardianContact,
                'dob': 1,
                "student_school_id": studentID,
                'disabled': disabilityStatus,
                'health_conditions': studentMedical,
                'misc_info': additionalInfo,
                'class_id': selectedClass._id,
                'grade_level': "Primary 2",
                'school_id': "nb9s",
                'history': [],
              };

              selectedClass.students.push(content);

              fetch('http://127.0.0.1:8000/students',
                {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(content)
                }
              )
              .then(response => {
                if (!response.ok) {
                  throw new Error('Network response was not ok');
                }
                return response.json();
              })
              .then(data => {
                console.log('Data received:', data);
              })
              .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
              });
              
              ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
              //Need to rerender classes as well to update enrolled students
              //TODO: just rerender the one class
              ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));
              ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students"/>, document.getElementById("num-students-indicator"));
            }

            return (
              <section style={{ margin: '50px' }}>
                <form id="new-student-form" onSubmit={handleNewStudentSubmit}>
                  <section id="new-student-text-input">
                  <TextInput title={newStudentInfo.studentName.title}
                  placeholder={newStudentInfo.studentName.placeholder}
                  id={newStudentInfo.studentName.id}/>
                  <TextInput title={newStudentInfo.studentID.title}
                  placeholder={newStudentInfo.studentID.placeholder}
                  id={newStudentInfo.studentID.id}/>
                  <TextInput title={newStudentInfo.guardianName.title}
                  placeholder={newStudentInfo.guardianName.placeholder}
                  id={newStudentInfo.guardianName.id}/>
                  <TextInput title={newStudentInfo.guardianContact.title}
                  placeholder={newStudentInfo.guardianContact.placeholder}
                  id={newStudentInfo.guardianContact.id}/>
                  <TextInput title={newStudentInfo.studentMedical.title}
                  placeholder={newStudentInfo.studentMedical.placeholder}
                  id={newStudentInfo.studentMedical.id}/>
                  <br/>
                  <Checkbox id={newStudentInfo.disabilityStatus.id}
                    name={newStudentInfo.disabilityStatus.id}
                    title={newStudentInfo.disabilityStatus.title}/>
                  <TextInput title={newStudentInfo.additionalInfo.title}
                  placeholder={newStudentInfo.additionalInfo.placeholder}
                  id={newStudentInfo.additionalInfo.id}/>
                  </section>
                  <br/><br/><br/><br/>
                  <SubmitButton value="Add"/>
                </form>
              </section>
            )
          }

          ReactDOM.render(<Input />, document.getElementById("new-student-modal-root"));
            // functions for new student tool

            let editStudentInfo = {
                studentName: {title: "Student Name", placeholder: "Please enter student name", id: "student-name"},
                studentID: {title: "Student ID", placeholder: "Please enter student ID", id: "student-id"},
                guardianName: {title: "Parent/Guardian Name", placeholder: "Enter name of Parent/Guardian", id: "guardian-name"},
                guardianContact: {title: "Parent/Guardian Contact", placeholder: "Enter contact of Parent/Guardian", id: "guardian-contact"},
                studentMedical: {title: "Student Medical Information", placeholder: "Any known allergies? Other valuable information?", id: "student-medical"},
                disabilityStatus: {title: "Disability Status", id: "disability-status"},
                additionalInfo: {title: "Additional Information", placeholder: "Any additional information about the student?", id: "additional-info"},
              }
    
              // build html and handle submission
              function Input() {
                const handleSubmit = (event) => {
                  event.preventDefault();
                  CloseModal("edit-student");
                }
    
                return (
                  <section style={{ margin: '50px' }}>
                    <form id="edit-student-form" onSubmit={handleSubmit}>
                      <section id="edit-student-text-input">
                      <TextInput title={newStudentInfo.studentName.title}
                        placeholder={newStudentInfo.studentName.placeholder}
                        id={newStudentInfo.studentName.id}/>
                      <TextInput title={newStudentInfo.studentID.title}
                        placeholder={newStudentInfo.studentID.placeholder}
                        id={newStudentInfo.studentID.id}/>
                      <TextInput title={newStudentInfo.guardianName.title}
                        placeholder={newStudentInfo.guardianName.placeholder}
                        id={newStudentInfo.guardianName.id}/>
                      <TextInput title={newStudentInfo.guardianContact.title}
                        placeholder={newStudentInfo.guardianContact.placeholder}
                        id={newStudentInfo.guardianContact.id}/>
                      <TextInput title={newStudentInfo.studentMedical.title}
                        placeholder={newStudentInfo.studentMedical.placeholder}
                        id={newStudentInfo.studentMedical.id}/>
                      <br/>
                      <Checkbox id={newStudentInfo.disabilityStatus.id}
                        name={newStudentInfo.disabilityStatus.id}
                        title={newStudentInfo.disabilityStatus.title}/>
                      <TextInput title={newStudentInfo.additionalInfo.title}
                        placeholder={newStudentInfo.additionalInfo.placeholder}
                        id={newStudentInfo.additionalInfo.id}/>
                      </section>
                      <br/><br/><br/><br/>
                      <SubmitButton value="Save"/>
                    </form>
                  </section>
                )
              }
    
              ReactDOM.render(<Input />, document.getElementById("edit-student-modal-root"));

          let returningStudentInfo = {
            studentID: {title: "Student ID", placeholder: "Find Student", id: "student-id"},
          }

        // build html and handle submission
          function Input() {
            const handleSubmit = (event) => {
              event.preventDefault();
              CloseModal("returning-student");
              OpenModal("edit-student", "1234");
            }

            return (
              <section style={{ margin: '50px' }}>
                <form id="returning-student-form" onSubmit={handleSubmit}>
                  <section id="returning-student-text-input">
                  <TextInput title={returningStudentInfo.studentID.title}
                    placeholder={returningStudentInfo.studentID.placeholder}
                    id={returningStudentInfo.studentID.id}/>
                  </section>
                  <br/><br/><br/><br/>
                  <SubmitButton value="Search"/>
                </form>
              </section>
            )
          }

          ReactDOM.render(<Input />, document.getElementById("returning-student-modal-root"));
           // functions for new student tool

           let transferStudentInfo = {
            studentID: {title: "Student ID", placeholder: "Student ID", id: "student-id"},
          }


          // build html and handle submission
          function Input() {
            const handleSubmit = (event) => {
              event.preventDefault();
              CloseModal('transfer-student');
            }

            return (
              <section style={{ margin: '50px' }}>
                <form id="transfer-student-form" onSubmit={handleSubmit}>
                  <section id="transfer-student-text-input">
                  <TextInput title={transferStudentInfo.studentID.title}
                    placeholder={transferStudentInfo.studentID.placeholder}
                    id={transferStudentInfo.studentID.id}/>
                  </section>
                  <br/><br/><br/><br/>
                  <SubmitButton value="Select"/>
                </form>
              </section>
            )
          }

          ReactDOM.render(<Input />, document.getElementById("transfer-student-modal-root"));
          const pause = (time) => new Promise(resolve => setTimeout(resolve, time));

          function OpenModal(id, studentID="-1") {
            let underlay = document.getElementById(`${id}-modal-underlay`);
            underlay.classList.add("blurred-modal-underlay");
          
            let modal = underlay.querySelector(`#${id}-modal`);
            modal.classList.add("displayed-modal");
    
            underlay.style.display = "block";
    
            if (id == "edit-student") {
              // set all parameters for student ID
            }
          }
    
          async function CloseModal(id) {
              let underlay = document.getElementById(`${id}-modal-underlay`);
              underlay.classList.remove("blurred-modal-underlay");
    
              let modal = underlay.querySelector(`#${id}-modal`);
              modal.classList.remove("displayed-modal");
              await pause(200);
              
              textInputs = Array.from(modal.querySelector(`#${id}-text-input`).children);
    
              textInputs.forEach((item) => {
                try {Array.from(item.children).forEach((input => {
                  input.value = "";
                }));} catch (e) {};
              });
    
              underlay.style.display = "none";
            }

        var tempID = "665da0b90c1d6c0c45724285";
        var classInfo;
        var selectedClass;

        

        // add list item with class info
        function ClassItem(props) {
          const handleClassClick = () => {
            selectedClass = props.data;
            students = props.data.students;
            ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
            ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level"/>, document.getElementById("grade-level-indicator"));
            ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students"/>, document.getElementById("num-students-indicator"));
          };

          return (
            <li>
              <div class="sidebar-class" onClick={handleClassClick}>
                <p class="class-info">{props.data.class_name}</p>
                <p class="class-info-body">Total Enrolled Students: {props.data.students.length}</p>
              </div>
            </li>
          );
        }

        // add all classes to list
        function AddClasses(props) {

          let items = [];


          for (let i = 0; i < props.classes.length; i++) {
            items.push((<ClassItem data={props.classes[i]} />));
          }

          const classList = items;

          if (items.length == 0) {
            return (
              <section>
                <h1 class="classes-title">Classes</h1>
                <p class="classes-memo">Select a class to view students</p>
                <ul class="nobullet">
                  <li><div class="lsit-issue">There are no classes associated with this teacher.</div></li>
                </ul>
              </section>
            );
          }

          return (
            <section>
              <h1 class="classes-title">Classes</h1>
              <p class="classes-memo">Select a class to view students</p>
              <ul class="nobullet">
                {classList}
              </ul>
            </section>
          );
        }
        
        //Gets the list of classes, and then renders themS
        fetch(`http://127.0.0.1:8000/teachers/${tempID}/classes`,
                  {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                )
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('Data received:', data);
                  classInfo = data;
                  selectedClass = classInfo[0];
                  ReactDOM.render(<AddClasses classes={classInfo} />, document.getElementById("classes-root"));
                })
                .catch(error => {
                  console.error('There was a problem with the fetch operation:', error);
                });
                function Indicator(props) {
                    return(
                      <section>
                        <div class="row" >
                          <div>
                            <div class={`upper-info-icon-shape ${props.theme}`}></div>
      
                            <p class="label">{props.title}</p>
                          </div>
                          
                          <p class="value">{props.value}</p>
                        </div>
                      </section>
                    )
                  }
                  waitForDefinition('selectedClass')
                  .then(() => {
                    console.log("Selected class defined for grade level")
                    ReactDOM.render(<Indicator title="Grade Level" value={selectedClass.grade_level} theme="grade-level"/>, document.getElementById("grade-level-indicator"))
                  })
                  .catch((error) => {
                    console.error(error);
                  });              
                  waitForDefinition('selectedClass')
                  .then((value) => {
                    console.log("Selected class defined for students")
                    ReactDOM.render(<Indicator title="Enrolled Students" value={selectedClass.students.length} theme="num-students"/>, document.getElementById("num-students-indicator"))
                  })
                  .catch((error) => {
                    console.error(error);
                  });              
                  ReactDOM.render(<Indicator title="Current Term" value="2" theme="term-number"/>, document.getElementById("current-term-indicator"))
                  var students = [
                    {
                    name: "Bob Ross",
                      parent_contact: "thisisaparentcontact@gmail.com",
                      dob: 1,
                      student_school_id: "bap5",
                      disabled: "Yes",
                      health_conditions: "a couple",
                      misc_info: "",}
                  ];
      
                  // add list item with class info
                  function StudentItem(props) {
                    return (
                      <li>
                        <div class="student-list-item">
                          <div>
                            <p class="student-info">{props.data.name}</p>
                            <p class="student-info-body">Student ID: {props.data.student_school_id}</p>
                            <p class="student-info-body">Disability: {props.data.disabled}</p>
                          </div>
                          <div>
                            <p class="student-info">Parent Contact Information</p>
                            <p class="student-info-body">{props.data.parent_contact}</p>
                          </div>
                          <div>
                            <p class="student-info-body">Edit</p>
                          </div>
                        </div>
                      </li>
                    );
                  }
      
                  // Add all students to list
                  function AddStudents(props) {
                    let items = [];
                    for (let i = 0; i < props.students.length; i++) {
                      items.push((<StudentItem data={props.students[i]} />));
                    }
      
                    const classList = items;
      
                    if (items.length == 0) {
                      return (
                        <div>
                          <h1 class="students-title">{selectedClass.class_name}</h1>
                          <p class="students-memo">Students</p>
                          <ul class="nobullet">
                            <li><div class="list-issue">There are no students that have been added to this class.</div></li>
                          </ul>
                        </div>
                      );
                    }
      
                    return (
                      <div>
                        <h1 class="students-title">{selectedClass.class_name}</h1>
                        <p class="students-memo">Students</p>
                        <ul class="nobullet">
                          {classList}
                        </ul>
                      </div>
                    );
                  }
      
                  waitForDefinition('selectedClass')
                    .then((value) => {
                      console.log('selectedClass is defined:', value);
                      ReactDOM.render(<AddStudents students={selectedClass.students} />, document.getElementById("students-root"));
                    })
                    .catch((error) => {
                      console.error(error);
                    });
      
