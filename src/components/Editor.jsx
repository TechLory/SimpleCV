import { useState, useEffect } from 'react'
import { db, dbGetCurriculum, dbUpdateCurriculum, dbPrint } from '../database/db';

import Section from './Section'
import deafultSections from "../preloadedObjects/sections.json";
import placeholderCurriculum from "../preloadedObjects/curriculum.json";

import BasicInformation from './inputSections/BasicInformation';
import Education from './inputSections/Education';
import WorkExpercience from './inputSections/WorkExpercience';
import SkillsAndLanguages from './inputSections/SkillsAndLanguages';
import PersonalProjectsAndInterests from './inputSections/PersonalProjectsAndInterests';
import CvFooter from './inputSections/CvFooter';
import Footer from './Footer';


function Editor({filename, bigPreview, isUnsaved}) {

  const finalWidth = bigPreview ? "w-2/5" : "w-3/5" 
  const [isWelcome, setIsWelcome] = useState(true)
  const [sections] = useState(deafultSections)
  const [curriculumData, setCurriculumData] = useState(placeholderCurriculum)


  // Functions
  const loadFromDB = async () => {
    // Fetch data
    const {data, error} = await dbGetCurriculum(filename)
    if(error != null) {
      console.log("Error loading from DB: " + error);
      return
    }
    // Set state
    setCurriculumData(data)
  }

  const handleSectionChange = (sectionChanged, newData) => {
    isUnsaved()
    setCurriculumData({
      ...curriculumData,
      [sectionChanged]: newData
    })
  }

  const handleCloseWelcomeSection = () => {
    setIsWelcome(false) 
  }
  






  // Use Effects
  useEffect(() => {
    // On mount:
    loadFromDB()
  }, [])

  useEffect(() => {
    // Save changes in database:
    const wasGood = dbUpdateCurriculum(filename, curriculumData)
    // bool
    if (!wasGood) {
      console.log("Error saving changes: ");
    }
  }, [curriculumData])
  














  return (
    <>
      <div className={'m-1 overflow-y-auto ' + finalWidth}>

        {/* TODO: DEBUG BUTTON */}
        {/* <div className='flex'>
          <div className='p-3 bg-red-600 cursor-pointer w-fit' onClick={() => db.curricula.clear()}>CLEAR DB</div>
          <div className='p-3 bg-red-800 cursor-pointer w-fit' onClick={() => db.delete()}>DELETE ALL DB</div>
          <div className='p-3 bg-orange-600 cursor-pointer w-fit' onClick={dbPrint}>SHOW DB</div>
        </div> */}
        

        {/* Welcome Section */}
        {isWelcome && <Section isWelcome={isWelcome} onCloseWelcome={handleCloseWelcomeSection} />}



        {/* Sections */}
        {
          sections.map((section) => {
            if (!section.isActive) {
              return
            }
            switch (section.id) {
              case 0: return <Section key={section.id} title={section.title} data={<BasicInformation save={handleSectionChange} dataObj={curriculumData.basicInformation} bigPreview={bigPreview}/>} />
              case 1: return <Section key={section.id} title={section.title} data={<Education save={handleSectionChange} dataObj={curriculumData.education} bigPreview={bigPreview}/>} />
              case 2: return <Section key={section.id} title={section.title} data={<WorkExpercience save={handleSectionChange} dataObj={curriculumData.workExperience} bigPreview={bigPreview}/>} />
              case 3: return <Section key={section.id} title={section.title} data={<SkillsAndLanguages save={handleSectionChange} dataSkills={curriculumData.skills} dataLanguages={curriculumData.languages} bigPreview={bigPreview}/>} />
              case 4: return <Section key={section.id} title={section.title} data={<PersonalProjectsAndInterests save={handleSectionChange} dataObj={curriculumData.personalProjectsAndInterests} bigPreview={bigPreview}/>} />
              case 5: return <Section key={section.id} title={section.title} data={<CvFooter save={handleSectionChange} dataObj={curriculumData.footerInfo} bigPreview={bigPreview}/>} />
                
              default: return <Section key={section.id} title={section.title} data={"ERROR 404"} />
            }
          })
        }

        {/* FOOTER */}
        <Footer/>



      </div>
    </>
  )
}

export default Editor
