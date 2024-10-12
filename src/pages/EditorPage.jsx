import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Editor from '../components/Editor'
import Preview from '../components/Preview'


function EditorPage({filename, closeFile}) {

  const [bigPreview, setBigPreview] = useState(false)
  const [filenameDisplayed, setFilenameDisplayed] = useState(filename)
  
  // Functions
  const changeWidth = () => {
    setBigPreview(!bigPreview)
  }

  const isUnsaved = () => {
    // setFilenameDisplayed("*"+filename)
  }

  const isSaved = () => {
    // setFilenameDisplayed(filename)
  }
  
  const handleCloseFile = () => {
    closeFile()
  }




  // Use Effects
  useEffect(() => {
    document.title = filenameDisplayed
  }, [filenameDisplayed])




  
  return (
    <>
      <div className=' bg-neutral-800 h-[100vh] w-full'>
        
        <Navbar filenameDisplayed={filenameDisplayed} goBack={handleCloseFile}/>

        <div className='absolute top-0 pt-10 z-0 flex w-full h-full'>
          <Editor filename={filename} bigPreview={bigPreview} isUnsaved={isUnsaved}/>
          <Preview filename={filename} bigPreview={bigPreview} isSaved={isSaved} setExpansion={changeWidth}/>
        </div>

      </div>
    </>
  )
}

export default EditorPage
