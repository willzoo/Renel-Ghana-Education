import React, { useContext, useState } from "react"
import ModalBase from './components/ModalBase/ModalBase'
import SchoolAddModal from './SchoolAddModal/SchoolAddModal'
import NewTeacherModal from "./NewTeacherModal/NewTeacherModal"
import EditTeacherModal from "./EditTeacherModal/EditTeacherModal"
import EditSchoolModal from './EditSchoolModal/EditSchoolModal'
import AdminContext from "../../../AdminContext"

const schoolAdd = {
  id: "school-add",
  title: "Create New School",
  text: "Fill out the following fields to add a new school.",
  content: () => { return (<SchoolAddModal />) },
  closeable: true,
}

const newTeacher = {
  id: "new-teacher",
  title: "Add Teacher",
  text: "Enter the teacher's information in the fields below.",
  content: () => { return <NewTeacherModal /> },
  closeable: true,
}

const editTeacher = {
  id: "edit-teacher",
  title: "Edit Teacher",
  text: "Use these fields to modify your teacher's information.",
  content: () => { return <EditTeacherModal /> },
  closeable: true,
}

const editSchool = {
  id: "school-edit",
  title: "Edit School",
  text: "Use these fields to modify your school's information.",
  content: () => { return <EditSchoolModal /> },
  closeable: true,
}

const loading = {
  id: "loading",
  title: "Loading...",
  text: "Please wait while we load your school information.",
  content: () => { return <section /> },
  closeable: false,
}

const error = {
  id: "error",
  title: "Error",
  text: "We could not load your school information. Please try again later.",
  content: () => { return <section /> },
  closeable: false,
}

function Modals() {
  const {isSchoolAddOpen, setSchoolAddOpen} = useContext(AdminContext);

  return (
    <section>
      <ModalBase info={loading} />
      <ModalBase info={error} />
      <ModalBase info={schoolAdd} />
      <ModalBase info={newTeacher} />
      <ModalBase info={editTeacher} />
      <ModalBase info={editSchool} />
    </section>
  );
}

export default Modals;
