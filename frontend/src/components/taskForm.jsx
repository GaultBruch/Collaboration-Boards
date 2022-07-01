import { useEffect, useState } from 'react';
import axios from 'axios';



function TaskForm(props) {

  const [textVal, setTextVal] = useState('');
  const [nameVal, setNameVal] = useState('');
  const [dueDate, setDueDate] = useState ();

  function handleTextChange(e) {
    setTextVal(e.target.value);
  }

  function handleNameChange(e) {
    setNameVal(e.target.value);
  }

  function handleDateChange(e) {
    setDueDate(e.target.value);
  }

  function handleSubmit(e) {
    alert('A new task has been submitted');
    e.preventDefault();
    console.log(props.id);
    let message = {
      title: nameVal,
      documentation: textVal,
      status: 'Incomplete',
      deadline: dueDate
    };
    try {
      axios.post(`http://localhost:5000/api/boards/${props.id}`, {
        title: nameVal,
        documentation: textVal,
        status: 'Incomplete',
        deadline: dueDate

      }, {crossDomain: true})
    .then(res => {
      setTextVal('');
      setNameVal('');
      setDueDate();
      props.rebuild(true);
    });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" value={nameVal} onChange={handleNameChange} />
      </label>

      <label>
        Description
        <textarea type="text" value={textVal} onChange={handleTextChange} />
      </label>

      <label>
        Deadline( *Optional)
        <input type='date' value={dueDate} onChange={handleDateChange} />
      </label>
      <input type="submit" value="Submit" />


    </form>
  )
}

export default TaskForm