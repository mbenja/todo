import React, { useState } from "react";
import PropTypes from "prop-types";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Input from "@material-ui/core/Input";
import DeleteIcon from '@material-ui/icons/Delete';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

import "../styles/ArchiveList.css";

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
        width: "100%",
    },
    search: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        borderRadius: "4px",
        padding: "8px",
        width: "100%",
    }
}));

function ArchiveList(props) {
    const classes = useStyles();
    const { todos } = props;
    const [filteredTodos, setFilteredTodos] = useState(todos);

    function handleSearchTextChange(event) {
        const searchText = event.target.value

        if (searchText !== "") {
            setFilteredTodos(todos.filter((todo => todo.text.toLowerCase().includes(searchText.toLowerCase()))));
        } else {
            setFilteredTodos(todos);
        }
    }

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

    function renderListItems(todos) {
        return (
            todos.map((todo) =>
                <ListItem key={`todo-item-${todo.id}`} role={undefined} dense button onClick={() => {}}>
                    <ListItemIcon>
                        <UnarchiveIcon />
                    </ListItemIcon>
                    <ListItemText id={`todo-text-${todo.id}`} primary={todo.text} />
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
        <div className="archive-list-container">
            <div className="archive-list-search-container">
                <Input
                    classes={{ root: classes.search }}
                    startAdornment={<SearchIcon style={{ marginRight: "8px" }} />}
                    placeholder="Search for an archived todo..."
                    onChange={handleSearchTextChange}
                    disableUnderline
                />
            </div>
            <List className={classes.root}>
                {filteredTodos.length > 0 ? renderListItems(filteredTodos) : renderNoItems()}
            </List>
        </div>
    )
}

ArchiveList.propTypes = propTypes;
ArchiveList.defaultProps = defaultProps;
export default ArchiveList;