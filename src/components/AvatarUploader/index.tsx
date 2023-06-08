// React and hooks
import { useEffect, useState } from 'react';

// Components
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// Types
interface IAvatarUploader {
  file: File;
  setFile: (file: File) => void;
  reset: boolean;
}

const AvatarUploader = ({ file, setFile, reset }: IAvatarUploader) => {
  const [selectedFile, setSelectedFile] = useState(file);
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    if (reset) {
      setSelectedFile(null);
      setPreviewImage(null);
    }
    if (selectedFile && !reset) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
    }
  }, [selectedFile, reset]);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Button
      variant="outlined"
      color="secondary"
      component="label"
      startIcon={previewImage ? null : <PhotoCamera sx={{ margin: "0px" }} />}
      sx={{
        flexDirection: 'column',
        alignItems: 'center',
        width: "100%",
        heigth: "100%",
        border: "none",
        "&:hover": {
          border: "none",
          backgroundColor: 'inherit',
          color: 'inherit',
        },
      }}
    >
      {previewImage ? (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "300px", maxWidth: "100%" }}
        />
      ) : (
        selectedFile === null ? "Escolha uma imagem" : ""
      )}
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileSelect}
      />
    </Button>
  );
};

export default AvatarUploader;
