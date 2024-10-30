import { useState } from 'react';
import '../App.css';
import { v4 as uuid } from 'uuid';

export default function Form({ setData }) {

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDateTime, setTaskDateTime] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      uniqueID: uuid(),
      name: taskName,
      description: taskDescription,
      time: taskDateTime,
      status: false,
    };

    setData(newTask);

    setTaskName('');
    setTaskDescription('');
    setTaskDateTime('');
  }

  return (
    <form className='new-task' onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder='Task Name'
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder='Task Description'
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
      />
      <input
        required
        type="datetime-local"
        value={taskDateTime}
        onChange={(e) => setTaskDateTime(e.target.value)}
      />
      <input
        required
        type="submit"
        value="Add Task"
      />
    </form>
  )
}
