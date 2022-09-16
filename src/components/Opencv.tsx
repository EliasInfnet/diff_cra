import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material';

const { useOpenCv } = require('opencv-react')

function Opencv() {
  const { loaded, cv } = useOpenCv()
  const imageSrcRef = useRef<any>(null)
  const inputElementRef = useRef<any>(null)
  const canvasOutputRef = useRef<any>(null)
  const [time, setTime] = useState<any>('')

  useEffect(() => {
    if (cv) {
      // console.log(cv);
      inputElementRef?.current?.addEventListener('change', (e: any) => {
        imageSrcRef.current.src = URL.createObjectURL(e.target.files[0]);
      }, false);
      imageSrcRef.current.onload = function () {
        const ms_start = new Date().getTime()
        let src = cv.imread(imageSrcRef.current.id);
        let dst = new cv.Mat();
        // You can try more different parameters
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(canvasOutputRef.current.id, dst);
        src.delete(); dst.delete();
  
        const ms_end = new Date().getTime()
        setTime(() => ms_end - ms_start + 'ms');
      };

    }
  }, [cv])
  return (
    <>
      <div className="inputoutput">
        <img id="imageSrc" ref={imageSrcRef} alt="teste" />
        <div className="caption">imageSrc <input type="file" id="fileInput" ref={inputElementRef} name="file" /></div>
      </div>
      <div className="inputoutput">
        <canvas id="canvasOutput" ref={canvasOutputRef} ></canvas>
        <div className="caption">canvasOutput</div>
      </div>
      <h1> Tempo do opencv : {time}</h1>
    </>
  )
}

export default Opencv