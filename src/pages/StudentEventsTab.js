import EventDetailsStu from '../components/EventDtlsStu'
//import Updateevent from '.../components/Updateevent'
import { useEffect } from "react";
import { useEventContext } from "../hooks/useEventContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'
const EventsTabOnStudent = () =>{

    const { events, dispatch } = useEventContext() // events will be changed with 
    const {user} = useAuthContext()

    useEffect(() => {  // useEffect hook fires a function when the EventsTabOnTeacher component is rendered.
        const fetchEvents= async () =>{
          const response= await fetch('https://backend-tfffc.herokuapp.com/api/event/getevents', {
            headers: {'Authorization': `Bearer ${user.token}`},
          })
          const json= await response.json() // json contains an array of event objects.
          if(response.ok){
            dispatch({type: 'VIEW_EVENT', payload: json})// remember, the payload should be an array of events. json is an array of events here.
          }
        }
        if (user) {
        fetchEvents()
        }
    }, [dispatch, user])  //make sure that the useEffect hook runs only once, by adding a dependency tree
    return(
        <div className="EventsTabOnStudentContainer">
            <div className="events">
            <h1> Events </h1>
            {events && events.map((event) => (<EventDetailsStu key={event._id} event = {event} />))}
            </div>
        </div> 
    )
}
export default EventsTabOnStudent