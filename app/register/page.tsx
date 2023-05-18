'use client'

export default function SignIn() {
    return <div className="absolute top-7 border rounded-lg min-w-fit right-9 bg-blue-300 ">
    <form className="px-3">
      <label>Correo electronico</label>
      <input></input>
      <label>Contraseña</label>
      <input></input>
      <div className="flex justify-end">
        <button className="m-1 bg-slate-500 border rounded-full px-1">
          Summit
        </button>
      </div>
    </form>
  </div>
}