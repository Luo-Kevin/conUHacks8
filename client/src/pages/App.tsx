import React from "react";
import DropFile from "../components/DropFile";
import Calendar from "../components/Calendar";
import useFile from "../hooks/useFile";
import { postFile } from "../utils/api";
import { Heading, Button, Spinner } from "@chakra-ui/react";

import "./App.css";
import ReportCards from "../components/ReportCards";

function App() {
  const { readFile, data, title } = useFile();

  enum LoadingStatus {
    INIT,
    LOADING,
    LOADED,
  }
  const [loadingStatus, setLoadingStatus] = React.useState<LoadingStatus>(LoadingStatus.INIT);

  const handleSubmit = () => {
    setLoadingStatus(LoadingStatus.LOADING);
    setTimeout(() => {
      setLoadingStatus(LoadingStatus.LOADED);
    }, 1000);
    //postFile(data);
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
      {loadingStatus === LoadingStatus.LOADING && (
        <div className="spinner">
          <Spinner thickness="4px" emptyColor="gray.200" color="blue.500" size="xl" />
        </div>
      )}
      {loadingStatus === LoadingStatus.LOADED && (
        <div className="result-section">
          <div className="result-section-cards">
            <ReportCards />
          </div>
          <div className="result-section-calendar">
            <Calendar />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
