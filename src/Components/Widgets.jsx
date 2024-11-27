
import "./Widgets.css";
import Trend from './Trend';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function Widgets() {
  return (
    <div className='Widgets'>
      <div className="serch__section">
        <i><SearchRoundedIcon /></i>
        <input type="text" placeholder='Search' />
      </div>
      <div className="trendings">
        <Trend name="custom" location="USA" number="540k" />
        <Trend name="darnold" location="morocco" number="20k" />
        <Trend name="BTC" location="USA" number="350k" />
        <Trend name="Election" location="morocco" number="5k" />
        <Trend name="judaism" location="morocco" number="10k" />
        <Trend name="$CUTO" location="morocco" number={20} />
        <Trend name="Vindman" location="morocco" number={20} />
        <Trend name="Delete" location="morocco" number={20} />
        <Trend name="amine" location="morocco" number={20} />
      </div>
      <div className="Suggestions">
        
      </div>
    </div>
  )
}

export default Widgets
