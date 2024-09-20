import React, { useState, useEffect } from "react";
import './ImageUploader.css';

const ImageUploader = ({setFile}) => {
    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);


    const selectFile = (event) => {
        const currentFile = event.target.files[0];
        const previewImage = URL.createObjectURL(event.target.files[0]);
        setCurrentFile(currentFile);
        setPreviewImage(previewImage);
    };

    useEffect(() => {
        setFile(currentFile);
    }, [currentFile]);

    const deleteFile = (event) => {
        setCurrentFile(undefined);
        setPreviewImage(undefined);
    };

    return (
        <div className="img-card">
            <div className="d-flex">
                <label htmlFor="uploadImage" className="btn-open-image">
                    <i className="bi bi-image"></i>
                    <input type="file" name="file" accept="image/*" id="uploadImage" 
                    onChange={selectFile} />
                </label>
                <p className="fw-bold fst-italic d-block mx-auto">{ currentFile != null ? currentFile.name : 'Nenhum arquivo escolhido'}</p>
                <button type="button" className="btn-close-image" onClick={deleteFile}>
                    <i className="bi bi-x-circle"></i>
                </button>
            </div>

            {previewImage && (
                <div>
                    <img id="preView" className="rounded shadow d-block mx-auto img-fluid"
                        src={previewImage} alt="..." />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;