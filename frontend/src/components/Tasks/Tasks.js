import React from 'react';
import axios from '../../axios';
import Modal from 'react-modal';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Task from "../Task/Task";
import EditTask from "../Task/EditTask";
import NewTask from "../Task/NewTask";

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
        await axios.delete('/tasks/' + _id)
        this.setState({tasks})
        }
      async addTask(task) {
        try {
            const tasks = [...this.state.tasks]
            const res = await axios.post('/api/notes', task)
            const newTask = res.data
            tasks.push(newTask)
            this.setState({tasks})
        }
        catch(err) {
             NotificationManager.error(err.response.data.message)
        }
    }
     async editTask(task) {
        await axios.put('/tasks/' + task._id, task)
        const tasks = [...this.state.tasks]
        const index = tasks.findIndex(x => x._id === task._id)
        if (index >= 0) {
            tasks[index] = task;
            this.setState({tasks});
        }
        this.toggleModal()
    }
      editTaskHandler(task) {
        this.toggleModal();
        this.setState({ editTask: task });
    }
    toggleModal() {
        this.setState({showEditModal: !this.state.showEditModal})
    }
    render() {
        return (
            <div>
                <NotificationContainer />
                <p>My tasks</p>
                <NewTask onAdd={(note) => this.addTask(note)}/>
                <Modal isOpen={this.state.showEditModal}
                contentLabel="Edit task">
                    <EditTask
                        name={this.state.editTask.name  }
                        description={this.state.editTask.description}
                        _id={this.state.editTask._id}
                        onEdit={task => this.editTask(task)} />
                    <button className="closeModal" onClick={() => this.toggleModal()}></button>
                </Modal>
 {this.state.tasks.map(task => {
                    return (
                        <Task
                            key={task._id}
                            name={task.name}
                            description={task.description}
                            _id={task._id}
                            date={task.date}
                            onEdit={(task) => this.editTaskHandler(task)}
                            onDelete={(_id) => this.deleteTask(_id)}
                         />
                    )
                })}
            </div>
        )
    }
}

export default Tasks;