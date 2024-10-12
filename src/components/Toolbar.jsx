/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfRaw from './PdfRaw';

function Toolbar({ isExpanded, setExpansion, reloadNow, isSaved, curriculumData }) {

  const [isLoading, setIsLoading] = useState(false)
  const loadIconStyle = isLoading ? 'w-5 h-full animate-spin' : 'w-5 h-full'
  const loadLabel = isLoading ? "Loading..." : "Load"

  const handleExpandButton = () => {
    setExpansion()
  }

  const handleReload = async () => {
    setIsLoading(true)
    await reloadNow()
    isSaved()
    setIsLoading(false)
  }

  return (
    <>
      <div className=' bg-neutral-900 rounded-md h-10 p-2 mt-1 mr-1 text-white flex  justify-between '>

        <div className="flex">
          {/* Expand Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleExpandButton}>
            {isExpanded ? <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" /> : <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />}
          </svg>

          {/* Loading Icon */}
          <div className='flex bg-green-800 hover:bg-green-900 px-2 rounded cursor-pointer ml-3' onClick={handleReload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={loadIconStyle}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <div className=' font-semibold ml-2 '>{loadLabel}</div>
          </div>

          {/* font */}
          <div>
            <select className='bg-neutral-800 px-2 rounded font-semibold cursor-pointer ml-3' name="fonttype" id="fonttype">
              <option value="font1" defaultChecked>Nome Lungo</option>
              <option value="font2">font2</option>
              <option value="font3">font3</option>
              <option value="font4">font4</option>
            </select>
          </div>
        </div>

        {/* Download Icon */}
        <div className="flex gap-2 mr-2">

          <PDFDownloadLink document={<PdfRaw data={curriculumData} />} fileName="mycv.pdf">
            {({ loading }) => (loading ? 'loading...' :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-full cursor-pointer hover:text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            )}
          </PDFDownloadLink>



        </div>











      </div>

    </>
  )
}

export default Toolbar
