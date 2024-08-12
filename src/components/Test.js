import React, {useState} from 'react'

const Test = () => {

    const[color, setColor] = useState("red");
    console.log(color);

    const handleColor = () => {
       setColor("green");
    }

  return (
    <div className='container'>
        <button onClick={handleColor}>Change Color</button>
    </div>
  )
}

export default Test
