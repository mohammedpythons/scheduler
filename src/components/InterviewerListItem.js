import React from 'react';
import classNames from 'classnames'
import 'components/InterviewerListItem.scss'


export default function InterviewerListItem(props) {
    const {id, name, avatar, setInterviewer, selected} = props
    console.log('=========', props)
    let interViewClassName = classNames('interviewers__item', {'interviewers__item--selected': selected}, {'interviewers__item-image': avatar} )
    return (
        <li onClick={() => setInterviewer(id)} className={interViewClassName}>
            <img
            className={interViewClassName}
            src={avatar}
            alt={name}
             />
             {selected && name}
        </li>
    )
}