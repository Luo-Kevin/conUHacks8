import React from "react";

function useFile() {
  const [data, setData] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");

  const readFile = (files: File[]) => {
    // Handle the dropped files here
    files.forEach((file: File) => {
      const reader = new FileReader();

      setTitle(file.name);
      reader.onload = () => {
        const csvData = reader.result;
        // Now you can do something with the CSV data, for example, send it to the server
        setData(csvData as string);
        // setTitle(file);
      };

      reader.readAsText(file);
    });
  };

  return { title, data, readFile };
}

export default useFile;
