import React, { useEffect, useState } from 'react'
import Select from "react-select";
import Data from '../../Assets/Data.js'
import styles from './Search.module.css'
import axios from 'axios';
import Result from '../Result/Result.jsx';

function Search() {

const selectStyles={
control:styles=>({
  ...styles,
  padding:'0px 10px',
  borderRadius:'25px',
  background:'black',
  boxShadow:'0px 0px 15px rgba(255, 174, 0, 0.8)',
  border:'none',
}),

singleValue:style=>({
  ...style,
  color:'wheat'
})
}

  const [input, setInput]=useState({
    country:'',
    code:'',
  })

  const[load,setLoad]=useState(false)

  const [result, setResult]=useState([])

  useEffect(()=>{
    const oldData=localStorage.getItem("data")
    const oldDataArray=JSON.parse(oldData)
    if(oldDataArray!==null){
      setResult(oldDataArray)
    }
  },[])
  

  function changeCountry(selectedOption){
    setInput({
      ...input,
      country:selectedOption.value
    });
  }

  function changeCode(){
    setInput({
      ...input,
      code:event.target.value
    })
  }

  async function handleSubmit(e){
    setLoad(true)
    e.preventDefault()
    if(!input.country && !input.code){
      alert('Invalid Entry')
      setLoad(false)
    }
    else{
      try{
        const response = await axios.get(`https://api.zippopotam.us/${input.country}/${input.code}`)
        result.push(response.data)
        setResult(result)
        setInput(
          {
            country:input.country,
            code:''
          }
        )
        setLoad(false)
        localStorage.setItem("data",JSON.stringify(result))
      }catch(error){
        alert('Application cannot find the location please check the inputs')
        setLoad(false)
      }
    }
  }

  function erase(){
    localStorage.setItem("data", null)
    setResult([])
  }
  return (
    <section className={styles.search}>
      <div className={styles.title}>
        <h1 className={styles.title}>Zip Code Information App</h1>
      </div>
      <form className={styles.input}>
        <label htmlFor='sekect'>Select Country</label>
        <Select  id='select' styles={selectStyles} className={styles.select} options={Data} onChange={changeCountry} autoFocus={true} />
        <label>Enter Pincode</label>
        <input onChange={changeCode} placeholder='Enter pincode here' value={input.code} className={styles.code} type='text' />
        <button onClick={handleSubmit} className={styles.submit}>Search</button>
      </form>
      <div className={styles.result}>
      {result.length && <h2>Result</h2>}
        {load ? <div className={styles.load} /> :
          result.map((value,index)=>{
            return(
              <Result key={index} data={value} />
            )
          })
        }
      </div>
      {result.length && <button className={styles.erase} onClick={erase}>Delete Search History</button>}
    </section>
  )
}

export default Search