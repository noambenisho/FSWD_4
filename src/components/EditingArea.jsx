import PropTypes from 'prop-types';
import classes from '../CSS/EditingArea.module.css';
import TextDisplay from "./TextDisplay";
import Toolbar from "./Toolbar";
import TextEditor from './TextEditor';

export default function EditingArea(props){
    const text = props.text;
    const setText = props.setText;

    return (
    <>
      <form className={classes.form}>
      <TextEditor text={text} setText={setText}/>
        </form>
        <form className={classes.form}>
        <p>
            <TextDisplay text={text} />
            <Toolbar text={text} setText={setText} />
        </p>
        </form>
    </>
    );
}

EditingArea.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}
