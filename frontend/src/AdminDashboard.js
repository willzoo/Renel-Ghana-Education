import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const AdminDashboard = () => {
  const [schoolInfo, setSchoolInfo] = useState([]); // Replace with actual school data
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (id) => {
    const underlay = document.getElementById(`${id}-modal-underlay`);
    underlay.classList.add('blurred-modal-underlay');

    const modal = underlay.querySelector(`#${id}-modal`);
    modal.classList.add('displayed-modal');

    underlay.style.display = 'block';
  };

  const closeModal = (id) => {
    const underlay = document.getElementById(`${id}-modal-underlay`);
    underlay.classList.remove('blurred-modal-underlay');

    const modal = underlay.querySelector(`#${id}-modal`);
    modal.classList.remove('displayed-modal');

    setTimeout(() => {
      underlay.style.display = 'none';
    }, 200);
  };

  const handleSchoolSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredSchools = schoolInfo.filter((school) =>
      school.school_name.toLowerCase().includes(searchQuery)
    );
    ReactDOM.render(
      <AddSchools schools={filteredSchools} />,
      document.getElementById('schools-root')
    );
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search schools"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSchoolSearch(e);
        }}
      />
      <div id="schools-root"></div>
      {/* Add modal components and other UI elements here */}
    </div>
  );
};

const AddSchools = ({ schools }) => {
  return (
    <div>
      {schools.map((school) => (
        <div key={school.id}>{school.school_name}</div>
      ))}
    </div>
  );
};

export default AdminDashboard;
