import { useState, useEffect } from 'react';
import axios from 'axios';


export default function useApplicationData() {
    const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
      });

      const setDay = day => setState({ ...state, day });

      const updateSpots = (state, day) => {

        const currentDay = day || state.day
        // we need to find the current day obj
        const currentDayObj = state.days.find(dayObj => dayObj.name === currentDay)
        const currentDayObjIndex = state.days.findIndex(dayObj => dayObj.name === currentDay)
        //we need to ask for the appointment id
        const listOfApptIds = currentDayObj.appointments
        //we neeed to check every appointment to see if they're free or not
        const listOfFreeAppointments = listOfApptIds.filter(appId => !state.appointments[appId].interview)
        // we need to update the spots values on the day obj
        const newSpots = listOfFreeAppointments.length

        const updatedState = {...state}
        updatedState.days = [...state.days]
        const updatedDay = {...currentDayObj};
        updatedDay.spots = newSpots;
        updatedState.days[currentDayObjIndex] = updatedDay;


        return updatedState;

    }


      function bookInterview(id, interview) {

        return axios.put(`/api/appointments/${id}`, {interview: {...interview}}) // second params is the body you want to put // RETURN IT TO BE THENABLE in the appointment CM
        .then(res => {
          const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          const updatedState = {
            ...state,
            appointments // update appointments with this appointments
          }

          setState(updateSpots(updatedState));


        })
      }


      function cancelInterview(id) {
        return axios.delete(`/api/appointments/${id}`).then(() => {
          const appointment = {
            ...state.appointments[id],
            interview: null
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment
          };
          setState({
            ...state,
            appointments
          });
          const updatedState = {
            ...state,
            appointments
          }

          setState(updateSpots(updatedState));

        })
      }

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




        return { state, setDay, bookInterview, cancelInterview }
}

