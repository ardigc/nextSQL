import { pool } from "@/lib/server/pg"
import { Product } from "./MyClientComponent"

export default async function Home() {
  const result = await pool.query('SELECT * FROM products;')
  return (
    <div>
      {result.rows.map(row => <Product {...row} />)}
    </div>
  )
}
