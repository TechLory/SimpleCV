import { useState, useEffect } from "react"


function BasicInformation({save, dataObj, bigPreview}) {
  const labelStyle = "whitespace-nowrap py-1 my-1"
  const labelStyleCheckbox = "whitespace-nowrap py-1 my-1 flex"
  const inputStyleRaw = "bg-neutral-800 px-3 py-1 rounded-md mt-1 font-semibold text-neutral-300"
  const inputStyle = bigPreview ? (inputStyleRaw + " w-full") : (inputStyleRaw + " w-2/3")
  const [linkedinDisabled, setLinkedinDisabled] = useState("")
  const [websiteDisabled, setWebsiteDisabled] = useState("")
  
  const [localData, setLocalData] = useState({})

  // Send updated inputs to parent
  const handleInputChange = (e) => {
    const {name, type, value, checked} = e.target
    const inputValue = type == "checkbox" ? checked : value
    const newData = {...localData, [name]: inputValue}
    save("basicInformation", newData)
    setLocalData(newData)
  }

 
  // Load data in State
  useEffect(() => {
    setLocalData(dataObj)
  })


  useEffect(() => {
    const disabledSyle = " text-neutral-500 "
    setLinkedinDisabled(localData.hasLinkedin ? "" : disabledSyle)
    setWebsiteDisabled(localData.hasWebsite ? "" : disabledSyle)
  }, [localData])




  return (
    <>
    <div className="flex w-full">

      <div className="text-white font-semibold  mr-4">
        <div className={labelStyle}>First Name</div>
        <div className={labelStyle}>Last Name</div>
        <div className={labelStyle}>Email</div>
        <div className={labelStyle}>City</div>
        <div className={labelStyle}>Country</div>
        <div className={labelStyle}>Phone Number</div>
        <div className={labelStyleCheckbox}>
          <input className="mt-1 mr-3" type="checkbox" name="hasLinkedin" id="hasLinkedin" checked={localData.hasLinkedin} onChange={handleInputChange}/>
          <div className={linkedinDisabled}>LinkedIn</div>
        </div>
        <div className={labelStyleCheckbox}>
          <input className="mt-1 mr-3" type="checkbox" name="hasWebsite" id="hasWebsite" checked={localData.hasWebsite} onChange={handleInputChange}/>
          <div className={websiteDisabled}>Website</div>
        </div>
      </div>

      <div className="w-full">
        <input type="text" className={inputStyle} name="firstname" id="firstname" defaultValue={localData.firstname} onChange={handleInputChange}/>
        <input type="text" className={inputStyle} name="lastname" id="lastname" defaultValue={localData.lastname} onChange={handleInputChange}/>
        <input type="text" className={inputStyle} name="email" id="email" defaultValue={localData.email} onChange={handleInputChange}/>
        <input type="text" className={inputStyle} name="city" id="city" defaultValue={localData.city} onChange={handleInputChange}/>
        <input type="text" className={inputStyle} name="country" id="country" defaultValue={localData.country} onChange={handleInputChange}/>
        <input type="text" className={inputStyle} name="phonenumber" id="phonenumber" defaultValue={localData.phonenumber} onChange={handleInputChange}/>
        <div className={bigPreview ? "flex w-full" : "flex w-2/3"}>
          <div className="bg-neutral-800 px-3 py-1 rounded-l-lg mt-1 font-semibold text-neutral-400 mr-1">www.linkedin.com/in/</div>
          <input type="text" className={"w-full bg-neutral-800 px-3 py-1 rounded-r-lg mt-1 font-semibold text-neutral-300" + linkedinDisabled} disabled={!localData.hasLinkedin} name="linkedin" id="linkedin" defaultValue={localData.linkedin} onChange={handleInputChange}/>
        </div>
        <div className={bigPreview ? "flex w-full" : "flex w-2/3"}>
          <div className="bg-neutral-800 px-3 py-1 rounded-l-lg mt-1 font-semibold text-neutral-400 mr-1">www.</div>
          <input type="text" className={"w-full bg-neutral-800 px-3 py-1 rounded-r-lg mt-1 font-semibold text-neutral-300" + websiteDisabled} disabled={!localData.hasWebsite} name="website" id="website" defaultValue={localData.website} onChange={handleInputChange}/>
        </div>
      </div>
    </div>

    </>
  )
}

export default BasicInformation
