import React, { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Button, CircularProgress, Typography, Box, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  className?: string;
  imageFileName: string;
  uploadingFolderName: string;
  uploadedFile: string;
  setUploadedFile: (url: string) => void;
};

const DropZoneSingleFiles: React.FC<Props> = ({
  className = "",
  imageFileName,
  uploadingFolderName,
  uploadedFile,
  setUploadedFile,
}) => {
  const [imageFile, setImageFile] = useState<string>(uploadedFile || "");
  const [rejectedImageFile, setRejectedImageFile] = useState<FileRejection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadedFile(imageFile);
  }, [imageFile]);

  const handleImageChange = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append(uploadingFolderName, file);
    formData.append("filename", uploadingFolderName);
    formData.append("folder", uploadingFolderName);

    try {
      setLoading(true);
      const response = await fetch("/api/cloudinaryupload", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        alert("Failed to upload image.");
        return "";
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("An error occurred while uploading the image.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setRejectedImageFile(rejectedFiles);
      if (acceptedFiles.length > 0) {
        const imageUrl = await handleImageChange(acceptedFiles[0]);
        if (imageUrl) setImageFile(imageUrl);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1000,
    maxFiles: 1,
  });

  const removeImage = () => setImageFile("");
  const removeRejected = () => setRejectedImageFile([]);

  return (
    <div className={`mb-4 ${className}`}>
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #ccc",
          borderRadius: "8px",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
        }}
      >
        <input {...getInputProps()} name={imageFileName} />
        <Typography variant="body2" color="textSecondary">
          {isDragActive
            ? "Drop the image file here"
            : "Drag and drop an image file here, or click to select one"}
        </Typography>
      </Box>

      {loading && (
        <Box mt={2} display="flex" alignItems="center">
          <CircularProgress size={20} />
          <Typography variant="body2" ml={1}>
            Uploading...
          </Typography>
        </Box>
      )}

      {imageFile && (
        <Box mt={2} position="relative">
          <img
            src={imageFile}
            alt="Uploaded preview"
            style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
          />
          <IconButton
            size="small"
            onClick={removeImage}
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "#fff",
            }}
          >
            <CancelIcon />
          </IconButton>
        </Box>
      )}

      {rejectedImageFile.map(({ file, errors }) => (
        <Box key={file.name} mt={2} className="alert alert-warning">
          <Typography variant="subtitle2">{file.name}</Typography>
          <ul style={{ paddingLeft: 16 }}>
            {errors.map((error) => (
              <li key={error.code}>
                <Typography variant="body2" color="error">
                  {error.message}
                </Typography>
              </li>
            ))}
          </ul>
          <Button variant="text" size="small" onClick={removeRejected}>
            Remove
          </Button>
        </Box>
      ))}
    </div>
  );
};

export default DropZoneSingleFiles;
