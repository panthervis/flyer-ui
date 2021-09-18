import React from 'react'
import { useDropzone } from 'react-dropzone'
import UploadIcon from './uploadIcon'

export default function PosterDropzone({ imageId, label, onImageDrop }) {
  const [filename, setFilename] = React.useState()

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log('acceptedFiles', acceptedFiles)
      setFilename(acceptedFiles[0].name)

      if (onImageDrop) {
        onImageDrop(imageId, acceptedFiles[0])
      }
    },
    [imageId, onImageDrop]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop
  })

  return (
    <div className="flex flex-col flex-1 ml-7 mr-7" style={{ maxWidth: 200 }}>
      <div
        {...getRootProps()}
        className="px-8 py-8 text-center border-4 rounded-lg border-utorange text-utblue"
      >
        <input {...getInputProps()} />
        <UploadIcon />
      </div>

      {isDragActive ? (
        <p className="mt-4 italic">Drop the files here ...</p>
      ) : filename ? (
        <h5 className="mt-4 font-bold break-words">{filename}</h5>
      ) : (
        <h5 className="mt-4">{label}</h5>
      )}
    </div>
  )
}
