import { pool } from "@/lib/server/pg"
import { Product } from "./MyClientComponent"

export default async function Home() {
  const result = await pool.query('SELECT * FROM products;')
  const user = await pool.query('SELECT * FROM users_info WHERE id=1')
  console.log(user)
  return (
  
    <div>
      { user.rows.map(row=> <h1> {row.name} {row.email}</h1>)}
      <h1></h1>
      {result.rows.map(row => <Product {...row} />)}
    </div>
  )
}
