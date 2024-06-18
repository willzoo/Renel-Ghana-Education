import './App.css';
import Sidebar from './Sidebar/Sidebar'

function App() {
  return (
    <section>
        {/* <!-- add light grey background --> */}
        <div className="background">
          <Sidebar/>
        </div>
      </section>
  );
}

export default App;
