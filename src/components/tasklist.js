import React, { useState } from 'react';
import styles from './tasklist.module.css';
import TaskModal from './TaskModal'; // Make sure to create this component

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

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
    // Close the modal if the task being viewed is deleted
    if (selectedTask && selectedTask === tasks[index]) {
      setSelectedTask(null);
    }
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => (
      i === index ? { ...task, completed: !task.completed } : task
    ));
    setTasks(updatedTasks);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
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
        <div key={index} className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
             onClick={() => handleTaskClick(task)}>
          <div className={styles.taskDetails}>
            <p className={styles.taskTitle}>{task.title}</p>
            <p className={styles.taskDueDate}>Due by {task.dueDate}</p>
          </div>
          <div className={styles.taskActions}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the modal from opening
                toggleCompletion(index);
              }}
              className={styles.completeButton}>
              {task.completed ? 'Completed' : 'Complete'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents the modal from opening
                deleteTask(index);
              }}
              className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default TaskList;
