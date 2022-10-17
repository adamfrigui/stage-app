import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/Widget/Widget'
import List from '../../components/table/table'
import 'react-calendar/dist/Calendar.css';
import './Home.scss'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
 


const Home = () => {

 
  return (
    <div className='home'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="conge" />
      
        </div>
        <div className="charts">
 
        </div>
        <div className="listContainer">
          <div className="listTitle">Users en Conge</div>
          <List />
        </div>
      </div>
    </div>
  )
}

export default Home