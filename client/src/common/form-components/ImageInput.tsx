import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import DropZoneSingleFiles from './DropZoneSingleFile'

interface ImageInputProps {
  label: string;
  name: string;
  register?: any; // If using react-hook-form, type accordingly
  errors?: Record<string, any>;
  isRequired?: boolean;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  folderName: string;
  className?: string; // for bootstrap layout like "col-sm-6"
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = false,
  imageFile,
  setImageFile,
  folderName,
  className = 'col-sm-12',
}) => {
  return (
    <div className={className}>
      <Typography variant="subtitle1" gutterBottom component="label">
        {isRequired ? `* ${label}` : label}
      </Typography>

      <Box
        sx={{
          border: '1px solid #ddd',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          color: 'text.secondary',
          mb: 2,
        }}
      >
        <DropZoneSingleFiles
          imageFileName={name}
          uploadingFolderName={folderName}
          uploadedFile={imageFile}
          setUploadedFile={setImageFile}
        />
      </Box>

      {errors?.[name] && (
        <Typography variant="body2" color="error">
          {errors[name].message || 'This field is required'}
        </Typography>
      )}
    </div>
  );
};

export default ImageInput;
