import React from "react";

function useFile() {
  const [data, setData] = React.useState<string>("");

  const readFile = (files: Blob[]) => {
    // Handle the dropped files here
    files.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onload = () => {
        const csvData = reader.result;
        // Now you can do something with the CSV data, for example, send it to the server
        setData(csvData as string);
        console.log(data);
      };
      reader.readAsText(file);
    });
  };

  return { data, readFile };
}

export default useFile;
