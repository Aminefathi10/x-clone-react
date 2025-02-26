import SendIcon from '@mui/icons-material/Send';
import './ai.css';
import { useState, useEffect } from 'react';


const ioConfig = {
  withCredentials: true,
};
const socket = io();


export default function search() {


  const [messages, setMessages] = useState([]);
  // const [resChuncks, setResChunks] = useState([]);
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
    socket.emit('prompt', userInput);
    
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    socket.on('response', createResponse);
    return () => socket.off('response', createResponse);
  });

  const createResponse = (result) => {
    setMessages(p => [...p, {
      type: 'response',
      value: result
    }])
    setLoading(false);
  }

  


  return (
    <div className='Feed ai_container'>
      <div className='session-body'>
        {
          messages.map((message, i) => <p key={message.type + '_' + i} className={message.type}>{message.value}</p>)
        }
        {loading && <h3 className='gradient-text' style={{fontSize: '1.1em', fontWeight: 400, color: '#FFF5'}}>Thinking...</h3>}
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
