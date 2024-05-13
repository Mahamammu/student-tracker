import { Carousel } from 'flowbite-react';
import logo1 from "../images/full-stack-development.png";
import logo2 from "../images/ai.jpg";
import logo3 from "../images/mern.png";
import logo4 from "../images/mean.png"
import logo5 from "../images/ml.jpg"



export default function Carousell() {
  return (
  <div>
    <div className="flex justify-center items-center h-80 sm:h-96 xl:h-120 2xl:h-140 mr-5 ml-5 ">
      <Carousel pauseOnHover>
        <img src= {logo1} alt="..." />
        <img src= {logo2} alt="..." />
        <img src= {logo3} alt="..." />
        <img src = {logo4} alt="..." />
        <img src = {logo5} alt="..." />

      </Carousel>
    </div>
    <div>
      <br></br>
    </div>
  </div>
  )};