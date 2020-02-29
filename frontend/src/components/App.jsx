import React, { useState, useEffect } from 'react';

import TitleBar from "./TitleBar";
import TodoList from "./TodoList";
import ArchiveList from "./ArchiveList";
import BottomMenuBar from "./BottomMenuBar";
import CustomSnackbar from "./CustomSnackbar";

import { getTodos, createTodo, deleteTodo, archiveTodo } from "../services/todosService";
import { getArchive, deleteArchive, restoreArchive } from "../services/archiveService";

import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';

import '../styles/App.css';

function App() {
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [finishedWorkingParams, setFinishedWorkingParams] = useState({ showSnackbar: false, result: "", message: "" });
  const [todos, setTodos] = useState([]);
  const [archive, setArchive] = useState([]);
  const [isViewingArchive, setIsViewingArchive] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoadingTodos(true);
      const todosResponse = await getTodos();
      setTodos(todosResponse);
      setIsLoadingTodos(false);

      setIsLoadingArchive(true);
      const archiveResponse = await getArchive();
      setArchive(archiveResponse);
      setIsLoadingArchive(false);
    }

    fetchData();
  }, []);

  async function handleCreateTodo(text) {
    setIsWorking(true);
    const response = await createTodo(text);
    setIsWorking(false);
    if (response.status === 200) {
      setTodos([...todos, { id: response.data.insertId, text: text }]);
      setFinishedWorkingParams({ showSnackbar: true, message: "Success!", result: "success" });
    } else {
      setFinishedWorkingParams({ showSnackbar: true, message: "Whoops, something went wrong.", result: "error" });
    }
  }

  async function handleDeleteTodo(id, isArchivedTodo) {
    setIsWorking(true);
    const response = isArchivedTodo ? await deleteArchive(id) : await deleteTodo(id);
    setIsWorking(false);
    if (response.status === 200) {
      if (isArchivedTodo) {
        setArchive(archive.filter(archivedTodo => archivedTodo.id !== id));
      } else {
        setTodos(todos.filter(todo => todo.id !== id));
      }
      setFinishedWorkingParams({ showSnackbar: true, message: "Success!", result: "success" });
    } else {
      setFinishedWorkingParams({ showSnackbar: true, message: "Whoops, something went wrong.", result: "error" });
    }
  }

  async function handleMoveTodo(todo, isRestore) {
    setIsWorking(true);
    const { postResponse, deleteResponse } = isRestore ? await restoreArchive(todo) : await archiveTodo(todo);
    setIsWorking(false);
    if (postResponse.status === 200 && deleteResponse.status === 200) {
      if (isRestore) {
        setArchive(archive.filter(archivedTodo => archivedTodo.id !== todo.id));
        setTodos([...todos, { id: postResponse.data.insertId, text: todo.text }]);
      } else {
        setTodos(todos.filter(curTodo => curTodo.id !== todo.id));
        setArchive([...archive, { id: postResponse.data.insertId, text: todo.text }]);
      }
      setFinishedWorkingParams({ showSnackbar: true, message: "Success!", result: "success" });
    } else {
      setFinishedWorkingParams({ showSnackbar: true, message: "Whoops, something went wrong.", result: "error" });
    }
  }

  function renderLoading() {
    return (
      <div className="app-loading-container">
        <LinearProgress variant="query" />
      </div>
    );
  }

  return (
    <div className="app-container">
      <TitleBar />
      <Collapse in={!isViewingArchive} {...(!isViewingArchive ? { timeout: 500 } : {})}>
        {isLoadingTodos ? renderLoading() : <TodoList todos={todos} onCreateTodo={(todo) => handleCreateTodo(todo)} onDeleteTodo={(todo, isArchivedTodo) => handleDeleteTodo(todo, isArchivedTodo)} onArchiveTodo={(todo, isRestore) => handleMoveTodo(todo, isRestore)} />}
      </Collapse>
      <Collapse in={isViewingArchive} {...(isViewingArchive ? { timeout: 500 } : {})}>
        {isLoadingArchive ? renderLoading() : <ArchiveList todos={archive} onDeleteTodo={(todo, isArchivedTodo) => handleDeleteTodo(todo, isArchivedTodo)} onRestoreTodo={(todo, isRestore) => handleMoveTodo(todo, isRestore)} />}
      </Collapse>
      <BottomMenuBar
        onToggleArchiveClick={() => setIsViewingArchive(!isViewingArchive)}
        isViewingArchive={isViewingArchive}
      />
      <CustomSnackbar isOpen={isWorking} severity="info" message="Working..." onClose={() => setIsWorking(false)} />
      <CustomSnackbar isOpen={finishedWorkingParams.showSnackbar} severity={finishedWorkingParams.result} message={finishedWorkingParams.message} onClose={() => setFinishedWorkingParams({ ...finishedWorkingParams, showSnackbar: false })} />
    </div>
  );
}

export default App;
