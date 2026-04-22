import React, { useState, useEffect, FC } from 'react';
import './ImageUploader.css';

interface ImageUploaderProps {
  setFile: (file?: File | undefined) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({ setFile }) => {
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files && event.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setCurrentFile(file);
    setPreviewImage(preview);
  };

  useEffect(() => {
    setFile(currentFile);
  }, [currentFile, setFile]);

  const deleteFile = () => {
    setCurrentFile(undefined);
    setPreviewImage(undefined);
  };

  return (
    <div className="img-card">
      <div className="d-flex">
        <label htmlFor="uploadImage" className="btn-open-image">
          <i className="bi bi-image"></i>
          <input type="file" name="file" accept="image/*" id="uploadImage" onChange={selectFile} />
        </label>
        <p className="fw-bold fst-italic d-block mx-auto">
          {currentFile != null ? currentFile.name : 'Nenhum arquivo escolhido'}
        </p>
        <button type="button" className="btn-close-image" onClick={deleteFile}>
          <i className="bi bi-x-circle"></i>
        </button>
      </div>

      {previewImage && (
        <div>
          <img
            id="preView"
            className="rounded shadow d-block mx-auto img-fluid"
            src={previewImage}
            alt="..."
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
