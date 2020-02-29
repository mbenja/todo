import React from "react";
import PropTypes from "prop-types";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const propTypes = {
    isOpen: PropTypes.bool,
    severity: PropTypes.string,
    message: PropTypes.string,
    duration: PropTypes.number,
    onClose: PropTypes.func
};

const defaultProps = {
    isOpen: false,
    severity: "info",
    message: "",
    duration: 6000,
    onClose: () => {}
};

function CustomSnackbar(props) {
    const { isOpen, severity, message, duration, onClose } = props;

    return (
        <Snackbar open={isOpen} autoHideDuration={duration} onClose={onClose}>
            <MuiAlert elevation={6} variant="filled" severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

CustomSnackbar.propTypes = propTypes;
CustomSnackbar.defaultProps = defaultProps;
export default CustomSnackbar;