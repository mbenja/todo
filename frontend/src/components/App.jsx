import React, { useState } from 'react';

import TitleBar from "./TitleBar";
import TodoList from "./TodoList";
import ArchiveList from "./ArchiveList";
import BottomMenuBar from "./BottomMenuBar";
import Collapse from '@material-ui/core/Collapse';

import '../styles/App.css';

function App() {
  const [isViewingArchive, setIsViewingArchive] = useState(false);

  return (
    <div className="app-container">
      <TitleBar />
      <Collapse in={!isViewingArchive} {...(!isViewingArchive ? { timeout: 500 } : {})}>
        <TodoList
          todos={["Take out the trash.", "Pet Mabel."]}
        />
      </Collapse>
      <Collapse in={isViewingArchive} {...(isViewingArchive ? { timeout: 500 } : {})}>
        <ArchiveList
          todos={["Take out the trash.", "Pet Mabel."]}
        />
      </Collapse>
      <BottomMenuBar
        onToggleArchiveClick={() => setIsViewingArchive(!isViewingArchive) }
        isViewingArchive={isViewingArchive}
      />
    </div>
  );
}

export default App;
