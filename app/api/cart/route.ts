import { NextRequest } from 'next/server';
import { pool } from '@/lib/server/pg';
import { verify } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  // Body del fetch en el front
  const body = await req.json();
  const productId = body.id;
  const cookiesValue = req.cookies;
  let userId = null;

  try {
    userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;

    let cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + userId.id + " AND state='unpay'"
    );
    // console.log(cartId);
    if (cartId.rowCount === 0) {
      const createCart = await pool.query(
        'INSERT INTO carts(user_id, state) VALUES (' + userId.id + ",'unpay' )"
      );
    }
    cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + userId.id + " AND state='unpay'"
    );
    const cart = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        cartId.rows[0].id
    );
    if (cart.rows.length > 0) {
      const item = cart.rows.find((item) => item.id === productId);
      if (item === undefined) {
        const query =
          'INSERT INTO cart_items(cart_id, product_id, qt) VALUES ($1, $2, 1)';
        const parameters = [cartId.rows[0].id, productId];
        const result = await pool.query(query, parameters);
        const cartMod = await pool.query(
          'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
            cartId.rows[0].id +
            ' ORDER BY product_id DESC'
        );
        return new Response(JSON.stringify(cartMod.rows), { status: 200 });
      } else {
        const qt = item.qt + 1;
        const query = 'UPDATE cart_items SET qt=$1 WHERE product_id=$2;';
        const parameters = [qt, productId];
        const result = await pool.query(query, parameters);
        const cartMod = await pool.query(
          'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
            cartId.rows[0].id +
            ' ORDER BY product_id DESC'
        );
        return new Response(JSON.stringify(cartMod.rows), { status: 200 });
      }
    } else {
      const query =
        'INSERT INTO cart_items(cart_id, product_id, qt) VALUES ($1, $2, 1)';

      const parameters = [cartId.rows[0].id, productId];
      const result = await pool.query(query, parameters);
      const cartMod = await pool.query(
        'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
          cartId.rows[0].id +
          ' ORDER BY product_id DESC'
      );
      return new Response(JSON.stringify(cartMod.rows), { status: 200 });
    }
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
    // redireccionar a iniciar
  }
}

export async function PUT(req: NextRequest) {
  // Body del fetch en el front
  const body = await req.json();
  const productId = body.id;
  const cookiesValue = req.cookies;
  let userId = null;

  try {
    userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + userId.id + " AND state='unpay'"
    );

    const query = 'DELETE FROM cart_items WHERE product_id=$1 AND cart_id=$2';

    const parameters = [productId, cartId.rows[0].id];
    const result = await pool.query(query, parameters);
    const cartMod = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        cartId.rows[0].id +
        ' ORDER BY product_id DESC'
    );
    return new Response(JSON.stringify(cartMod.rows), { status: 200 });
  } catch (error: any) {
    throw 'No tienes iniciada sesion';
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const productId = body.id;
  const qt = body.qt;
  const cookiesValue = req.cookies;
  let userId = null;
  try {
    userId = verify(
      cookiesValue.get('token')?.value || '',
      process.env.JWT_SECRET || ''
    );
    if (typeof userId === 'string') return;
    const cartId = await pool.query(
      'SELECT id FROM carts WHERE user_id =' + userId.id + " AND state='unpay'"
    );
    const query =
      'UPDATE cart_items SET qt=$1 WHERE cart_id=$2 AND product_id=$3';
    const parameters = [qt, cartId.rows[0].id, productId];
    const result = await pool.query(query, parameters);
    const cartMod = await pool.query(
      'SELECT * FROM carts INNER JOIN cart_items ON carts.id = cart_items.cart_id INNER JOIN products ON products.id = cart_items.product_id  WHERE carts.id=' +
        cartId.rows[0].id +
        ' ORDER BY product_id DESC'
    );
    return new Response(JSON.stringify(cartMod.rows), { status: 200 });
  } catch (error: any) {
    throw 'No tienes iniciada sesion' + error;
  }
}
