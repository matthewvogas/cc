import { ptMono } from '@/app/fonts';
import { CampaignRes } from '@/types/campaign/campaignRes';
import React, { useState, useRef } from 'react';

type Props = {
  campaignFallback: CampaignRes
}

const ImageUploader = ({campaignFallback} : Props) => {

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const dropAreaRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const handleUploadButtonClick = () => {

    // subir al server de la campaña campaignFallback

    setSelectedImages([]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsHovered(false);
    const files = event.dataTransfer.files;
    handleImageChange(files);
  };

  return (
    <div
      className="flex flex-col gap-4 mx-12 items-end w-full"
      ref={dropAreaRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={`border border-[#7F7F7F] p-6 w-full rounded-lg ${isHovered ? 'bg-gray-50' : ''}`}>
        <div className="flex justify-center mb-12 mt-12">
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .webp, .svg, .heif, .heic"
            className="hidden"
            onChange={(e) => handleImageChange(e.target.files)}
            id="imageInput"
            multiple
          />
          <label
            htmlFor="imageInput"
            className={`px-8 py-3 cursor-pointer bg-[#F4F2EE] text-black rounded-full ${ptMono.className}`}
          >
            {!isHovered ? 'tap, or drag screenshots here' : 'drop the images'}

          </label>
        </div>
        {selectedImages.length > 0 ? (
          <div className={`flex justify-center items-center`}>
            <div className="text-center">
              <p className={`${ptMono.className} mb-2`}>
                {selectedImages.length} items uploaded
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <button
        onClick={handleUploadButtonClick}
        className={`px-8 py-3 cursor-pointer bg-[#F4F2EE] text-black rounded-full ${ptMono.className}`}
      >
        add
      </button>
    </div>
  );
};

export default ImageUploader;