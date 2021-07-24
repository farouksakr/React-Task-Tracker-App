import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './component/About';
import AddTask from './component/AddTask';
import Footer from './component/Footer';
import Header from './component/Header';
import Tasks from './component/Tasks';
import './index.css';

function App() {

  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    getLocalTasks()
  }, [])

  useEffect(() => {
    saveLocalTasks();
  }, [tasks])


  // save to local storage
  const saveLocalTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  const getLocalTasks = () => {
    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify([]));
    } else {
      let taskLocal = JSON.parse(localStorage.getItem('tasks'));
      setTasks(taskLocal);
    }
  }


  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task => task.id !== id)))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    ))
  }

  return (
    <Router>
      <div className="container">

        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />

        <Route path="/" exact render={(props) => (
          <>
            {showAddTask && <AddTask onAdd={addTask} />}

            {tasks.length > 0 ?
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
              : 'No Tasks To Show'
            }
          </>
        )} />

        <Route path="/about" component={About} />

        <Footer />

      </div>
    </Router>
  );
}

export default App;