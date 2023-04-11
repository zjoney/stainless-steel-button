import React, { useState, useRef, useEffect } from 'react'
import './Cbutton.css'

const CButton = () => {
  const container = useRef(null)
  const fingerprints = useRef([])

  const [isClick, setIsClick] = useState(false)
  const handlePoint = (e) => {
    setIsClick(true)
    const btn = container.current.getBoundingClientRect()
    const id = Math.random().toString(16).slice(2)
    const finger = {
      id,
      x: e.clientX - btn.left,
      y: e.clientY - btn.top
    }
    fingerprints.current.push(finger)
    setTimeout(()=>{
    fingerprints.current = fingerprints.current.filter(f=>f.id!==id)
    }, 2000)
  }
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      const video = container.current
      video.srcObject = stream
      video.onloadedmetadata = (e) => {
        video.play()
      }
    })

  }, [])
  return <div className='button-wrap'>
    {
      fingerprints.current.map((finger, index) => {
        return <div
          className='fingerprints'
          key={index}
          style={{
            left: finger.x + 'px',
            top: finger.y + 'px'
          }}
        >
        </div>
      })
    }
    <div
      className={`button ${isClick ? "pressed" : ''}`}
      onPointerDown={handlePoint}
      onPointerUp={$event => { setIsClick(false) }}
    >
      <video className='button-reflaction' ref={container}></video>
    </div>
    <div>前端编程实践</div>
  </div>
}
export default CButton