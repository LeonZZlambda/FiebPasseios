import React, { useState, useEffect, FC } from 'react';
import './ImageUploader.css';

interface ImageUploaderModalProps {
  setFile: (file?: File | undefined) => void;
  setImage: (image?: string | undefined) => void;
  chosenImage?: string | undefined;
}

const ImageUploaderModal: FC<ImageUploaderModalProps> = ({ setFile, setImage, chosenImage }) => {
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

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

  const confirmFile = () => {
    setImage(previewImage);
    setIsOpen(false);
  };

  const deleteFile = () => {
    setCurrentFile(undefined);
    setPreviewImage(undefined);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary my-2"
        onClick={() => setIsOpen(true)}
      >
        {currentFile == undefined ? 'Escolher uma imagem' : 'Trocar a imagem'}
      </button>

      {isOpen && <div className="modal-backdrop" onClick={() => setIsOpen(false)} />}

      <div
        className={`modal fade ${isOpen ? 'show d-block' : 'd-none'}`}
        id="imageModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden={!isOpen}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Escolha a Imagem
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="img-card">
                <div className="d-flex">
                  <label htmlFor="uploadImage" className="btn-open-image">
                    <i className="bi bi-image"></i>
                    <input
                      type="file"
                      name="file"
                      accept="image/*"
                      id="uploadImage"
                      onChange={selectFile}
                    />
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
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={deleteFile}
                className="btn btn-warning"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmFile}
                className="btn btn-primary"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
      {chosenImage && (
        <div>
          <img
            id="preView"
            className="rounded shadow d-block mx-auto img-fluid"
            src={chosenImage}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploaderModal;
