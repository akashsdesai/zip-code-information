import React from 'react'
import styles from './Result.module.css'
function Result(props) {
  return (
    <section className={styles.result}>
      <div className={styles.country}>
        <h4>Country : <span>{props.data.country}</span></h4>
        <p>Location Associated with the pincode {props.data["post code"]}</p>
      </div>
      <div className={styles.info}>
        {
          props.data.places.map((item,index)=>{
            return(
              <div key={index}>
                <p>{index+1}.</p>
                <p>State : <span>{item["state"]}</span></p>
                <p>Place Name : <span>{item["place name"]}</span></p>
                <a target='_blank' href={`https://www.google.com/maps/place/${item.latitude}+${item.longitude}`}>
                  <p>Google Location</p>
                  </a>
              </div>
            )
          })
        }
      </div>

    </section>
  )
}

export default Result