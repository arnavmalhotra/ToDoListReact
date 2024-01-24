import React, { useState } from 'react';
import styles from './tasklist.module.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');

  const addTask = () => {
    if (!newTask) return; // Prevents adding empty tasks
    const taskDetails = {
      title: newTask,
      dueDate: dueDate,
      completed: false
    };
    setTasks([...tasks, taskDetails]);
    setNewTask('');
    setDueDate('');
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.taskListContainer}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={styles.taskInput}
          placeholder="Enter a new task"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.taskDateInput}
        />
        <button onClick={addTask} className={styles.addTaskButton}>
          Add Task
        </button>
      </div>
      {tasks.map((task, index) => (
        <div key={index} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
          <div className={styles.taskDetails}>
            <p className={styles.taskTitle}>{task.title}</p>
            <p className={styles.taskDueDate}>Due by {task.dueDate}</p>
          </div>
          <div>
            <button
              onClick={() => toggleCompletion(index)}
              className={styles.completeButton}>
              {task.completed ? 'Completed' : 'Complete'}
            </button>
            <button
              onClick={() => deleteTask(index)}
              className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
