import { useState, useEffect } from "react"


function PersonalProjectsAndInterests({save, dataObj, bigPreview}) {

  const [localData, setLocalData] = useState([])

  const handleNewItem = () => {
    const newItem = {
      id: null,
      description : "Job description"
    }
    const newData = localData
    newData.push(newItem)
    save("personalProjectsAndInterests", newData)

  }

  const handleSwapPosition = (id, directionUp) => {
    const changedData = []
    mainIf: if(directionUp) {
      // Up
      if (id <= 0) { break mainIf }
      for (let i = 0; i < id-1; i++) { changedData.push(localData[i]) }
      changedData.push(localData[id])
      changedData.push(localData[id-1])
      for (let i = id+1; i < localData.length; i++) { changedData.push(localData[i]) }
    } else {
      // Down
      if (id >= localData.length-1) { break mainIf }
      for (let i = 0; i < id; i++) { changedData.push(localData[i]) }
      changedData.push(localData[id+1])
      changedData.push(localData[id])
      for (let i = id+2; i < localData.length; i++) { changedData.push(localData[i]) }
    }
    if(changedData.length != 0) {
      save("personalProjectsAndInterests", changedData)
      setLocalData(changedData)
    }
  }

  const handleInputChange = (e, id) => {
    const {name, value} = e.target
    const newData = localData
    newData[id][name] = value
    save("personalProjectsAndInterests", newData)
    setLocalData(newData)
  }

  const handleDelete = (id) => {
    const newData = localData
    newData.splice(id, 1)
    save("personalProjectsAndInterests", newData)
    setLocalData(newData)
  }





  // Load data in State
  useEffect(() => {
    setLocalData(dataObj)
  })

  return (
    <>
      <div>
        {
          localData.map((item, index) => (
            <div key={index} className="flex  mb-1">
              <div>
                <div className="bg-[#1f1f1f] px-2 hover:bg-yellow-600 text-yellow-600 hover:text-neutral-800 cursor-pointer rounded-tl-lg" onClick={() => handleSwapPosition(index, true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                  </svg>
                </div>
                <div className="bg-[#1f1f1f] px-2 hover:bg-yellow-600 text-yellow-600 hover:text-neutral-800 cursor-pointer rounded-bl-lg" onClick={() => handleSwapPosition(index, false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>


              <input name="description" id="description" type="text" className="bg-neutral-800 px-2 w-full py-1 text-neutral-300 font-semibold" value={item.description} onChange={(e) => handleInputChange(e, index)}/>
              
              
              <div className='bg-[#1f1f1f] hover:bg-red-800 text-red-800 hover:text-white rounded-r-md px-2 py-1 cursor-pointer content-center' onClick={() => handleDelete(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>
            </div>
          ))
        }


        <div className="bg-neutral-800 hover:bg-[#1f1f1f] cursor-pointer font-semibold rounded-lg px-6 w-fit py-1 mt-3 m-auto" onClick={() => handleNewItem()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-neutral-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </>
  )

}

export default PersonalProjectsAndInterests
