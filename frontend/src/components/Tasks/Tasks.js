import React from 'react';
import axios from '../../axios';
import Modal from 'react-modal';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Task from "../Task/Task";
import EditTask from "../Task/EditTask";
import NewTask from "../Task/NewTask";
import Card from "../UI/Card";
import './Tasks.css';
import './EditTaskModal.css';

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            showEditModal: false,
            editTask: {}
        };
        this.getCompletedTasks = this.getCompletedTasks.bind(this);
        this.fetchTasks = this.fetchTasks.bind(this);
        this.getDailyTasks = this.getDailyTasks.bind(this);
        this.getTomorrowTasks = this.getTomorrowTasks.bind(this);
        this.getWeeklyTasks = this.getWeeklyTasks.bind(this);
        this.getMonthlyTasks = this.getMonthlyTasks.bind(this);
    }

    componentDidMount() {
        this.fetchTasks();
    }

    async fetchTasks() {
        const res = await axios.get('/tasks');
        const tasks = res.data;
        console.log(tasks);
        this.setState({tasks});
    }

    async getDailyTasks() {
        try {
            const res = await axios.get('/tasks/today');
            const tasks = res.data;
            this.setState({tasks});
        } catch (err) {
            NotificationManager.error(err.response.data.message)
        }
    }

    async getTomorrowTasks() {
        try {
            const res = await axios.get('/tasks/tomorrow');
            const tasks = res.data;
            this.setState({tasks});
        } catch (err) {
            NotificationManager.error(err.response.data.message)
        }
    }

    async getWeeklyTasks() {
        try {
            const res = await axios.get('/tasks/weekly');
            const tasks = res.data;
            this.setState({tasks});
        } catch (err) {
            NotificationManager.error(err.response.data.message)
        }
    }
    async getMonthlyTasks() {
        try {
            const res = await axios.get('/tasks/monthly');
            const tasks = res.data;
            this.setState({tasks});
        } catch (err) {
            NotificationManager.error(err.response.data.message)
        }
    }
    async getCompletedTasks() {
        try {
            const res = await axios.get('/tasks/completed');
            const tasks = res.data;
            this.setState({tasks});
        } catch (err) {
            NotificationManager.error(err.response.data.message)
        }
    }

    async deleteTask(_id) {
        const tasks = [...this.state.tasks].filter(task => task._id !== _id)
        await axios.delete('/tasks/' + _id)
        this.setState({tasks})
    }

    async addTask(task) {
        try {
            const tasks = [...this.state.tasks]
            const res = await axios.post('/tasks', task)
            const newTask = res.data
            tasks.push(newTask)
            this.setState({tasks})
        } catch (err) {
            NotificationManager.error(err.response.data.message)
        }
    }

    async editTask(task) {
        await axios.put('/tasks/' + task._id, task)
        const tasks = [...this.state.tasks];
        const index = tasks.findIndex(x => x._id === task._id)
        if (index >= 0) {
            tasks[index] = task;
            this.setState({tasks});
        }
        this.toggleModal()
    }

    async completeTask(task) {
        await axios.patch('/tasks/' + task._id + '/complete');
        const tasks = [...this.state.tasks];

    }

    editTaskHandler(task) {
        this.toggleModal();
        this.setState({editTask: task});
    }

    toggleModal() {
        this.setState({showEditModal: !this.state.showEditModal})
    }

    render() {
        return (
            <div>
                <NotificationContainer/>
                <NewTask onAdd={(task) => this.addTask(task)}/>
                <Modal isOpen={this.state.showEditModal}
                       contentLabel="Edit task"
                       className="edit-task-modal"
                >
                    <EditTask
                        name={this.state.editTask.name}
                        description={this.state.editTask.description}
                        _id={this.state.editTask._id}
                        date={this.state.editTask.date}
                        onEdit={task => this.editTask(task)}
                        onClose={() => this.toggleModal()}
                    />

                </Modal>
                <Card className="tasks">
                    <div className="actions">
                        <button onClick={this.fetchTasks}>All</button>
                        <button onClick={this.getDailyTasks}>Daily</button>
                        <button onClick={this.getTomorrowTasks}>Tomorrow</button>
                        <button onClick={this.getWeeklyTasks}>Weekly</button>
                        <button onClick={this.getMonthlyTasks}>Monthly</button>
                        <button onClick={this.getCompletedTasks}>Done</button>
                    </div>
                    {this.state.tasks.length === 0 && <p className="noTasks">No tasks</p>}
                    <ul className="tasks-list">
                        {this.state.tasks.map(task => {
                            return (
                                <Task
                                    key={task._id}
                                    name={task.name}
                                    description={task.description}
                                    date={task.date}
                                    _id={task._id}
                                    onEdit={(task) => this.editTaskHandler(task)}
                                    onDelete={(_id) => this.deleteTask(_id)}
                                    onComplete={(task) => this.completeTask(task)}
                                />
                            )
                        })}
                    </ul>
                </Card>

            </div>
        )
    }
}

export default Tasks;