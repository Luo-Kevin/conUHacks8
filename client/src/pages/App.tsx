import React from "react";
import DropFile from "../components/DropFile";
import Calendar from "../components/Calendar";
import useFile from "../hooks/useFile";
import { postFile } from "../utils/api";
import { Heading, Button, Spinner } from "@chakra-ui/react";

import "./App.css";
import ReportCards from "../components/ReportCards";
import ExportBtn from "../components/ExportBtn";

function App() {
  const { readFile, data, title } = useFile();

  enum LoadingStatus {
    INIT,
    LOADING,
    LOADED,
  }
  const [loadingStatus, setLoadingStatus] = React.useState<LoadingStatus>(LoadingStatus.INIT);
  const [results, setResults] = React.useState<any>(null)

  const handleSubmit = async () => {
    setLoadingStatus(LoadingStatus.LOADING);

    const response = await postFile(data);
    if (response) {
      setResults(response)
      console.log(response)
      setLoadingStatus(LoadingStatus.LOADED)
    }
  };

  console.log(data)


  return (
    <div className="main-container">
      <div className="landing-section">
        <Heading as="h1" noOfLines={1}>
          Tire Repair Service Scheduler
        </Heading>
      </div>
      <div className="file-upload-section">
        <div className="file-upload-section-div">
          <DropFile className="file-upload-section" readFile={readFile} title={title} />
        </div>
      </div>

      <div className="btn-section">
        <Button
          isDisabled={loadingStatus === LoadingStatus.LOADING}
          className="upload-file-button"
          onClick={handleSubmit}
          mx="auto"
        // display="block"
        >
          Upload
        </Button>
        {results !== undefined ? <ExportBtn data={results?.serviced_vehicles_schedule} /> : ""}
      </div>


      {loadingStatus === LoadingStatus.LOADING && (
        <div className="spinner">
          <Spinner thickness="4px" emptyColor="gray.200" color="blue.500" size="xl" />
        </div>
      )}
      {loadingStatus === LoadingStatus.LOADED && (
        <div className="result-section">
          <div className="result-section-div">
            <ReportCards
              revenue={results.revenue}
              lost_revenue={results.lost_revenue}
              count_turnover={results.count_turnover}
              compact_turnover={results.compact_turnover}
              medium_turnover={results.medium_turnover}
              full_size_turnover={results.full_size_turnover}
              class_1_turnover={results.class_1_turnover}
              class_2_turnover={results.class_2_turnover}
              count_serviced={results.count_serviced}
              compact_serviced={results.compact_serviced}
              medium_serviced={results.medium_serviced}
              full_size_serviced={results.full_size_serviced}
              class_1_serviced={results.class_1_serviced}
              class_2_serviced={results.class_2_serviced}
            />
          </div>
          <div className="result-section-div">
            <Calendar data={results} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
