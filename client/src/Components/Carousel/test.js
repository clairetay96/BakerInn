import React, { useEffect, useRef, useState } from 'react'
import './index.css'

export default function CarouselV2() {

  const [slide, setSlide] = useState(0)
  const intervalRef = useRef()

  useEffect(() => {
    startSlide()
    return () => {
      clearInterval(intervalRef.current);
    }
  })

  let style = {
    transform: `translateX(${slide}px)`
  }

  const startSlide = () => {
    const id = setInterval(() => {
      setSlide(slide > -511 ? slide - 510 : 0)
    }, 8000)
    intervalRef.current = id
  }

  const pauseSlide = () => {
    clearInterval(intervalRef.current)
  }

  const prevSlide = () => {
    clearInterval(intervalRef.current)
      setSlide(slide + 510)
    startSlide()
  }

  const nextSlide = () => {
    clearInterval(intervalRef.current)
      setSlide(slide - 510)
    startSlide()
  }

  return (
    <div style={{display: "flex", 
                 width: "max-content",
                 alignItems: "center", 
                 margin: "0 auto"}}>
      <div onClick={prevSlide} 
           className="next-right"
           style={slide < 0 ? {visibility: "visible"} : {visibility: "hidden"}}>
        Prev
      </div>
        <div onMouseOver={pauseSlide} 
             onMouseLeave={startSlide} 
             className="carousel-wrapper">
          <ul className="carousel-body" style={style}>
            <li><div>1</div></li>
            <li><div>2</div></li>
            <li><div>3</div></li>
            <li><div>4</div></li>
            <li><div>5</div></li>
            <li><div>6</div></li>
            <li><div>7</div></li>
            <li><div>8</div></li>
            <li><div>9</div></li>
            <li><div>10</div></li>
            <li><div>11</div></li>
            <li><div>12</div></li>
            <li><div>13</div></li>
            <li><div>14</div></li>
            <li><div>15</div></li>
          </ul>
        </div>
      <div onClick={nextSlide} 
           className="next-left"
           style={slide > -1020 ? {visibility: "visible"} : {visibility: "hidden"}}>
        Next
      </div>
    </div>
  )
}

