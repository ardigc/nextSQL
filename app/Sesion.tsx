'use client'
import { MouseEventHandler, useState } from "react"

export default function Sesion() {
const [inLogging, setInLogging]=useState(false)
const clickHandler: MouseEventHandler<HTMLButtonElement>=((ev)=>{
    setInLogging(true)
})

   return ( <div className="absolute flex items-center justify-end w-screen h-12">
    <button onClick={clickHandler} className=" border rounded-3xl bg-slate-500 px-1 mx-10">Iniciar sesion</button>
   {inLogging && <div>
    HOLA
    </div>}
   </div>)
}