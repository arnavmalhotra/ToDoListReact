import React from 'react';
import styles from './TaskList.module.css';

const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>{task.title}</h2>
        <p>Due by: {task.dueDate}</p>
        <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
        <button onClick={onClose} className={styles.closeModalButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
