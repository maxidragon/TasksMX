import React, {useState} from 'react';

const EditTask = (props) => {
     const [name, setName] = useState(props.name);
    const [description, setDesc] = useState(props.description);

    const changeNameHandler = event => {
        const value = event.target.value;
        setName(value);
    }
    const changeDescHandler = event => {
        const value = event.target.value;
        setDesc(value);
    }
    const editTask = () => {
        const task = {
            name: name,
            description: description,
            _id: props._id
        };
        props.onEdit(task);

    }
    return (
        <div>
            <label>Name</label>
            <input type="text" value={name} onChange={changeNameHandler}/>
            <br />
            <label>Description</label>
            <input type="text" value={description} onChange={changeDescHandler}/>
            <button onClick={() => editTask()}>Save</button>
        </div>
    )
}

export default EditTask;