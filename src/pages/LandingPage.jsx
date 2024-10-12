import paper1 from "../assets/paperBackgrounds/paper1.jpg"
import paper2 from "../assets/paperBackgrounds/paper2.jpg"


function LandingPage({ goFile }) {

  document.documentElement.scrollTop = 0;
  document.body.style.overflow = "hidden"

  localStorage.setItem("isFirstVisit", false)



  return (
    <>
      <div className='h-[100vh] w-[100vw] bg-neutral-900 '>

{/* 
        <div className=' border-4 border-white absolute w-1/2 left-1/4 h-full top-[20%] shadow-xl shadow-white'></div>
        <div className='text-8xl font-bold w-full text-center pt-52 text-white'>Simple CV</div>

        <div className='text-center text-white w-fit px-8 py-1 mt-16 m-auto font-semibold cursor-pointer'>Start</div>
 */}

        {/* Background Image */}
        <div className=" w-full absolute top-40 z-0">
          <img src={paper2} className="w-[90%] lg:max-w-[1000px] m-auto shadow-xl  shadow-orange-200"/>
        </div>

        {/* Texts */}
        <div className="w-full absolute top-40 z-10">
          
          <div className="text-7xl text-neutral-900 mt-14 font-bold text-center">Simple CV</div>
        
          <div className="text-center text-white font-semibold cursor-pointer mt-16 bg-neutral-900 hover:bg-green-800 w-fit m-auto py-2 px-16 rounded" onClick={goFile}>
            Start
          </div>
        
          <div className="w-fit m-auto  mt-36 flex flex-col gap-1">
            
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <div className="text-xl text-neutral-800 font-semibold ml-2">Free and Open Source</div>
            </div>
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <div className="text-xl text-neutral-800 font-semibold ml-2">No data collection</div>
            </div>
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              <div className="text-xl text-neutral-800 font-semibold ml-2">No registration</div>
            </div>
          </div>
        
        </div>





      </div>
    </>
  )
}

export default LandingPage
