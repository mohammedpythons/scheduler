import React from 'react';
import classNames from 'classnames'
import 'components/InterviewerListItem.scss'


export default function InterviewerListItem(props) {
    const {id, name, avatar, setInterviewer, selected} = props
    console.log("this is my selected",selected)


    let interViewClassName = classNames('interviewers__item', {'interviewers__item--selected': selected? avatar: null} )
    return (
        <li onClick={() => setInterviewer(id)} className={interViewClassName}>
            <img
            className='interviewers__item-image'
            src={avatar}
            alt={name}
             />
             {selected && name}
        </li>
    )
}