import React, { useEffect, useRef } from 'react'
import { Button } from '@mui/material';

const { useOpenCv } = require('opencv-react')

function Opencv() {
  const { loaded, cv } = useOpenCv()
  const imageSrcRef = useRef<any>(null)
  const inputElementRef = useRef<any>(null)
  const canvasOutputRef = useRef<any>(null)

  useEffect(() => {
    if (cv) {
      console.log(cv);
      inputElementRef?.current?.addEventListener('change', (e: any) => {
        imageSrcRef.current.src = URL.createObjectURL(e.target.files[0]);
      }, false);
      imageSrcRef.current.onload = function () {
        let src = cv.imread(imageSrcRef.current.id);
        let dst = new cv.Mat();
        // You can try more different parameters
        cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);
        cv.imshow(canvasOutputRef.current.id, dst);
        src.delete(); dst.delete();
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
      {/* <Button variant="contained" component="label">
        Upload
        <input hidden accept="image/*" multiple type="file" />
      </Button> */}
    </>
  )
}

export default Opencv