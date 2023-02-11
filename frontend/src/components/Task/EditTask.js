import React, {useState} from 'react';

const EditTask = (props) => {
    const [name, setName] = useState(props.name);
    const [description, setDesc] = useState(props.description);
    const [date, setDate] = useState(props.date);

    const changeNameHandler = event => {
        const value = event.target.value;
        setName(value);
    }
    const changeDescHandler = event => {
        const value = event.target.value;
        setDesc(value);
    }
    const changeDateHandler = (event) => {
        const value = event.target.value;
        setDate(value);
    }
    const editTask = () => {
        const task = {
            name: name,
            description: description,
            date: date,
            _id: props._id
        };
        props.onEdit(task);

    }
    return (
        <div>
            <label>Name</label>
            <input type="text" value={name} onChange={changeNameHandler}/>
            <br/>
            <label>Description</label>
            <input type="text" value={description} onChange={changeDescHandler}/>
            <label>Date</label>
            <input type="date" value={date} onChange={changeDateHandler}/>
            <div className="edit-task__actions">
                <div>
                    <button onClick={() => editTask()}>Save</button>
                    <button onClick={props.onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditTask;