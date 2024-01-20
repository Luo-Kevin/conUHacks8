import React from 'react';
import DropFile from '../components/DropFile';
import useFile from '../hooks/useFile';
import { postFile } from '../utils/api';

import './App.css';


function App() {

  const { readFile, data } = useFile();

  const handleSubmit = () => {
    postFile(data);
  }

  return (
    <div >
      <DropFile readFile={readFile} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
}

export default App;
