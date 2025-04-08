import PropTypes from 'prop-types';
import classes from '../CSS/EditingArea.module.css';
import TextDisplay from "./TextDisplay";
import Toolbar from "./Toolbar";

export default function EditingArea(props) {
    return (
      <form className={classes.form}>
        <div>
          <TextDisplay 
            text={props.text}
            fontFamily={props.fontFamily}
            fontSize={props.fontSize}
            color={props.color}
          />
          <Toolbar text={props.text} setText={props.setText} />
        </div>
      </form>
    );
  }
  
EditingArea.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}
