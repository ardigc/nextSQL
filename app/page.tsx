import { pool } from "@/lib/server/pg"

export default async function Home() {
  const result = await pool.query('SELECT * FROM products;')
  return (
    <div>
      {result.rows.map(row => <p>{row.name}</p>)}
    </div>
  )
}
