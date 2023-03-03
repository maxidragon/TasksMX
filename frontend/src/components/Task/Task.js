import React, {useState} from 'react';
import TaskDate from './TaskDate';
import Card from "../UI/Card";
import './Task.css';
import DoneIcon from '@mui/icons-material/Done';
import {IconButton} from "@mui/material";
import {lightBlue} from '@mui/material/colors';

const Task = (props) => {
    const [showDesc, setShowDesc] = useState(false)
    const toggleDesc = () => {
        setShowDesc(!showDesc)
    }
    const editHandler = () => {
        props.onEdit({
            name: props.name,
            description: props.description,
            date: props.date,
            _id: props._id
        });
    }
    const completedHandler = () => {
        props.onComplete({
            name: props.name,
            description: props.description,
            date: props.date,
            isDone: true,
            _id: props._id
        })
    }
    return (
        <li>
            <Card className="task-item">
                <div className="task-item__description">
                    <TaskDate date={props.date}/>
                    <h2 onClick={toggleDesc}>{props.name}</h2>
                    {showDesc && (
                        <div className="description">{props.description}</div>
                    )}
                    <div className="actions">
                        <button className="edit" onClick={editHandler}>Edit</button>
                        <button className="delete" onClick={() => {
                            props.onDelete(props._id)
                        }}>Delete
                        </button>
                    </div>

                    <IconButton aria-label="complete" color="info" onClick={completedHandler}>
                        <DoneIcon/>
                    </IconButton>
                </div>
            </Card>
        </li>
    )
}

export default Task;