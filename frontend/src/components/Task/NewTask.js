import React, {useState} from 'react';
import './NewTask.css'

const NewTask = (props) => {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')
    const [date, setDate] = useState(new Date())
    const [description, setDesc] = useState('')

    const changeNameHandler = event => {
        const value = event.target.value
        setName(value)
    }
    const changeDescHandler = event => {
        const value = event.target.value
        setDesc(value)
    }
    const changeDateHandler = event => {
        const value = event.target.value
        setDate(value)
    }
    const addTask = event => {
        const task = {
            name: name,
            description: description,
            isDone: false,
            date: date
        }
        props.onAdd(task)
        setName('')
        setDesc('')
        setDate(new Date())
        setShowForm(false)
    }
    return (
        <div className="new-task">
            {showForm ? (
                <div className="new-task__controls">
                    <div className="new-task__control">
                        <label>Title</label>
                        <input type="text" value={name} onChange={changeNameHandler}/>
                    </div>
                    <div className="new-task__control">
                        <label>Description</label>
                        <input type="text" value={description} onChange={changeDescHandler}/>
                    </div>
                    <div className="new-task__control">
                        <label>Date</label>
                        <input type="date" value={date} onChange={changeDateHandler}/>
                    </div>
                    <div className="new-task__actions">
                        <button onClick={() => addTask()}>Add task</button>
                        <button onClick={() => setShowForm(!showForm)}>Cancel</button>
                    </div>

                </div>
            ) : (

                <button onClick={() => setShowForm(true)}>Add task</button>

            )}
        </div>
    )
}

export default NewTask;