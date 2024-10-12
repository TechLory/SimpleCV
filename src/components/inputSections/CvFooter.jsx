import { useState, useEffect } from "react"
import Switch from "../Switch"


function CvFooter({save, dataObj, bigPreview}) {
  const labelStyle = "whitespace-nowrap py-1 my-1"

  const w = bigPreview ? "w-full" : "w-2/3"


  const [localData, setLocalData] = useState({})



  const handleInputChange = (e) => {
    const {name, type, value, checked} = e.target
    const inputValue = type == "checkbox" ? checked : value
    const newData = {...localData, [name]: inputValue}
    save("footerInfo", newData)
    setLocalData(newData)
  }
 
  // Load data in State
  useEffect(() => {
    setLocalData(dataObj)
  })




  return (
    <>
    <div className="flex w-full">

      <div className="text-white font-semibold  mr-4">
        <div className={labelStyle}>Show page counter</div>
        <div className={labelStyle}>Show data agreement disclaimer</div>
        <div className={labelStyle}>Data agreement disclaimer</div>
      </div>


      <div className="w-full">
        <div className="pl-2  py-1 my-1">
          <input type="checkbox" name="pageCounterVisible" id="pageCounterVisible" checked={localData.pageCounterVisible} onChange={handleInputChange}/>
        </div>
        <div className="pl-2  py-1 my-1">
          <input type="checkbox" name="disclaimerVisible" id="disclaimerVisible" checked={localData.disclaimerVisible} onChange={handleInputChange}/>
        </div>
        <textarea className={w + " h-32 bg-neutral-800 px-3 py-1 rounded-md mt-1 font-semibold text-sm text-neutral-400"} name="disclaimer" id="disclaimer" value={localData.disclaimer} onChange={handleInputChange}></textarea>
      </div>
    </div>

    </>
  )
}

export default CvFooter
