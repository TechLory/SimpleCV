import { useEffect, useState } from 'react'

// Pages
import LandingPage from './pages/LandingPage'
import FilesPage from './pages/FilesPage'
import EditorPage from './pages/EditorPage'
import AboutPage from './pages/AboutPage'
import { dbNewCurriculum, dbGetCurriculum, dbCurriculumExists } from './database/db'



function App() {

  var isFirstVisitValue = localStorage.getItem("isFirstVisit")
  if (isFirstVisitValue == null) {
    localStorage.setItem("isFirstVisit", false)
    isFirstVisitValue = true
  } else {
    isFirstVisitValue = (localStorage.getItem("isFirstVisit") == "true") ? true : false 
  }


  const [isFirstVisit, setIsFirstVisit] = useState(isFirstVisitValue)
  const [fileOpened, setFileOpened] = useState(null)
  


  // Checks if a cv with name "filename" exists and sets it to open
  // If the file doesn't exist it creates a new one with name "filename" and sets it to open
  const openFile = async (filename) => {
    const exists = await dbCurriculumExists(filename)
    if (!exists) {
      const status = await dbNewCurriculum(filename)
      console.error("Error creating new cv in db: " + status);
    }
    setFileOpened(filename)
  }

  // sets fileOpened to null
  const closeFile = () => {
    setFileOpened(null)
  }

  // sets "isFirstVisit" to false
  const goFile = () => {
    setIsFirstVisit(false)
  }

  // sets "isFirstVisit" to true
  const goSplash = () => {
    setIsFirstVisit(true)
  }





  if (isFirstVisit) {
    return <LandingPage goFile={goFile}/>
  }
  
  document.body.style.overflow = "initial"
  
  
  if (fileOpened != null) {
    return <EditorPage filename={fileOpened} closeFile={closeFile} /> 
  }else {
    return <FilesPage openFile={openFile} goBack={goSplash} />
  }

  

}

export default App
