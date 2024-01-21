import React from "react";
import DropFile from "../components/DropFile";
import Calendar from "../components/Calendar";
import useFile from "../hooks/useFile";
import { postFile } from "../utils/api";
import { Heading, Button } from "@chakra-ui/react";

import "./App.css";
import ReportCards from "../components/ReportCards";

function App() {
  const { readFile, data, title } = useFile();

  const handleSubmit = () => {
    postFile(data);
  };

  return (
    <div className="main-container">
      <div className="landing-section">
        <Heading as="h1" noOfLines={1}>
          Repair Service Scheduler
        </Heading>
      </div>
      <div className="file-upload-section">
        <div className="file-upload-section-div">
          <DropFile className="file-upload-section" readFile={readFile} title={title} />
        </div>
      </div>
      <Button className="upload-file-button" onClick={handleSubmit} mx="auto" display="block">
        Upload
      </Button>

      <ReportCards />

      <Calendar />
    </div>
  );
}

export default App;
