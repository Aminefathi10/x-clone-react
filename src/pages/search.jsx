import SendIcon from '@mui/icons-material/Send';
import './ai.css';
import { useState } from 'react';
import axios from 'axios';


export default function search() {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

 async function handleSubmit(event){
    event.preventDefault();
    event.target.prompt.value = '';
    setLoading(true);
    setMessages(p => [...p, {
      type: 'prompt',
      value: userInput
    }]);
    try {
      const res = await fetch("http://localhost:3000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: userInput,
      })
    })
    .then(res => res.json());
    setLoading(false);
    setMessages(p => [...p, {
      type: 'response',
      value: res.res
    }]);
    } catch (err) {
      console.log(err.massage)
    }
  }


  return (
    <div className='Feed ai_container'>
      <div className='session-body'>
        {
          messages.map((message, i) => <p key={message.type + '_' + i} className={message.type}>{message.value}</p>)
        }
        {loading && <h3 style={{fontSize: '1.1em', fontWeight: 400, color: '#FFF5'}}>Thinking...</h3>}
      </div>
      <form onSubmit={handleSubmit} className='user-prompt'>
        <textarea onChange={e => setUserInput(e.target.value)} required name='prompt' placeholder='Ask anything...' rows='5'></textarea>
        <button onClick={postMessage} className="submit-prompt">
          <SendIcon className="" />
        </button>
      </form>
    </div>
  )
}
