import React, {useState} from 'react';

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
        showForm ? (
        <div className="">
            <label>Title</label>
            <input type="text" value={name} onChange={changeNameHandler}/>
            <br />
            <label>Description</label>
            <input type="text" value={description} onChange={changeDescHandler}/>
            <label>Date</label>
            <input type="date" value={date} onChange={changeDateHandler}/>
            <button onClick={() => addTask()}>Add task</button>
        </div>
        ) : (
            <button onClick={() => setShowForm(true)}>Add task</button>
        )
    )
}

export default NewTask;