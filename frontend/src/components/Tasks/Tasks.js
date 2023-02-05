import React from 'react';
import axios from '../../axios';
import Task from "../Task/Task";

class Tasks extends React.Component {
 constructor(props) {
         super(props);
         this.state = {
             tasks : [],
             showEditModal: false,
             editTask: {}
         };
    }
      componentDidMount() {
        this.fetchTasks();
    }
       async fetchTasks() {
        const res = await axios.get('/tasks');
        const tasks = res.data;;
        this.setState({tasks});
        }
    async deleteTask(_id) {
        const tasks = [...this.state.tasks].filter(task => task._id !== _id)
        await axios.delete('/tasks' + _id)
        this.setState({tasks})
        }
      async addTask(note) {
        try {
            const tasks = [...this.state.tasks]
            const res = await axios.post('/api/notes', note)
            const newTask = res.data
            tasks.push(newTask)
            this.setState({tasks})
        }
        catch(err) {
            console.log(err.response.data.message)
        }
    }
    render() {
        return (
            <div>
 {this.state.tasks.map(task => {
                    return (
                        <Task
                            key={task._id}
                            name={task.title}
                            description={task.description}
                            id={task._id}
                            date={task.date}
                            onDelete={(_id) => this.deleteTask(_id)}
                         />
                    )
                })}
            </div>
        )
    }
}

export default Tasks;