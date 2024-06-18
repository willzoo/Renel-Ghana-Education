import './App.css';
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Dashboard/Dashboard';
import Modals from './Modals/Modals'

function App() {
  return (
    <section>
        {/* <!-- add light grey background --> */}
        <div className="background">
          <Modals/>
          <Sidebar/>
          <Dashboard />
        </div>
      </section>
  );
}

export default App;
