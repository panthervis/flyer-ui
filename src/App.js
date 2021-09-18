import React from 'react'

import { SubmitButton } from './components/styled'
import PosterDropzone from './components/posterDropzone'
import DownloadIcon from './components/downloadIcon'
import Loader from './components/loader'
import {
  generateFlyer,
  useQuery,
  downloadImageFile,
  defaultImageBlob
} from './utils'
import logo from './logo.png'
import './App.css'

const testEventId = 4540

function App() {
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [files, setFiles] = React.useState([null, null, null])
  const query = useQuery()

  const handleDownloadClick = async () => {
    if (isGenerating) {
      return
    }

    // Prepare form data
    const formData = new FormData()
    const eventId = query.get('eventId') || testEventId

    for (const file of files) {
      formData.append(
        'images[]',
        file ? file : defaultImageBlob,
        file ? file.name : ''
      )
    }

    // Call Flyer API
    setIsGenerating(true)
    await generateFlyer(eventId, formData)
      .then(({ data }) => {
        const base64 = data?.data?.base64
        if (!base64) throw new Error('base64 is null')

        downloadImageFile('data:image/png;base64,' + base64)
      })
      .catch((err) => {
        console.error(err)
        alert('Something went wrong, please try again')
      })
      .finally(() => {
        setIsGenerating(false)
      })
  }

  const handleImageDrop = React.useCallback(
    (imageId, file) => {
      const newFiles = [...files]
      newFiles[imageId] = file

      setFiles(newFiles)
    },
    [files]
  )

  return (
    <div className="App">
      <main className="flex flex-col items-center justify-center mt-36">
        <img src={logo} alt="UTProducts" className="mb-12" width="128" />
        <section className="flex">
          <PosterDropzone
            imageId={0}
            label="Individual Poster"
            onImageDrop={handleImageDrop}
          />
          <PosterDropzone
            imageId={1}
            label="Photo Day Poster"
            onImageDrop={handleImageDrop}
          />
          <PosterDropzone
            imageId={2}
            label="Team Poster (if necessary)"
            onImageDrop={handleImageDrop}
          />
        </section>
        <div className="flex mt-8">
          <SubmitButton type="submit" onClick={handleDownloadClick}>
            DOWNLOAD&nbsp;{' '}
            {isGenerating ? <Loader size={18} /> : <DownloadIcon />}
          </SubmitButton>
        </div>
      </main>
    </div>
  )
}

export default App
