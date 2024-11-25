import React, { useState } from "react";
import { Client, Storage, ID } from "appwrite";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
  .setProject(''); // Replace with your Project ID

const storage = new Storage(client);

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setStatus("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setStatus("Uploading...");

    try {
      const bucketId = ""; // Replace with your Bucket ID
      const response = await storage.createFile(bucketId, ID.unique(), file);

      setStatus("File uploaded successfully! File ID: " + response.$id);
      console.log("File uploaded: ", response);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      console.error("Error uploading file: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <div className="upload-box">
        <h2>Upload Your File</h2>
        <p>Upload files related to your health records or blockchain data.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
          />
          <button type="submit" className="upload-btn" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        <div className={status.includes("Error") ? "error" : "success"}>
          {status}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

