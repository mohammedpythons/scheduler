import Appointment from "components/Appointment";

 function getAppointmentsForDay(state, day) {
    let foundAppointmets = []
    const foundDays = state.days.filter(stateDay => stateDay.name === day)
    if (!foundDays[0]) {
        return []
    }
    const dayAppointments = foundDays[0].appointments;
    // console.log(dayAppointments)
    // return dayAppointments

    for (let dayApp of dayAppointments) {


        foundAppointmets.push(state.appointments[dayApp])
    }

    return foundAppointmets;
}
function getInterview(state, interview) {
    //console.log("=====||||",interview)//{ student: 'Archie Cohen', interviewer: 2 } or null
    const newObj = {}
    if (!interview) {
        return null
    }
    newObj.student = interview.student;
    newObj.interviewer = state.interviewers[interview.interviewer]

    return newObj


}

function getInterviewersForDay(state, day) {
    const interviewersForDay = []
    const appointments = getAppointmentsForDay(state, day)// this returns Array of aobject ==> {id: 5,time: '4pm',interview: { student: 'Chad Takahashi', interviewer: 2 }}

    for (const appointment of appointments) {

        if (appointment.interview !== null) {
            const interviewerId = appointment.interview.interviewer;
            interviewersForDay.push(state.interviewers[interviewerId])
        }
    }

    return interviewersForDay;// this return the interviwer{   id: 2,   name: 'Tori Malcolm',   avatar: 'https://i.imgur.com/Nmx0Qxo.png' }

}


export {getAppointmentsForDay, getInterview, getInterviewersForDay}