/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import "./DropFile.css";

export const DropFile = ({ readFile, title }: any) => {

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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#dcdcdc',
        borderStyle: 'dashed',
        color: "#999999",
        transition: 'border .24s ease-in-out',
        backgroundColor: isDragActive ? "#000000" : "#f6f6f6",
      }}
    >
      <div className="title-box">
        {title.length > 0 ? <p>📁 {title}</p> : <p>Drag & drop a CSV file here, or click to select one</p>}
      </div>
      <input {...getInputProps()} />
    </div>
  );
};

export default DropFile;
