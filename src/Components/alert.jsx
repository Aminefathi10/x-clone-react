import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import './alert.css'


export default function Alert({error}) {

  return (
    <div className='alert'>
      <ErrorOutlineIcon />
      <p>{error}</p>
    </div>
  )
}
