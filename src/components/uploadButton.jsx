import React, { useEffect, useState } from 'react'
import { BsCloudUploadFill, BsUpload } from 'react-icons/bs'
import ImgUploadPopup from './imgUploadPopup'
import { getUserDetail } from '../auth/authDetail'

function UploadButton({setTriggerGallery}) {
    const [popupOpen, setPopupOpen] = useState(false)
    useEffect(() => {
      setTriggerGallery(popupOpen)
    },[popupOpen])
  return (
    <div>
        {popupOpen &&
            <ImgUploadPopup closeEvent={setPopupOpen}/>
        }
        <div className='uploadBtn'>
            <BsCloudUploadFill style={{ color: 'white',width:30, height: 30}} onClick={() => setPopupOpen(!popupOpen)}/>
        </div>
    </div>
  )
}

export default UploadButton