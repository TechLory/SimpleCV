

function Section({title, isWelcome, onCloseWelcome, data}) {
  
  const sectionHighlight = "bg-amber-400 px-1 rounded-md font-semibold"
  const handleCloseWelcome = () => {
    onCloseWelcome();
  }



  if (isWelcome) {
    return (
      <>
        <div className='relative bg-amber-500 rounded-md p-4 pb-7 b-1 text-white'>
          <div className='absolute top-2 right-3 cursor-pointer' onClick={handleCloseWelcome}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          
          <div className='text-xl text-center font-semibold pb-7'>Welcome to Simple CV!</div>
          
          <div className="">
            <div>
              This minimal editor will allow you to build a clear and professional 
              curriculum vitae, according to the best practises requested 
              by the major companies all over the world.
            </div>
            <div>Remember, for a professional CV they suggest:</div>
            <ul className=" list-disc list-inside">
              <li>Don't put a picture. The recruiter will see you at the interview.</li>
              <li>If possible, in <span className={sectionHighlight}>Work Experience</span> section, put only the most valuable experiences for the role you want to apply for.</li>
              <li>In the description field you want to show your result e goal reached during that experience/project.</li>
              <li>Go straight to the point, and prefer bullet lists instead of long sentences.</li>
            </ul>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className='bg-neutral-900 rounded-lg p-4 pb-7 mb-1 text-white'>
          <div className='text-xl text-center font-semibold pb-7'>{title}</div>
          {data}
        </div>
      </>
    )
  }



}

export default Section
