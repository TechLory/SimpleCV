 
import {  PDFViewer } from '@react-pdf/renderer';
import PdfRaw from './PdfRaw';


// eslint-disable-next-line react/prop-types
function PdfFrame({ data }) {


  const MyDoc = <PdfRaw data={data} />

  return (
    <div>
      <PDFViewer className='h-full appearance-none' showToolbar={false}>
        {MyDoc}
      </PDFViewer>
    </div>

  )


}

export default PdfFrame