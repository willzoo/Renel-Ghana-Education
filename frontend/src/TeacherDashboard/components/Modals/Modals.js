import React, { useContext, useState } from "react"
import ModalBase from './components/ModalBase/ModalBase'
import ClassAddModal from './ClassAddModal/ClassAddModal'
import ReturningStudentModal from './ReturningStudentModal/ReturningStudentModal'
import NewStudentModal from "./NewStudentModal/NewStudentModal"
import EditStudentModal from "./EditStudentModal/EditStudentModal"
import EditClassModal from './EditClassModal/EditClassModal'
import TeacherContext from "../../../TeacherContext"

// vvv base information is initialized in Modals.js to keep all in one place
const classAdd = {
  id: "class-add",
  title: "Create New Class",
  text: "Fill out the following fields to add a new class.",
  content: () => { return (<ClassAddModal />) },
  closeable: true,
}

const returningStudent = {
  id: "returning-student",
  title: "Add Student",
  text: "Please enter the student's ID to see if they are in our system.",
  content: () => { return <ReturningStudentModal /> },
  closeable: true,
}

const newStudent = {
  id: "new-student",
  title: "Add Student",
  text: "Enter the student's information in the fields below.",
  content: () => { return <NewStudentModal /> },
  closeable: true,
}

const editStudent = {
  id: "edit-student",
  title: "Edit Student",
  text: "Use these fields to modify your student's information.",
  content: () => { return <EditStudentModal /> },
  closeable: true,
}

const editClass = {
  id: "class-edit",
  title: "Edit Class",
  text: "Use these fields to modify your class's information.",
  content: () => { return <EditClassModal /> },
  closeable: true,
}

const loading = {
  id: "loading",
  title: "Loading...",
  text: "Please wait while we load your class information.",
  content: () => { return <section /> }, // loading does not have any content
  closeable: false,
}

const error = {
  id: "error",
  title: "Error",
  text: "We could not load your class information. Please try again later.",
  content: () => { return <section /> }, // error does not have any content
  closeable: false,
}

function Modals() {

  return (
    <section>
      {/* add each modal to the page */}
      <ModalBase info={loading} />
      <ModalBase info={error} />
      <ModalBase info={classAdd} />
      <ModalBase info={returningStudent} />
      <ModalBase info={newStudent} />
      <ModalBase info={editStudent} />
      <ModalBase info={editClass} />
    </section>
  );
}

export default Modals;
