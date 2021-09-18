import axios from 'axios'
import { useLocation } from 'react-router-dom'

const config = {
  headers: {
    'content-type': 'multipart/form-data',
    accept: 'application/json'
  }
}

const API_BASE_URL =
  process.env.REACT_APP_POSTER_API_BASE_URL || 'http://localhost:8000/api'

const saveFlyer = (canvas) => {
  const link = document.createElement('a')
  link.download = 'flyer.png'

  canvas.toBlob(function (blob) {
    link.href = URL.createObjectURL(blob)
    link.click()
  })
}

export const defaultImageBlob = new Blob(
  [
    'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='
  ],
  { type: 'image/png' }
)

export const generateFlyer = (eventId, formData) =>
  axios.post(`${API_BASE_URL}/product/flyer/${eventId}`, formData, config)
export const getFlyerStats = () =>
  axios.get(`${API_BASE_URL}/product/flyer/stats`)

export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const downloadImageFile = (base64) => {
  const pageImage = new Image()
  pageImage.src = base64
  pageImage.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = pageImage.naturalWidth
    canvas.height = pageImage.naturalHeight

    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(pageImage, 0, 0)

    saveFlyer(canvas)
  }
}
