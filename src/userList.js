import React from 'react'
import {useState} from 'react';
import result from './data.js'
import {Button,Modal} from 'react-bootstrap'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'


export default function UserComponent () {
    let userData = result.members; 
    let x = result.members[0].activity_periods;
    let yDates = x.map((temp) => moment(new Date(temp.start_time.slice(0,12).trim())).format("MMM DD YYYY"))

    let [data, setData] = useState(userData); 
    let [show, setShow] = useState(false);
    let [showTime, setShowTime] = useState({start_time : "", end_time : ""});
    let [ap,setap] = useState([]);
    let [dates, setDates] = useState([]);

   
    const handleClose = ()=> setShow(false);
    
    
    const handleShow = (id) => {
      let x = data.map((temp)=> {
        if(temp.id === id) return temp.activity_periods;
      });
      setap(x[0]);
    
      let contentDates = x[0].map((temp) => moment(new Date(temp.start_time.slice(0,12).trim())).format("MMM DD YYYY"))
      
      setDates(contentDates);
    

      setShow(true);

     
    }

    let changeTileContent = ({date,view}) => {
      if(dates.find(temp => temp === moment(date).format("MMM DD YYYY")) && view=="month") {
        
        return (<p className="active">Active</p>)
      }
    }
    

    let onClickSpecificDate = (date) => {
      ap.map((m) => {
       
        if(moment(new Date(m.start_time.slice(0,11).trim())).format("MMM DD YYYY") === moment(date).format("MMM DD YYYY")) {
          setShowTime({start_time : m.start_time.slice(10) , end_time : m.end_time.slice(10)})
          
        }
        else {
          setShowTime({start_time : '', end_time : ''})
        }
      })
      
    }
   

  
    return (
             <div>
             <div> <header className = "head" > Users</header> </div>
             <button className= "btn">                
                <div>        
             {data.map((temp) => (<button className="btn2" onClick={()=>handleShow(temp.id)}> <p>{temp.real_name}</p> <p>{temp.tz}</p></button>))}

    <Modal show={show} onHide ={handleClose}>
      <Modal.Header closeButton>
          <Modal.Title>Activity Periods</Modal.Title>
        </Modal.Header>
        <Modal.Body><Calendar tileContent={changeTileContent}  onClickDay={onClickSpecificDate}/></Modal.Body>
        <Modal.Footer>
          <label> Start Time</label><p> {showTime.start_time} </p>
          <label> End Time</label><p> {showTime.end_time} </p>
         
          <Button variant="secondary" className="smallButton" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="smallButton" onClick={handleClose}>
            View All
          </Button>
        </Modal.Footer>
    </Modal>

            </div>            
            </button>             
            
             
            
        </div>
    );
}
