import React, { useState } from "react";
import { Client, Storage, ID } from "appwrite";
import axios from "axios";

// Initialize Appwrite client and storage
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(""); // Replace with your Project ID

const storage = new Storage(client);
const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.REACT_APP_PINATA_SECRET_KEY;

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setStatus("");
    }
  };

  // Handle file upload submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setStatus("Uploading...");

    try {
      // Upload to IPFS using Pinata API
      const fileData = new FormData();
      fileData.append("file", file);
      const ipfsResponse = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        fileData,
        {
          headers: {
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const ipfsLink = `https://gateway.pinata.cloud/ipfs/${ipfsResponse.data.IpfsHash}`;

      // Store CID link in Appwrite Storage
      const bucketId = ""; // Replace with your Appwrite Bucket ID
      const fileBlob = new Blob([file], { type: file.type });
      const fileId = ID.unique();

      const fileUploadResponse = await storage.createFile(
        bucketId,
        fileId,
        fileBlob
      );
      setStatus(
        `File uploaded successfully! File ID: ${fileUploadResponse.$id}`
      );
      console.log("File uploaded to Appwrite: ", fileUploadResponse);
      console.log("File uploaded to IPFS: ", ipfsLink);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      console.error("Error uploading file: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>Health Blockchain File Upload</h2>
        <p>
          Securely upload files related to health records or blockchain data.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*,application/pdf"
            />
          </div>
          <button type="submit" className="upload-btn" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </form>

        <div
          className={
            status.includes("Error")
              ? "status-message error"
              : "status-message success"
          }
        >
          {status}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

