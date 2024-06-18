import React from "react"
import ModalBase from './components/ModalBase/ModalBase'
import ClassAddModal from './ClassAddModal/ClassAddModal'

const classAdd = {
    id: "class-add",
    title: "Create New Class",
    text: "Fill out the following fields to add a new class.",
    content: () => {return (<ClassAddModal/>)},
    closeable: true,
}

const newStudent = {
  id: "class-add",
  title: "Create New Class",
  text: "Fill out the following fields to add a new class.",
  closeable: true,
}

const returningStudent = {
  id: "class-add",
  title: "Create New Class",
  text: "Fill out the following fields to add a new class.",
  closeable: true,
}

const transferStudent = {
  id: "class-add",
  title: "Create New Class",
  text: "Fill out the following fields to add a new class.",
  closeable: true,
}

const editStudent = {
  id: "class-add",
  title: "Create New Class",
  text: "Fill out the following fields to add a new class.",
  closeable: true,
}

function Modals() {
  return (
    <section>
        <ModalBase info={classAdd}/>
    </section>
  );
}

export default Modals;
