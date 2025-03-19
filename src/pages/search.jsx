import SendIcon from '@mui/icons-material/Send';
import './ai.css';
import { useState, useEffect, useRef } from 'react';


const ioConfig = {
  withCredentials: true,
};
const socket = io('http://localhost:8000', ioConfig);


export default function search() {

  const sessionDisRef = useRef(null);
  const [messages, setMessages] = useState([]);
  // const [resChuncks, setResChunks] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 async function handleSubmit(event){
    event.preventDefault();
    event.target.prompt.value = '';
    if(error) setError(null);
    setLoading(true);
    setMessages(p => [...p, {
      type: 'prompt',
      value: userInput
    }]);
    scrollToLastMessage();
    try {
    socket.emit('prompt', userInput);
    
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    socket.on('response', createResponse);
    socket.on('error', handleError);
    return () => {
      socket.off('response', createResponse);
      socket.off('error', handleError);
    };
  });

  const createResponse = (result) => {
    // sessionDisRef.current.scrollTop = sessionDisRef.current.scrollHeight;
    setMessages(p => [...p, {
      type: 'response',
      value: result
    }])
    setLoading(false);
    scrollToLastMessage();
  }
  const handleError = res => {
    // sessionDisRef.current.scrollTop = sessionDisRef.current.scrollHeight;
    scrollToLastMessage();
    setLoading(false);
    setError(res);
  }
  
  const scrollToLastMessage = () => {
    const top = sessionDisRef.current.lastChild.offsetTop;
    sessionDisRef.current.scrollTop = top;
  }

  return (
    <div className='Feed ai_container'>
      <div className='session-body' ref={sessionDisRef}>
        {
          messages.map((message, i) => <p key={message.type + '_' + i} className={message.type}>{message.value}</p>)
        }
        {loading && <h3 className='gradient-text' style={{fontSize: '1.1em', fontWeight: 400, color: '#FFF5'}}>Thinking...</h3>}
        {error && <message style={{fontSize: '1.1em', padding: '8px', background: '#f003', width: 'fit-content', margin: '10px', borderRadius: 5, color: '#f00', border: 'solid #f00 1px'}}>{error}</message>}
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
