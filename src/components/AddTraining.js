import Navbar from "./Navbar"
import { useEffect } from "react";
import { useAuthContext } from '../hooks/useAuthContext'

import { useState } from "react";
const AddTraining = () =>{
    const {user} = useAuthContext()


    const [error, setError]= useState(null)
    const [trainingname, settrainingname] = useState('');
    const [datenumber, setdatenumber] = useState('');
    const [calendars, setCalendars] = useState('');
    const [teacheremail, setTeacheremail] = useState('');
    
   
    useEffect(() => {

          const fetchCalendars= async () =>{
          const response2= await fetch('https://backend-tfffc.herokuapp.com/api/calendar/'+user.email)
          const json2= await response2.json()
          
          if(response2.ok){
            setCalendars(json2)
            
           
          }     
    }
        fetchCalendars()
      }, [])
    const add= async (event) =>{
        event.preventDefault();
      
        //teachers email is here
        
        
        const training= {trainingname, datenumber, teacheremail}
        
        
        
        const response= await fetch('https://backend-tfffc.herokuapp.com/api/calendar/addtraining',{
          method: 'POST',
          body: JSON.stringify(training),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if(!response.ok){
          
        }
        const json= await response.json()
        

        if(!response.ok){
          setError(json.error)
        
        }
        if(response.ok){
          setError(null)
          setdatenumber('')
          settrainingname('')
          setTeacheremail('')
          
        }
        

    }
    return (
        <div className="loginContainer">
          <Navbar/>
          
          <form className="login" onSubmit={add}>
            <h3>Training</h3>
            
            <label>Training Name:</label>
            <input 
               type="text" 
               name="trainingname"
               onChange={event => settrainingname(event.target.value)}
               value={trainingname}
            />
            <label>Enter a day:</label>
            <input 
              type="text" 
              name="datenumber"
              onChange={event => setdatenumber(event.target.value)}
              value={datenumber}
            />
              
              
            <button >Add Training</button>
              
              
            
          </form>
          </div>
    )
}
export default AddTraining