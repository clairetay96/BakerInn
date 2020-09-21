import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CarouselCard from '../CarouselCard'
import {ReactComponent as NextIcon} from '../../arrow.svg';
import './index.css'

export default function CarouselV2({lastestListing = [], interval = null, columns = null, title, headerLink=null}) {
  // make it responsive
  // no hard coded values
  const calcLastFrame = (length, col=5) => {
    return - ((Math.ceil(length/col) - 1) * frameSize)
  }

  let col = columns || 5
  let padding = null || 5
  let carouselSize = 900
  let frameSize = carouselSize - 10 * padding;
  let length;
  if (lastestListing) {
    length = lastestListing.length
  } else {
    length = 0
  }
  let lastFrame = calcLastFrame(length, 5);// last frame position
  let interval_ = interval || 5000;

  let totalFrames = Math.ceil(length/col)


  const [slide, setSlide] = useState(0)
  const intervalRef = useRef()

  useEffect(() => {
    startSlide()
    return () => {
      clearInterval(intervalRef.current);
    }
  })

  const startSlide = () => {
    const id = setInterval(() => {
      setSlide(slide < totalFrames - 1 ? slide + 1 : 0)
    }, interval_)
    intervalRef.current = id
  }

  const pauseSlide = () => {
    clearInterval(intervalRef.current)
  }

  const prevSlide = () => {
    clearInterval(intervalRef.current)
      setSlide(slide - 1)
    startSlide()
  }

  const nextSlide = () => {
    clearInterval(intervalRef.current)
      setSlide(slide + 1)
    startSlide()
  }


  let style = {
    carousel: {
      display: "flex", 
      position: "relative",
      width: "100%",
      alignItems: "center", 
      margin: "0 auto",
      backgroundColor: 'rgba(240,255,240,1)',
    },
    nextRight: {
      textAlign: "center",
      height: "60px",
      width: "60px",
      padding: 10,
      borderRadius: "50%",
      position: "absolute",
      left: -36,
      zIndex: 5,
      visibility: slide > 0 ? "visible" : "hidden"
    },
    nextLeft: {
      textAlign: "center",
      height: "60px",
      width: "60px",
      padding: 10,
      borderRadius: "50%",
      position: "absolute",
      right: -36,
      zIndex: 5,
      visibility: slide < totalFrames - 1 ? "visible" : "hidden"
    },
    carouselWrapper: {
      width: "100%",
      overflow: "hidden",
      display: "block",
    },
    carouselBody : {
      height: "100%",
      width: `calc(100% * ${totalFrames})`,
      padding: 0,
      margin: 0,
      display: "flex",
      transform: `translateX(-${(slide / totalFrames) * 100}%)`
    },
    carouselItem: {
      width: `calc(100% / ${col} / ${totalFrames})`,
      listStyle: "none",
      paddingTop: `calc(100% / ${col} / ${totalFrames})`,
      position: "relative"
    },
    title: {
      margin: "20px"
    }
  }

  return (
    <>
      {headerLink
        ? (<Link to={headerLink}><h4 style={style.title} >{ title }</h4></Link>)
        : (<h4 style={style.title}>{ title }</h4>)
      }
      {length
        ? (
            <div style={style.carousel}>
              <div onClick={prevSlide}
                  className="next"
                  style={style.nextRight}>
                <NextIcon transform='rotate(-90)'/>
              </div>
        
                <div onMouseOver={pauseSlide} 
                    onMouseLeave={startSlide} 
                    style={style.carouselWrapper}>
        
                  <ul className="carousel-body" style={style.carouselBody}>
                    {
                      lastestListing.map((item, index)=>(
                        <li key={index} style={style.carouselItem}>
                          <div className="carousel-item-wrapper">
                            <CarouselCard item={item}/>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
        
                </div>
        
              <div onClick={nextSlide} 
                  className="next"
                  style={style.nextLeft}>
                <NextIcon transform='rotate(90)'/>
              </div>
            </div>
          )
        : (<div className="empty-carousel">
             No listing available
           </div>)
      }
    </>
  )
}

