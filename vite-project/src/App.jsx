import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from "../public/data.json";

function App() {
  
    const [currentQues,setCurentQues]=useState(0);
    const [score,setscore]=useState(0);
    const[show,setshown]=useState(false);
    const [timer,settimer]=useState(10);


    const clickans=(option)=>{
      
      if(option === data[currentQues].answer){
        setscore((score)=>score+1);
      }
      
      if(currentQues < data.length -1){
        setCurentQues((currentQues)=>currentQues+1);
        settimer(10)
      }else{
        setshown(true)
      }

    }

    const restart=()=>{
      setCurentQues(0),
      setscore(0),
      setshown(0),
      settimer(10)
    }
   
    useEffect(()=>{

     let interval;

     if(timer > 0 && !show ){

      interval=setInterval(() => {
         
        settimer((sec)=>sec-1)

      }, 1000);
     }else{
      clearInterval(interval);
      setshown(true)
     }
    
      return ()=>clearInterval(interval)
      
    },[timer,show])



  return (
    <>
     
      <div className=' vh-100  d-flex justify-content-center align-items-center one '>

        <div className=' border border-3 p-3 bg-white'>
                   
                   {show ? ( <div className=' mb-3' >
            <h2 className=' text-center fw-bold'>Your Score : {score}/{data.length}</h2>
            <div className=' d-flex justify-content-center'><button  onClick={restart}   className=' btn  btn-danger rounded rounded-4 '>Restart</button>
            </div>
           </div>):(
             <div>
              
              <h5 className=' text-center fw-bold'>Question {currentQues + 1}</h5>
              <p className='text-center fw-bold'>{data[currentQues].question}</p>
             
              

              <div className=' gap-3 d-flex mb-2'>
            
               {data[currentQues].options.map((option,index)=>
               <button onClick={()=>clickans(option)}    className=' btn  btn-primary rounded rounded-1' key={index}>{option}</button>

               )}


              </div>
             
              <div><p className=' text-center'>Time Left {timer}s</p> </div>
             </div>)}

        </div>


      </div>

    </>
  )
}

export default App
