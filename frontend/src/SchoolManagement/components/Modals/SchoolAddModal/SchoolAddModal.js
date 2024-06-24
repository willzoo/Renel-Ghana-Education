import React, { useContext, useEffect } from 'react'
import { CloseModal } from '../../../../utils/functions';

import '../components/ModalBase/ModalBase.css'

import Submit from '../components/Buttons/Submit'
import Dropdown from '../components/Dropdown/Dropdown'
import TextInput from '../components/TextInput/TextInput'
import AdminContext from '../../../../AdminContext';

function SchoolAddModal() {
  const { schoolInfo, setSchoolInfo } = useContext(AdminContext).schoolInfo;
  const { selectedSchool, setSelectedSchools } = useContext(AdminContext).selectedSchool;
  
  let addSchoolInfo = {
    schoolName: { title: "School Name", placeholder: "Enter a school name", id: "school-name" },
  };

  let handleSubmit = (event) => {
    event.preventDefault();

    let schoolName = document.getElementById('school-name').value;

    if (schoolInfo.find(school =>
      school.name === schoolName
    )) {
      alert("You already have a school with this name. Please choose a unique name.");
      return;
    }

    CloseModal("school-add");
    
    // Make new school name and add it to 
    let content = {
      "name": schoolName
    };

    let tempSchools = schoolInfo;
    tempSchools.push(content);

    tempSchools.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    // solution created by AI
    setSchoolInfo(tempSchools);

    setSelectedSchool(content);

    fetch('http://127.0.0.1:8000/schools', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        tempSchools = schoolInfo;
        tempSchools.find(school => school.name === schoolName)._id = data._id;

        setSchoolsInfo(tempSchools);

      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  }

  return (
    <section>
      <form id="class-modal-form" onSubmit={handleSubmit}>
        <section className="input-list" id="class-add-text-input">
          <TextInput info={addSchoolInfo.schoolName} />
          <br /><br /><br /><br />
        </section>

        <div className='modal-buttons-section'>
          <Submit value="Create" />
        </div>
      </form>
    </section>
  );
}

export default SchoolAddModal;
