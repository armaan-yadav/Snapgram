import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
type FileUploaderType = {
  fieldChange: (file: File[]) => void;
  mediaUrl: string;
};
const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderType) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const onDrop = useCallback(
    (acceptedFile: FileWithPath[]) => {
      setFile(acceptedFile);
      fieldChange(acceptedFile);
      setFileUrl(URL.createObjectURL(acceptedFile[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".svg", ".jpeg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="w-full  bg-dark-3 flex rounded-xl cursor-pointer p-1"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="w-full">
        {fileUrl ? (
          <>
            <div className="flex flex-1 w-full justify-center p-5 lg:p-10">
              <img src={fileUrl} alt="image" className="file_uploader-img" />
            </div>
            <p className="file_uploader-label">
              Click or drag image to replace
            </p>
          </>
        ) : (
          <div className="file_uploader-box flex items-center justify-center w-full">
            <img src="/assets/icons/file-upload.svg" alt="file-upload-icon" />
            <h3 className="base-medium text-light-2 mb-2 mt-6">
              Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-6">SVG,PNG,JPG</p>
            <Button className="shad-button_dark_4">Select from Device</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
