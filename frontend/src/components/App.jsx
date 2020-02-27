import React, { useState, useEffect } from 'react';

import TitleBar from "./TitleBar";
import TodoList from "./TodoList";
import ArchiveList from "./ArchiveList";
import BottomMenuBar from "./BottomMenuBar";
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getTodos } from "../services/todosService";
import { getArchive } from "../services/archiveService";

import '../styles/App.css';

function App() {
  const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
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
        {isLoadingTodos ? renderLoading() : <TodoList todos={todos} />}
      </Collapse>
      <Collapse in={isViewingArchive} {...(isViewingArchive ? { timeout: 500 } : {})}>
        {isLoadingArchive ? renderLoading() : <ArchiveList todos={archive} />}
      </Collapse>
      <BottomMenuBar
        onToggleArchiveClick={() => setIsViewingArchive(!isViewingArchive) }
        isViewingArchive={isViewingArchive}
      />
    </div>
  );
}

export default App;
