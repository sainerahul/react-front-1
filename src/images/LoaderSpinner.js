import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
class LoaderSpinner extends React.Component {
  //other logic
    render() {
     return(
        <div style={{marginTop:"200px"}}>
      <h1 >Loading...</h1>
      <Loader
         type="TailSpin"
         color="#00BFFF"
         height={200}
         width={200}
         // timeout={3000} //3 secs

      />
      </div>
     
     );
    }
 }
 export default LoaderSpinner