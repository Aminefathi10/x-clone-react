
import "./Trend.css";
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';

function Trend({name, location, number}) {
  return (
    <div className='trend'>
      <p>Trending in {location}</p>
      <h1>{name}</h1>
      <p>{number} Posts</p>
      <i><MoreHorizRoundedIcon /></i>
    </div>
  )
}

export default Trend
