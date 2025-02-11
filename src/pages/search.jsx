import SendIcon from '@mui/icons-material/Send';
import './ai.css';
import { useState } from 'react'


export default function search() {

  const [messages, setMessages] = useState([]);

 async function handleSubmit(event){
    event.preventDefault();
    setMessages(p => [...p, {
      type: 'prompt',
      value: event.target.prompt.value
    }]);
    try {
      const res = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: event.target.prompt.value,
      })
    })
    .then(res => res.json());

    setMessages(p => [...p, {
      type: 'response',
      value: res.res
    }]);
    console.log(messages)
    } catch (err) {
      console.log(err)
    }
    

  }


  return (
    <div className='Feed ai_container'>
      <div className='session-body'>
        {
          messages.map((message, i) => <p key={message.type + '_' + i} className={message.type}>{message.value}</p>)
        }
      </div>
      <form onSubmit={handleSubmit} className='user-prompt'>
        <button onClick={postMessage} className="submit-prompt">
          <SendIcon className="" />
        </button>
        <textarea name='prompt' placeholder='Ask anything...' rows='5'></textarea>
      </form>
    </div>
  )
}
