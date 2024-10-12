import { useState, useEffect } from 'react'
import { db, dbGetCurricula, dbNewCurriculum, dbPrint, dbDeleteCurriculum } from '../database/db';
import moment from "moment"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';

function FilesPage({ openFile, goBack }) {

  const [localList, setLocalList] = useState([])
  const [isListVoid, setIsListVoid] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isInputVoid, setIsInputVoid] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null)

  const [inputAlreadyExists, setInputAlreadyExists] = useState(false)


  const handleNewFile = async () => {
    const filename = (document.getElementById('filename').value).trim()
    if (filename == "") {
      setIsInputVoid(true)
      return
    }
    localList.forEach(item => {
      if (filename == item.name) {
        setInputAlreadyExists(true)
        return
      }
    })
    const status = await dbNewCurriculum(filename)
    if (status != null) {
      console.log("Error:: " + status);
      alert("Esiste già")
    }
    setIsModalOpen(false)
  }


  const handleDelete = (filename) => {
    setIsConfirmingDelete(filename)
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden"
  }

  const handleConfirmDelete = async (confirmed) => {
    if(confirmed) {
      const error = await dbDeleteCurriculum(isConfirmingDelete)
      if(error != undefined) {
        console.log("Error deleting " + isConfirmingDelete, " >> " + error);
      }
    }
    setIsConfirmingDelete(null)
    document.body.style.overflow = "initial"
  }





  const handleCancelNewFile = () => {
    // When you abort creation of new file
    setIsModalOpen(false)
    setIsInputVoid(false)
    setInputAlreadyExists(false)
    document.getElementById('filename').value = ""
  }

  const loadFromDB = async () => {
    // Fetch data
    const {data, error} = await dbGetCurricula()
    if(error != null) {
      console.log("Error loading from DB: " + error);
      return
    }
    // Set state
    setLocalList(data)
  }


  // Use Effects
  useEffect(() => {
    document.title = "SimpleCV"
    // On mount:
    loadFromDB()
    setIsListVoid(localList.length == 0 ? true : false)
  })

  




  if (isModalOpen) {
    return (
      <>
        {/* <Navbar filenameDisplayed={"SimpleCV"}/> */}
        <div className='bg-neutral-800 w-full h-[100vh] pt-40'>

          <div className=' relative bg-neutral-900 w-1/3 m-auto rounded-lg px-16 pb-7 pt-2 text-center'>
            <div className='absolute top-2 left-4 text-left text-neutral-600 font-medium text-xs hover:underline hover:text-neutral-4 cursor-pointer' onClick={handleCancelNewFile}>Cancel</div>
            <div className='text-white text-3xl text-center w-full py-3 mb-3 font-semibold'>New File</div>
            <div className='text-left text-neutral-500 font-medium text-xs mt-10 ml-1'>Choose a name (must be unique)</div>
            <input className='w-full bg-neutral-800 px-3 py-1 rounded-md mt-1 font-semibold text-neutral-300' type="text" name="filename" id="filename" placeholder='Name' autoFocus/>
            <div className='text-xl my-5 font-semibold py-3 rounded-lg text-white bg-neutral-800 hover:bg-green-900 cursor-pointer' onClick={handleNewFile}>Create</div>
          
            {isInputVoid && <div className='text-red-600 font-medium text-xs mt-10 ml-1'>A name is required!</div>}
            {inputAlreadyExists && <div className='text-red-600 font-medium text-xs mt-10 ml-1'>This name has already been used</div>}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        


        <Navbar filenameDisplayed={"SimpleCV"} goBack={goBack}/>
        
        <div className='absolute top-0 pt-10 w-full bg-neutral-800'>
          <div className='text-white text-5xl text-center w-full py-16 font-semibold'>
            My Files
          </div>
          <div className=' flex flex-col gap-1'>
            {isListVoid && <div className='text-center text-neutral-400 font-medium text- mt-10 ml-1'>No elements</div>}
            {
              localList.map((item, index) => (

                <div key={index} className='flex bg-green-900 w-[40%] m-auto rounded-lg  cursor-pointer'>
                  <div className=' bg-neutral-900 rounded-l-lg px-4 w-full pt-8 pb-3 hover:bg-black' onClick={() => openFile(item.name)}> 
                    <div className='text-neutral-300 font-semibold text-2xl mb-7'>{item.name}</div>
                    <div className='flex justify-between'>
                      <div className='text-neutral-600 font-medium text-xs'>
                        Edited {moment(item.lastedittime.slice(0, 19), "YYYY-MM-DDThh:mm:ss").fromNow()}
                      </div>
                      <div className='text-neutral-600 font-medium text-xs'>
                        {moment(item.createdtime.slice(0, 10), "YYYY-MM-DD").format('YYYY-MM-DD')}
                      </div>
                    </div>
                  </div>

                  <div className='bg-[#1f1f1f] hover:bg-red-800 text-red-800 hover:text-white rounded-r-lg px-2 py-3 content-center' onClick={() => handleDelete(item.name)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </div>
                </div>
              ))
            }
          </div>


          {isConfirmingDelete != null && 
            <div className='absolute top-28 left-[15%] w-[70%] bg-neutral-950  pb-20 rounded-xl cursor-default'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-yellow-500 m-auto my-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
              </svg>
              <div className='flex m-auto w-fit'>
                <div className='text-neutral-500 text-lg font-semibold pb-1 mr-2'>Are you sure you want to remove </div>
                <div className='text-white font-semibold text-lg pb-20'>{isConfirmingDelete}</div>
                <div className='text-neutral-500 text-lg font-semibold pb-1 ml-2'>?</div>
              </div>
              <div className='flex gap-4 m-auto w-fit'>
                <div className='bg-neutral-600 hover:bg-neutral-700 w-fit py-3 px-14 rounded font-semibold cursor-pointer' onClick={() => handleConfirmDelete(false)}>Cancel</div>
                <div className='bg-orange-600 hover:bg-orange-700 w-fit py-3 px-14 rounded font-semibold cursor-pointer' onClick={() => handleConfirmDelete(true)}>Delete</div>
              </div>
            </div>
          }

          
          <div className="bg-neutral-900 hover:bg-black cursor-pointer font-semibold rounded-lg px-7 w-fit py-3 mt-10 mb-20 m-auto" onClick={() => setIsModalOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-neutral-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>


          <div className='  pt-60'>
            <hr className='border-1 border-neutral-700'/>
          </div>
          <Footer></Footer>

          <div className='flex hidden'>
            <div className='p-3 bg-red-600 cursor-pointer w-fit' onClick={() => db.curricula.clear()}>CLEAR DB</div>
            <div className='p-3 bg-red-800 cursor-pointer w-fit' onClick={() => db.delete()}>DELETE ALL DB</div>
            <div className='p-3 bg-orange-600 cursor-pointer w-fit' onClick={dbPrint}>SHOW DB</div>
          </div>
        
        
        </div>
      </div>
    </>
  )

  return (
    <>


      ret
      <div className='font-4xl '>
        <div className='flex'>
          <div>File Name</div>
          <input type="text" id='filename' className=' bg-neutral-500' />
        </div>

        <div className='bg-red-600 p-3 w-fit cursor-pointer' onClick={handleCreate}>Create</div>
        
        

      </div>
    </>
  )
}

export default FilesPage
