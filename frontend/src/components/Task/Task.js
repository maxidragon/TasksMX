import React, {useState} from 'react';

const Task = (props) => {
    const [showDesc, setShowDesc] = useState(false)
    const toggleDesc = () => {
        setShowDesc(!showDesc)
    }
    const editHandler = () => {
        props.onEdit({
            name: props.name,
            description: props.description,
            _id: props._id
        });
    }

    return (
        <div className="task">
            <h2 onClick={toggleDesc}>{props.name}</h2>
            {showDesc && (
                <div>
                    <div className="description">{props.description}</div>
                    <div className="date">{props.date}</div>
                </div>
                    )}
            <button className="edit" onClick={editHandler}>Edit</button>
            <button className="delete" onClick={() => {props.onDelete(props._id)}}>Delete</button>
        </div>
    )
}

export default Task;