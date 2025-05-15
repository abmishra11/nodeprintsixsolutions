import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { IconButton, CircularProgress, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

type DropZoneProps = {
  className?: string;
  imageFilesName: string;
  uploadingFolderName: string;
  uploadedFiles: string[];
  setUploadedFiles: (files: string[]) => void;
};

const DropZone: React.FC<DropZoneProps> = ({
  className = '',
  imageFilesName,
  uploadingFolderName,
  uploadedFiles,
  setUploadedFiles,
}) => {
  const [imageFiles, setImageFiles] = useState<string[]>(uploadedFiles);
  const [rejectedImageFiles, setRejectedImageFiles] = useState<FileRejection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUploadedFiles(imageFiles);
  }, [imageFiles, setUploadedFiles]);

  const handleImageChange = async (file: File): Promise<string | null> => {
    if (!file) return null;
    setLoading(true);
    const formData = new FormData();
    formData.append(uploadingFolderName, file);
    formData.append('filename', uploadingFolderName);
    formData.append('folder', uploadingFolderName);

    try {
      const response = await fetch('/api/cloudinaryupload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        alert('Failed to upload image.');
        return null;
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('An error occurred while uploading image.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setLoading(true);
      const uploaded: string[] = [];

      for (const file of acceptedFiles) {
        const url = await handleImageChange(file);
        if (url) uploaded.push(url);
      }

      if (uploaded.length) {
        setImageFiles(prev => [...prev, ...uploaded]);
      }

      if (rejectedFiles.length) {
        setRejectedImageFiles(prev => [...prev, ...rejectedFiles]);
      }

      setLoading(false);
    },
    [handleImageChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxSize: 2 * 1024 * 1024, // 2MB
    maxFiles: 4,
  });

  const removeFile = (fileUrl: string) => {
    setImageFiles(prev => prev.filter(file => file !== fileUrl));
  };

  const removeRejected = (name: string) => {
    setRejectedImageFiles(prev =>
      prev.filter(({ file }) => file.name !== name)
    );
  };

  return (
    <div className={className}>
      <div {...getRootProps({ className: 'border p-4 text-center bg-light rounded mb-3' })}>
        <input {...getInputProps()} name={imageFilesName} />
        <Typography variant="body1">
          {isDragActive ? 'Drop the file here' : 'Drag and drop some image here, or click to select images'}
        </Typography>
      </div>

      {loading && <CircularProgress className="d-block mx-auto mb-3" />}

      <div className="mb-4">
        <div className="row g-3">
          {imageFiles.map((file, index) => (
            <div key={index} className="col-6 col-md-4 col-xl-3 position-relative">
              <IconButton
                size="small"
                style={{ position: 'absolute', top: 5, right: 5, background: 'white' }}
                onClick={() => removeFile(file)}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <img
                src={file}
                alt={`uploaded-${index}`}
                className="img-fluid rounded"
                style={{ height: 130, objectFit: 'cover', width: '100%' }}
              />
            </div>
          ))}
        </div>

        {rejectedImageFiles.length > 0 && (
          <div className="mt-4">
            {rejectedImageFiles.map(({ file, errors }) => (
              <div key={file.name} className="d-flex justify-content-between align-items-start border p-2 rounded mb-2">
                <div>
                  <Typography variant="body2" color="textSecondary">
                    {file.name}
                  </Typography>
                  <ul className="text-danger small mb-0">
                    {errors.map(error => (
                      <li key={error.code}>{error.message}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  size="small"
                  variant="text"
                  color="error"
                  onClick={() => removeRejected(file.name)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
