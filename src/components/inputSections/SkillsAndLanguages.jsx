import { useState, useEffect } from "react"


function SkillsAndLanguages({save, dataSkills, dataLanguages, bigPreview}) {


  const [localSkills, setLocalSkills] = useState([])
  const [localLanguages, setLocalLanguages] = useState([])

  const handleNewItem = (category) => {
    const newData = (category == "skills") ? localSkills : localLanguages
    var newItem = {}
    if (category == "skills") {
      newItem = {
        id: null,
        description : "Skill..."
      }
    } else {
      newItem = {
        id: null,
        description : "Language",
        level: "Native",
        certification: false
      }
    }
    newData.push(newItem)
    save(category, newData)
  }

  const handleSwapPosition = (id, category, directionUp) => {
    const newData = (category == "skills") ? localSkills : localLanguages
    const changedData = []
    mainIf: if(directionUp) {
      // Up
      if (id <= 0) { break mainIf }
      for (let i = 0; i < id-1; i++) { changedData.push(newData[i]) }
      changedData.push(newData[id])
      changedData.push(newData[id-1])
      for (let i = id+1; i < newData.length; i++) { changedData.push(newData[i]) }
    } else {
      // Down
      if (id >= newData.length-1) { break mainIf }
      for (let i = 0; i < id; i++) { changedData.push(newData[i]) }
      changedData.push(newData[id+1])
      changedData.push(newData[id])
      for (let i = id+2; i < newData.length; i++) { changedData.push(newData[i]) }
    }
    if(changedData.length != 0) {
      save(category, changedData)
      const setLocal = (category == "skills") ? setLocalSkills : setLocalLanguages
      setLocal(changedData)
    }
  }

  const handleInputChange = (e, id, category) => {
    const {name, value} = e.target
    const newData = (category == "skills") ? localSkills : localLanguages
    newData[id][name] = value
    save(category, newData)
    const setLocal = (category == "skills") ? setLocalSkills : setLocalLanguages
    setLocal(newData)
  }

  const handleDelete = (id, category) => {
    const newData = (category == "skills") ? localSkills : localLanguages
    newData.splice(id, 1)
    save(category, newData)
    const setLocal = (category == "skills") ? setLocalSkills : setLocalLanguages
    setLocal(newData)
  }





  // Load data in State
  useEffect(() => {
    setLocalSkills(dataSkills)
    setLocalLanguages(dataLanguages)
  })

  return (
    <>
      <div>
        {/* SECTION ONE - SKILLS */}
        <div className="pl-10 text-neutral-600 font-semibold mb-2">Skill</div>
        {
          localSkills.map((item, index) => (
            <div key={index} className="flex  mb-1">
              <div>
                <div className="bg-[#1f1f1f] px-2 hover:bg-yellow-600 text-yellow-600 hover:text-neutral-800 cursor-pointer rounded-tl-lg" onClick={() => handleSwapPosition(index, "skills", true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </div>
                <div className="bg-[#1f1f1f] px-2 hover:bg-yellow-600 text-yellow-600 hover:text-neutral-800 cursor-pointer rounded-bl-lg" onClick={() => handleSwapPosition(index, "skills", false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              <input name="description" id="description" type="text" className="bg-neutral-800 px-2 w-full py-1 text-neutral-300 font-semibold" value={item.description} onChange={(e) => handleInputChange(e, index, "skills")}/>
              <div className='bg-[#1f1f1f] hover:bg-red-800 text-red-800 hover:text-white rounded-r-md px-2 py-1 cursor-pointer content-center' onClick={() => handleDelete(index,"skills")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          ))
        }
        <div className="bg-neutral-800 hover:bg-[#1f1f1f] cursor-pointer font-semibold rounded-lg px-6 w-fit py-1 mt-3 m-auto" onClick={() => handleNewItem("skills")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-neutral-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>






        {/* SECTION TWO - LANGUAGES */}
        <div className="w-full pl-10 pr-9 mt-7">
          <div className="flex w-full ">
            <div className="text-neutral-600 w-1/3 font-semibold">Language</div>
            <div className="text-neutral-600 w-2/3 pl-1 font-semibold">Level</div>
          </div>
        </div>
        {
          localLanguages.map((item, index) => (
            <div key={index} className="flex my-1">

              <div>
                <div className="bg-[#1f1f1f] px-2 hover:bg-yellow-600 text-yellow-600 hover:text-neutral-800 cursor-pointer rounded-tl-lg" onClick={() => handleSwapPosition(index, "languages", true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </div>
                <div className="bg-[#1f1f1f] px-2 hover:bg-yellow-600 text-yellow-600 hover:text-neutral-800 cursor-pointer rounded-bl-lg" onClick={() => handleSwapPosition(index, "languages", false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
              <div className="flex w-full">
                <input name="language" id="language" type="text" className="bg-neutral-800 mr-1 px-2 w-1/3 text-neutral-300 font-semibold" value={item.language} onChange={(e) => handleInputChange(e, index, "languages")}/>
                <input name="level" id="level" type="text" className="bg-neutral-800 px-2 w-2/3  text-neutral-300 font-semibold" value={item.level} onChange={(e) => handleInputChange(e, index, "languages")}/>
              </div>
              <div className='bg-[#1f1f1f] hover:bg-red-800 text-red-800 hover:text-white rounded-r-md px-2 py-1 cursor-pointer content-center' onClick={() => handleDelete(index, "languages")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>

            </div>

          ))
        }
        <div className="bg-neutral-800 hover:bg-[#1f1f1f] cursor-pointer font-semibold rounded-lg px-6 w-fit py-1 mt-3 m-auto" onClick={() => handleNewItem("languages")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-neutral-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>











      </div>
    </>
  )

}

export default SkillsAndLanguages
