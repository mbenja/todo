import React from "react";
import PropTypes from "prop-types";

import Button from '@material-ui/core/Button';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

import "../styles/BottomMenuBar.css";

const propTypes = {
    onToggleArchiveClick: PropTypes.func,
    isViewingArchive: PropTypes.bool
};

const defaultProps = {
    onViewArchiveClick: () => {},
    isViewingArchive: false
};

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

function BottomMenuBar(props) {
    const { onToggleArchiveClick, isViewingArchive } = props;
    const classes = useStyles();

    return (
        <div className="bottom-menu-bar-container">
            <Button
                variant="outlined"
                color="default"
                className={classes.button}
                startIcon={<SettingsIcon />}
            >
                Settings
            </Button>
            <Button
                variant="outlined"
                color="default"
                className={classes.button}
                onClick={onToggleArchiveClick}
                startIcon={isViewingArchive ? <ListIcon /> : <ArchiveIcon />}
            >
                {isViewingArchive ? "View Todos" : "View Archive" }
            </Button>
        </div>
    )
}

BottomMenuBar.propTypes = propTypes;
BottomMenuBar.defaultProps = defaultProps;
export default BottomMenuBar;