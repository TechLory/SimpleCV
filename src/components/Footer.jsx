import moment from "moment"


function Footer() {

  const year = moment().format('YYYY')
  const linkStyle = "w-1/3 text-center font-semibold hover:underline"

  return (
    <>
      <div className="text-neutral-500 font-medium px-3 pb-2 w-full ">
        

        
        

        
        <div className="flex w-full mt-5 mb-8">
          <a className={linkStyle} target="blank" href="https://github.com/TechLory">Developer Website</a>
          <a className={linkStyle} target="blank" href="https://github.com/TechLory/SimpleCV">Source Code</a>
          <a className={linkStyle} target="blank" href="https://github.com/TechLory/SimpleCV">Report a Bug</a>
        </div>


        <div className="text-center text-xs text-neutral-600">
          © {year} SimpleCV | All Rights Reserved
        </div>




      </div>
    </>
  )
}

export default Footer
