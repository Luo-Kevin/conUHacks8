/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";


export const DropFile = ({ readFile }: any) => {

  const onDrop = useCallback((acceptedFiles: Blob[]) => {

    // Handle the dropped files here
    readFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    //@ts-ignore
    accept: ".csv", // Specify the accepted file types, in this case, only CSV files
  });


  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px solid #000000",
        borderRadius: "4px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive ? "#000000" : "#ffffff",
      }}
    >
      <p>Drag & drop a CSV file here, or click to select one</p>

      <input {...getInputProps()} />
    </div>
  );
};

export default DropFile;
