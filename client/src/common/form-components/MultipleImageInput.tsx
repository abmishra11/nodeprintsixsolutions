import React from "react";
import { Typography, Box } from "@mui/material";
import DropZone from "./DropZone";
import { FieldError, UseFormRegister } from "react-hook-form";

interface MultipleImageInputProps {
  label: string;
  name: string;
  register?: UseFormRegister<any>;
  errors?: Record<string, FieldError | undefined>;
  isRequired?: boolean;
  imageFiles?: File[];
  setImageFiles: (files: File[]) => void;
  folderName: string;
  className?: string;
}

const MultipleImageInput: React.FC<MultipleImageInputProps> = ({
  label,
  name,
  register,
  errors,
  isRequired = false,
  imageFiles = [],
  setImageFiles,
  folderName,
  className = "col-12",
}) => {
  return (
    <div className={className}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle1" component="label" htmlFor={`input-${name}`}>
          {isRequired ? `* ${label}` : label}
        </Typography>
      </Box>

      <DropZone
        className="p-3 border border-secondary rounded text-center mb-3"
        imageFilesName={name}
        uploadingFolderName={folderName}
        uploadedFiles={imageFiles}
        setUploadedFiles={setImageFiles}
      />

      {errors && errors[name] && (
        <Typography variant="body2" color="error">
          {errors[name]?.message}
        </Typography>
      )}
    </div>
  );
};

export default MultipleImageInput;
