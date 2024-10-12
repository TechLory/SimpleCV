// import { useState } from 'react'

function Navbar({filenameDisplayed, goBack}) {
  // const [pendingChanges, setPendingChanges] = useState(true)

  // qui listener su "Ctrl+S" per salvare su DB e aggiornare pendingChanges.
  // se l'aggiornamento è fatto nel parent può arrivare direttamente pendingChanges (senza avere lo useState!)
  // const showPendingChanges = pendingChanges

  const handleGoBack = () => {
    goBack()
  }

  const handleShare = () => {

  }

  const handleInfo = () => {

  }


  return (
    <>
      <div className='bg-neutral-900 h-10 content-center grid grid-cols-4 z-10 absolute w-full'>
        
        <div className='text-white flex'>
          <div className='ml-5' onClick={handleGoBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </div>
        </div>
        
        <div className='text-white flex justify-center col-span-2' >
          <div className='font-semibold'>{filenameDisplayed}</div>
        </div>

        <div className='text-white  flex justify-end'>
          <div className='mr-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
            </svg>

          </div>
          <div className='mr-5'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
          </div>
        </div>
      
        
      </div>
    </>
  )
}

export default Navbar
