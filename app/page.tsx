import { pool } from "@/lib/server/pg"
import { Product } from "./MyClientComponent"

export default async function Home() {
  const result = await pool.query('SELECT * FROM products;')
  const user = await pool.query('SELECT * FROM users_info WHERE id=1')
  console.log(user)
  return (
  
    <div>
      {/* { user.rows.map(row=> <h1> {row.name} {row.email}</h1>)} */}
     <div className="fixed top-0 w-screen h-12 flex items-center justify-center bg-blue-200">
     <h1>Eshop</h1>
      </div>
      <div className="relative top-12 bg-slate-200">
      {result.rows.map(row => <Product {...row} />)}
      </div>
    </div>
  )
}
