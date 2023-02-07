import './TaskDate.css'

function TaskDate(props) {
    if (props.date != null) {
        const date = new Date(props.date);
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const month = date.toLocaleString('en-US', {month: 'long'});
    const year = date.getFullYear();
    return (
            <div className="task-date">
                <div className="task-date__day">{day}</div>
                <div className="task-date__month">{month}</div>
                <div className="task-date__year">{year}</div>
            </div>
            )
    }
    return (
        <div></div>
    )
}

export default TaskDate;
