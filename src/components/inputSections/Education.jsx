import { useState, useEffect } from "react"


function Education({save, dataObj, bigPreview}) {

  const labelStyle = "whitespace-nowrap py-1 my-1"
  const inputStyle = "w-full bg-neutral-900 px-3 py-1 rounded-md mt-1 font-semibold text-neutral-300"
  const selectStyle = "w-1/3 bg-neutral-900 px-3 py-1 rounded-md mt-1 font-semibold text-neutral-300"
  const selectDisabledStyle = "w-1/3 bg-neutral-900 px-3 py-1 rounded-md mt-1 font-semibold text-neutral-500"
  const textareaStyle = "w-full h-20 bg-neutral-900 px-3 py-1 rounded-md mt-1 font-semibold text-neutral-300"


  const [localData, setLocalData] = useState([])
  const [x, setX] = useState(true)

  const handleNewQualification = () => {
    const newQualification = {
      id: null,
      qualification: "New Item",
      organization: "New Item",
      startmonth: "Jan",
      startyear: "1970",
      endmonth: "Jan",
      endyear: "1970",
      present: false,
      description : "New Description"
    }
    const newData = localData
    newData.push(newQualification)
    save("education", newData)

  }

  const handleInputChange = (e, id) => {
    const {name, value, type, checked} = e.target
    const newData = localData
    const inputValue = (type == "checkbox") ? checked : value
    newData[id][name] = inputValue
    save("education", newData)
    setLocalData(newData)
  }

  const handleDelete = (id) => {
    const newData = localData
    newData.splice(id, 1)
    save("education", newData)
    setLocalData(newData)
  }

  // Load data in State
  useEffect(() => {
    setLocalData(dataObj)
  })

  return (
    <>
      <div className="">
        {
          localData.map((item, index) => (
            <div key={index} className="flex relative">
              <div className=" absolute bottom-2 left-4 text-neutral-700 font-mono font-semibold text-sm select-none">{index+1}</div>
              <div className="bg-neutral-800 rounded-l-lg px-4 w-full pt-8 pb-3 mt-1 ">
                <div className="flex">
                  <div className="text-white font-semibold  mr-4">

                    <div className={labelStyle}>Qualification</div>
                    <div className={labelStyle}>Organization</div>
                    <div className={labelStyle}>Start Date</div>
                    <div className={labelStyle}>End Date</div>
                    <div className={labelStyle}>Description</div>
                  </div>
                  <div className="w-full">
                    <input type="text" className={inputStyle} name="qualification" id="qualification" value={item.qualification} onChange={(e) => handleInputChange(e, index)}/>
                    <input type="text" className={inputStyle} name="organization" id="organization" value={item.organization} onChange={(e) => handleInputChange(e, index)}/>
                    <div className="flex gap-1">
                      <select className={selectStyle} name="startmonth" id="startmonth" value={item.startmonth} onChange={(e) => handleInputChange(e, index)}>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="Aug">Aug</option>
                        <option value="Sept">Sept</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select>
                      <input type="text" className={selectStyle} name="startyear" id="startyear" value={item.startyear} onChange={(e) => handleInputChange(e, index)}/>
                    </div>
                    <div className="flex gap-1">
                      <select className={item.present ? selectDisabledStyle : selectStyle} disabled={item.present} name="endmonth" id="endmonth" value={item.endmonth} onChange={(e) => handleInputChange(e, index)}>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="Aug">Aug</option>
                        <option value="Sept">Sept</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                      </select>
                      <input type="text" className={item.present ? selectDisabledStyle : selectStyle} disabled={item.present} name="endyear" id="endyear" value={item.endyear} onChange={(e) => handleInputChange(e, index)}/>
                      <div className={"flex gap-2 px-3 py-1 mt-1 font-semibold"} >
                        <input type="checkbox" name="present" id="present" checked={item.present} onChange={(e) => handleInputChange(e, index)}/>
                        <label htmlFor="present" className="cursor-pointer">Present</label>
                      </div>
                    </div>
                    <textarea name="description" id="description" className={textareaStyle} value={item.description} onChange={(e) => handleInputChange(e, index)}></textarea>
                  </div>
                </div>
              </div>

              <div className='bg-[#1f1f1f] hover:bg-red-800 text-red-800 hover:text-white rounded-r-lg px-2 py-3 mt-1 cursor-pointer content-center' onClick={() => handleDelete(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div>

            </div>
          ))
        }









        <div className="bg-neutral-800 hover:bg-[#1f1f1f] cursor-pointer font-semibold rounded-lg px-7 w-fit py-3 mt-3 m-auto" onClick={handleNewQualification}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-neutral-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </div>
    </>
  )

}

export default Education
