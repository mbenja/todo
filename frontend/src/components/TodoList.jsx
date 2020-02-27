import React from "react";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

import "../styles/TodoList.css";

const propTypes = {
    todos: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
    todos: []
}

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "4px",
        width: "100%"
    }
}));

function TodoList(props) {
    const classes = useStyles();
    const { todos } = props;

    function renderNoItems() {
        return (
            <ListItem key={`todo-item-${0}`} disabled role={undefined} dense button onClick={() => {}}>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText id={`todo-text-${0}`} primary="No Todos found here..." />
            </ListItem>
        )
    }

    function renderListItems() {
        return (
            todos.map((todo, i) =>
                <ListItem key={`todo-item-${i}`} role={undefined} dense button onClick={() => {}}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={false}
                            tabIndex={-1}
                            inputProps={{ 'aria-labelledby': `todo-checkbox-${i}` }}
                        />
                    </ListItemIcon>
                    <ListItemText id={`todo-text-${i}`} primary={todo} />
                    <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )
        )
    }
    
    return (
        <div className="todo-list-container">
            <List className={classes.root}>
                {todos.length > 0 ? renderListItems() : renderNoItems()}
            </List>
        </div>
    )
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;
export default TodoList;