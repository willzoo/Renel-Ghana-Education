import logo from './logo.svg';
import './TeacherDashboard.css';

function TeacherDashboard() {
  return (
    <div className="TeacherDashboard">
      <header className="TeacherDashboard-header">
        <img src={logo} className="TeacherDashboard-logo" alt="logo" />
        <p>
          Edit <code>src/TeacherDashboard.js</code> and save to reload.
        </p>
        <a
          className="TeacherDashboard-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default TeacherDashboard;
