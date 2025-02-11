import SendIcon from '@mui/icons-material/Send';
import './ai.css';
import { useState } from 'react'


export default function search() {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

 async function handleSubmit(event){
    event.preventDefault();
    event.target.prompt.value = '';
    setMessages(p => [...p, {
      type: 'prompt',
      value: userInput
    }]);
    try {
      const res = await fetch("https://x-clone-react-psi.vercel.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: userInput,
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
        <textarea onChange={e => setUserInput(e.target.value)} required name='prompt' placeholder='Ask anything...' rows='5'></textarea>
        <button onClick={postMessage} className="submit-prompt">
          <SendIcon className="" />
        </button>
      </form>
    </div>
  )
}
