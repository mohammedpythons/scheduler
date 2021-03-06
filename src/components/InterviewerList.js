import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from 'components/InterviewerListItem'
import 'components/InterviewerList.scss';
import classNames from 'classnames'


export default function InterviewerList(props) {
    // console.log("this is the interviewe list props", props)
    const {interviewers, setInterviewer} = props;


    const parsedInterviewe = interviewers.map((interviewer) => {
        console.log('interviewer interviewer',props.interviewer === interviewer.id)
    return (<InterviewerListItem
           key={interviewer.id}
           setInterviewer={event => setInterviewer(interviewer.id)} //setInterviewer(interviewer.id)
           selected={props.interviewer === interviewer.id ? true: false}
            name={interviewer.name}
            avatar={interviewer.avatar}
        />)})


    const listClassNames = classNames('interviewers', {'interviewers__list':interviewers})

    return (
        <section className='interviewers'>
            <h4 className='interviewers__header text--light'>Interviewer</h4>
            <ul className={listClassNames}>{parsedInterviewe}</ul>
        </section>
    )
}

InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
};
