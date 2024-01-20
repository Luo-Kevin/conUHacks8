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
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#dcdcdc',
        borderStyle: 'dashed',
        color: '#90EE90',
        transition: 'border .24s ease-in-out',
        backgroundColor: isDragActive ? "#000000" : "#f6f6f6",        
      }}
    >
      <p>Drag & drop a CSV file here, or click to select one</p>

      <input {...getInputProps()} />
    </div>
  );
};

export default DropFile;
