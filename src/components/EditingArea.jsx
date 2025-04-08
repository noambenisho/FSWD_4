import PropTypes from 'prop-types';
import classes from '../CSS/EditingArea.module.css';
import TextDisplay from "./TextDisplay";
import Toolbar from "./Toolbar";

export default function EditingArea(props){
    const text = props.text;
    const setText = props.setText;

    return (
        <form className={classes.form}>
        <div>
            <TextDisplay text={text} />
            <Toolbar text={text} setText={setText} />
        </div>
        </form>
    );
}

EditingArea.PropTypes = {
    text: PropTypes.string.isRequired,
    setText: PropTypes.func.isRequired,
}
