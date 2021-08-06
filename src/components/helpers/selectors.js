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
    const found = state.days.find(d => day === d.name)
    if (state.days.length === 0 || found === undefined) return [];
    return found.interviewers.map(id => state.interviewers[id])
}


export {getAppointmentsForDay, getInterview, getInterviewersForDay}