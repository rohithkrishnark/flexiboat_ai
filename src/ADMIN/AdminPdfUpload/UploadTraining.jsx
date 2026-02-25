import React, { useCallback, useRef, useState } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider
} from '@mui/joy'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DeleteIcon from '@mui/icons-material/Delete'
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfTwoTone'
import CloudDoneTwoToneIcon from '@mui/icons-material/CloudDoneTwoTone'
import { useFetchExistingFile } from '../CommonCode/useQuery'
import { successNotify, warningNotify } from '../../constant/Constant'
import axiosLogin from '../../Axios/axios'

const UploadTraining = () => {
  const fileInputRef = useRef(null)

  const { data: existingFiles = [], refetch: FetchExistingFiles } = useFetchExistingFile()

  // const [existingFiles, setExistingFiles] = useState(fetchpdf)

  const [newFiles, setNewFiles] = useState([])

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setNewFiles((prev) => [...prev, ...files])
  }
  const deleteNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index))
  }


  // Handle pdf Upload for Training Data
  const handleFileUpload = useCallback(async () => {
    if (newFiles?.length === 0) return warningNotify("Please Select File Before Uploading")
    try {
      const formData = new FormData()
      newFiles?.forEach((file) => {
        formData.append("files", file) // must match multer field name
      })
      const response = await axiosLogin.post("/training/upload", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { success, message } = response.data;
      if (success === 1) {
        // clear preview files
        setNewFiles([])
        successNotify(message)
        FetchExistingFiles()
      }

    } catch (error) {
      warningNotify("Error in Uploading Pdf")
      console.error("Upload failed:", error)
    }
  }, [newFiles, FetchExistingFiles]);

// Handle File Delete
const HanldefileDelete = async (file) => {
  if(!file) return warningNotify("File name is missing Here.")
  try {
    const response = await axiosLogin.delete(
      '/training/delete',
      {
        data: {
          filename: file.filename, // VERY IMPORTANT
        },
      }
    )

    if (response.data.success === 1) {
      // remove from UI after successful delete
      successNotify("Deleted Succesfully")
      FetchExistingFiles()
    }
  } catch (error) {
    warningNotify("Errorin Deleting the File. Please Try Again Later!")
    console.error('Delete failed', error)
  }
}

  return (
    <Box sx={{ width: '100%', p: 3 }}>

      {/* STICKY UPLOAD CARD */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          border: '2px dashed #c7d2fe',
          borderRadius: 12,
          p: 1.5,
          textAlign: 'center',
          bgcolor: '#f9fafb',
          boxShadow: 'lg',
          mb: 2
        }}
      >
        <UploadFileIcon sx={{ fontSize: 30, color: '#4f46e5' }} />
        <Typography sx={{ mt: 1, fontSize: 14, fontWeight: 800 }}>
          Upload Training PDFs
        </Typography>
        <Typography sx={{ fontSize: 10, fontWeight: 600, color: 'neutral.500' }}>
          Only PDF files are allowed
        </Typography>

        <Button
          variant="outlined"
          startDecorator={<PictureAsPdfTwoToneIcon />}
          sx={{ mt: 1 }}
          onClick={() => fileInputRef.current.click()}
        >
          Select PDF
        </Button>

        <input
          type="file"
          accept="application/pdf"
          multiple
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Box>

      {/* UPLOADED FILES HEADER */}
      <Typography level="h5" sx={{ fontSize: 16, fontWeight: 600, mb: 1 }}>
        <CloudDoneTwoToneIcon sx={{ fontSize: 18, mr: 1 }} />
        Uploaded Files
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/*  TWO COLUMN LAYOUT */}
      <Box sx={{ display: 'flex', gap: 2 }}>

        {/* LEFT — EXISTING FILES (OWN SCROLL) */}
        <Box
          sx={{
            flex: 1,
            height: 300,
            overflowY: 'auto',
            boxShadow: 'lg',
            borderRadius: 10,
            bgcolor: '#fff',
            // p:1,
            

            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {/* sticky title */}
          <Box sx={{ position: 'sticky', top: 0, bgcolor: '#fff', zIndex: 5, p: 2,boxShadow:'lg', }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              Existing Files ({
                existingFiles && existingFiles?.length
              })
            </Typography>
            {/* <Divider /> */}
          </Box>

          {existingFiles && existingFiles?.map((file) => (
            <Box
              key={file.id}
              sx={{
                p: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1,
                mx: 1,
                borderRadius: 8,
                boxShadow: 'sm'
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <PictureAsPdfIcon sx={{ color: 'red' }} />
                <Typography sx={{ fontSize: 13 }}>{file.name}</Typography>
              </Box>
              <IconButton onClick={() => HanldefileDelete(file)} color="danger" size="sm">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
          {existingFiles?.length === 0 && (
            <Typography sx={{ fontSize: 12, color: 'neutral.500', p: 1 }}>
              No Training File uploads
            </Typography>
          )}
        </Box>

        {/* RIGHT — NEW UPLOADS (OWN SCROLL + UPLOAD BTN) */}
        {
          newFiles?.length > 0 &&
       
        <Box
          sx={{
            flex: 1,
            height: 300,
            overflowY: 'auto',
            boxShadow: 'lg',
            borderRadius: 10,
            bgcolor: '#fefefe',

            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          {/* sticky title + upload */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 5,
              bgcolor: '#ffffff',
              p: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 1,
              boxShadow: 'lg'
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
              New Uploads
            </Typography>

            <Button
              size="sm"
              variant="outlined"
              startDecorator={<UploadFileIcon sx={{ fontSize: 15 }} />}
              onClick={handleFileUpload}
              sx={{ fontSize: 12 }}
            >
              Upload
            </Button>
          </Box>

          {newFiles?.map((file, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                mx: 1,
                mb: 1,
                borderRadius: 8,
                boxShadow: 'sm',
                // bgcolor: '#fff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Box sx={{ display: 'flex', gap: 1 }}>
                <PictureAsPdfIcon sx={{ color: 'red' }} />
                <Typography sx={{ fontSize: 12 }}>{file.name}</Typography>
              </Box>
              <IconButton
                color="danger"
                size="sm"
                onClick={() => deleteNewFile(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          {newFiles?.length === 0 && (
            <Typography sx={{ fontSize: 12, color: 'neutral.500', p: 1 }}>
              No new uploads
            </Typography>
          )}
        </Box>
 }
      </Box>
    </Box>
  )
}

export default UploadTraining