import React, { useState } from "react";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from "@material-ui/core/Input";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import CreateIcon from '@material-ui/icons/Create';
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from '@material-ui/core/styles';

import "../styles/TodoList.css";

const propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onCreateTodo: PropTypes.func,
    onDeleteTodo: PropTypes.func,
    onArchiveTodo: PropTypes.func
};

const defaultProps = {
    todos: [],
    onCreateTodo: () => { },
    onDeleteTodo: () => { },
    onArchiveTodo: () => { }
}

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "4px",
        width: "100%"
    },
    create: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    }
}));

function TodoList(props) {
    const [createTodoText, setCreateTodoText] = useState("");
    const classes = useStyles();
    const { todos, onCreateTodo, onDeleteTodo, onArchiveTodo } = props;

    function handleCreateTodo() {
        setCreateTodoText("");
        onCreateTodo(createTodoText);
    }

    function renderCreateItem() {
        return (
            <ListItem key={`todo-item-${-1}`} role={undefined} dense>
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <Input
                    classes={{ root: classes.create }}
                    placeholder="Compose a todo item here..."
                    onChange={(e) => setCreateTodoText(e.target.value)}
                    onKeyDown={(e) => e.keyCode === 13 ? handleCreateTodo() : null}
                    value={createTodoText}
                    disableUnderline
                />
                <ListItemSecondaryAction onClick={() => handleCreateTodo()}>
                    <IconButton edge="end">
                        <AddIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    function renderNoItems() {
        return (
            <ListItem key={`todo-item-${0}`} disabled role={undefined} dense button onClick={() => { }}>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText id={`todo-text-${0}`} primary="No Todos found here..." />
            </ListItem>
        )
    }

    function renderListItems() {
        return (
            todos.map((todo) =>
                <ListItem key={`todo-item-${todo.id}`} role={undefined} dense button onClick={() => onArchiveTodo(todo)}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={false}
                            tabIndex={-1}
                            inputProps={{ 'aria-labelledby': `todo-checkbox-${todo.id}` }}
                        />
                    </ListItemIcon>
                    <ListItemText id={`todo-text-${todo.id}`} primary={todo.text} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => onDeleteTodo(todo.id)}>
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
                {renderCreateItem()}
                {todos.length > 0 ? renderListItems() : renderNoItems()}
            </List>
        </div>
    )
}

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;
export default TodoList;