import React from "react";
import { useState, useEffect }  from 'react';
import axios from 'axios'

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay, getInterview ,getInterviewersForDay} from './helpers/selectors'



// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: '3pm'
//   },
//   {
//     id: 4,
//     time: '4pm',
//     interview: {
//         student: "mohamed ali",
//         interviewer:{
//             id:1,
//             name: "Sylvia Palmer",
//             avatar: "https://i.imgur.com/LpaY82x.png",
//         }
//     }
//   },
//   {
//    id: 3,
//    time: '6pm',
//    interview:{
//        student: "Lydia Miller-Jones",
//        interviewer: {
//            id: 5,
//            name: "Moe Ali",
//            avatar: "https://i.imgur.com/LpaY82x.png",

//        }
//    }

//   },
//   {
//     id: 'last',
//     time: "7pm",
//     interview: {
//         student: "Kleir Miranda",
//         interviewer: {
//             id: 4,
//             name: "Moe Ali",
//             avatar: "https://i.imgur.com/LpaY82x.png",
//         }
//     }
//   }
// ];


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState({...state, days})
  // }


  useEffect(() => {
    const getDays = '/api/days'
    const getAppointments = '/api/appointments'
    const getInterviewers = '/api/interviewers'
    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviewers)
    ]).then((allRes) => {
      setState(prev => ({...prev, days: allRes[0].data, appointments: allRes[1].data, interviewers: allRes[2].data}))

      // console.log('this is the interviwers data', allRes[2].data)
    })

  }, [])
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)
  const appointmentMap = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return (<Appointment key={appointment.id}
     id={appointment.id}
     time={appointment.time}
     interview={interview}
     interviewers={dailyInterviewers}
     />)
  })


  return (
    <main className="layout">
      <section className="sidebar">
        {<> <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
         <hr className="sidebar__separator sidebar--centered" />
         <nav className="sidebar__menu"> <DayList days={state.days} day={state.day} setDay={setDay} /></nav>
         <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
            alt="Lighthouse Labs" />
         </>}
      </section>
      <section className="schedule">
        {appointmentMap}
      </section>
    </main>
  );
}
