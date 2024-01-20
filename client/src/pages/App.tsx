import React from 'react';
import DropFile from '../components/DropFile';
import useFile from '../hooks/useFile';
import { postFile } from '../utils/api';
import { Heading, Button } from '@chakra-ui/react'

import './App.css';


function App() {
  
  const { readFile, data } = useFile();

  const handleSubmit = () => {
    postFile(data);
  }

  return (
    <div className="main-container">
    <div className='landing-section'>
    <Heading as='h1' noOfLines={1}>
      Repair Service Scheduler 
    </Heading>
    </div>

    <div className='file-upload-section'>
      <div className = 'file-upload-section-div'>
      <DropFile className = "file-upload-section" readFile={readFile} />
      </div>
      <Button className = 'upload-file-button' onClick={handleSubmit}>Upload</Button>
    </div>
    </div>
  );
}

export default App;
