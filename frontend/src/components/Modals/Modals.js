import React from "react"
import ModalBase from './components/ModalBase/ModalBase'
import ClassAddModal from './ClassAddModal/ClassAddModal'
import AddStudentModal from './AddStudentModal/AddStudentModal'
import NewStudentModal from "./NewStudentModal/NewStudentModal"
import EditStudentModal from "./EditStudentModal/EditStudentModal"

const classAdd = {
    id: "class-add",
    title: "Create New Class",
    text: "Fill out the following fields to add a new class.",
    content: () => {return (<ClassAddModal/>)},
    closeable: true,
}

const addStudent = {
  id: "search-student",
  title: "Add Student",
  text: "Please enter the student's ID to see if they are in our system.",
  content: () => {return <AddStudentModal/>},
  closeable: true,
}

const newStudent = {
  id: "new-student",
  title: "Add Student",
  text: "Enter the student's information in the fields below.",
  content: () => {return <NewStudentModal/>},
  closeable: true,
}

const editStudent = {
  id: "edit-student",
  title: "Edit Class",
  text: "Use these fields to modify your class's information.",
  content: () => {return <EditStudentModal/>},
  closeable: true,
}

const transferStudent = {
  id: "class-add",
  title: "Create New Class",
  text: "Fill out the following fields to add a new class.",
  closeable: true,
}

function Modals() {
  return (
    <section>
        <ModalBase info={classAdd}/>
        <ModalBase info={addStudent}/>
        <ModalBase info={newStudent}/>
        <ModalBase info={editStudent}/>
    </section>
  );
}

export default Modals;
