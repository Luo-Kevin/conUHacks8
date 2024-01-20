import React from "react";
import { useDropzone } from "react-dropzone";

const DropFile = () => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone();

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
      <p>Drag & drop a file here, or click to select one</p>
      <input {...getInputProps()} />
    </div>
  );
};

export default DropFile;
