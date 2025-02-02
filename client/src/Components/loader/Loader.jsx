import React, { Fragment, useContext } from 'react'
import "./Loader.css"
export const Loader = () => {

  return (
    <Fragment>
        <div className='fluid-container loader-container'>
            <div className=' spinner-grow'></div>
            <div className=' spinner-grow'></div>
            <div className=' spinner-grow'></div>
        </div>
    </Fragment>
  )
}
