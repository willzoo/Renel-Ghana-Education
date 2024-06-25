import React, { useContext, useEffect } from 'react'
import { CloseModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Delete from '../components/Buttons/Delete'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import AdminContext from '../../../../AdminContext';

function EditSchoolModal() {
  const { selectedSchool, setSelectedSchool } = useContext(AdminContext).selectedSchool;
  const { schoolToEdit, setSchoolToEdit } = useContext(AdminContext).schoolToEdit;
  const { schoolInfo, setSchoolInfo } = useContext(AdminContext).schoolInfo;

  const editSchoolInfo = {
    schoolName: { title: "School Name", placeholder: "Enter a school name", id: "school-name-edit" },
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let schoolName = document.getElementById('school-name-edit').value;

    if (schoolInfo.some(school =>
      school.name === selectedSchool.name && school._id !== selectedSchool._id
    )) {
      alert("You already have a school with this name. Please choose a unique name.");
      return;
    }

    CloseModal('school-edit');

    let content = {
      "name": schoolName
    };

    let tempSchools = schoolInfo;
    let schoolToEdit = tempSchools.find(school =>
      school._id === selectedSchool._id
    );

    if (schoolToEdit) {
      Object.assign(schoolToEdit, content);
    }

    tempSchools.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    // TODO: Ensure that this is working because I think its not
    // solution created by AI
    setSchoolInfo(tempSchools);

    let sidebarSchoolElements = Array.from(document.getElementsByClassName('sidebar-school'));
    sidebarSchoolElements.find(school => school.dataset.schoolId === selectedSchool._id).scrollIntoView();

    fetch(`http://127.0.0.1:8000/schools/${selectedSchool._id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the data returned from the server
        console.log(data); // For demonstration purposes; adjust as needed
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this school? If this school has any teachers they will persist in the database but become inaccessible.")) {
      CloseModal('school-edit');

      let tempSchools = schoolInfo.filter(school => school._id !== selectedSchool._id);

      //TODO: Also check if this works
      // solution created by AI
      setSchoolInfo(tempSchools);

      fetch(`http://127.0.0.1:8000/schools/${selectedSchool._id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          // Handle the data returned from the server
          console.log(data); // For demonstration purposes; adjust as needed
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

      try { document.getElementById('sidebar-classes').scrollTop = 0; } catch (e) { };
    }
  }

  useEffect(() => {
    if (!selectedSchool) return;

    const sidebarSchoolElements = Array.from(document.getElementsByClassName('sidebar-school'));
    if (!sidebarSchoolElements) return;

    sidebarSchoolElements.forEach((element) => {
      element.classList.remove('selected');
    });

    const selectedElement = sidebarSchoolElements.find((element) =>
      element.dataset.classId === selectedSchool._id
    );

    if (!selectedElement) return;
    selectedElement.classList.add('selected');
  }, [schoolInfo])

  return (
    <section>
      <form id="school-modal-form" onSubmit={handleSubmit}>
        <section className="input-list" id="school-edit-text-input">
          <TextInput info={editSchoolInfo.schoolName} editValue={selectedSchool ? selectedSchool.name : null} />
          <br /><br /><br /><br />
        </section>

        <div className='modal-buttons-section'>
          <div><Delete value="Delete" onClick={handleDelete} /></div>
          <div style={{ display: 'inline-block', width: '20px' }}></div> {/* Gap between buttons */}
          <div><Submit value="Save" /></div>
        </div>
      </form>
    </section>
  );
}

export default EditSchoolModal;
