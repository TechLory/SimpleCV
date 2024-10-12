import { useState } from 'react'
import Toolbar from './Toolbar'
import PdfFrame from './PdfFrame'

import { dbGetCurriculum } from "../database/db";
import placeholderCurriculum from '../preloadedObjects/curriculum.json'

function Preview({filename, bigPreview, setExpansion, isSaved}) {
  
  const finalWidth = bigPreview ? "w-3/5" : "w-2/5"
  const [curriculumData, setCurriculumData] = useState(placeholderCurriculum)

  async function reloadNow(){
    // Fetch data
    const {data, error} = await dbGetCurriculum(filename)
    if(error != null) {
      console.log("Error loading from DB: " + error);
      return
    }
    // Set state
    setCurriculumData(data)
  }



  return (
    <>
      <div className={'h-full flex flex-col ' + finalWidth}>
        
        <Toolbar reloadNow={reloadNow} isExpanded={bigPreview} isSaved={isSaved} setExpansion={setExpansion} curriculumData={curriculumData}/>
        <PdfFrame data={curriculumData}/>
        



      </div>

    </>
  )
}

export default Preview
