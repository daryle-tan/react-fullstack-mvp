// import express from "express";
// // import pg from "pg";
// import postgres from "postgres";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT;

// const sql = postgres(
//   process.env.DATABASE_URL,
//   process.env.NODE_ENV === "production"
//     ? {
//         ssl: { rejectUnauthorized: false },
//         max_lifetime: 60 * 30,
//       }
//     : {}
// );

// app.use(express.json());
// app.use(cors());
// app.use(express.static("public"));

// app.get("/api/crypto", async (req, res, next) => {
//   const crypto = await sql`
//     SELECT * FROM crypto`;
//   res.send(crypto);
// });

// app.get("/api/crypto/:id", async (req, res) => {
//   const { id } = req.params;
//   const checkId = await sql`SELECT * FROM crypto WHERE id = ${id}`;
//   console.log(checkId);
//   res.send(checkId[0]);
// });

// app.post("/api/crypto", (req, res, next) => {
//   const name = req.body.name;
//   const amount_invested = req.body.amount_invested;
//   const price_at_purchase = req.body.price_at_purchase;
//   const date_purchased = req.body.date_purchased;
//   const tokens_owned = req.body.tokens_owned;

//   pool
//     .query(
//       "INSERT INTO crypto(name, amount_invested, price_at_purchase, date_purchased, tokens_owned) VALUES($1, $2, $3, $4, $5) RETURNING *;",
//       [name, amount_invested, price_at_purchase, date_purchased, tokens_owned]
//     )
//     .then((response) => {
//       if (req.body) {
//         res.send(response);
//       } else {
//         res.sendStatus(400);
//       }
//     })
//     .catch(next);
// });

// app.patch("/api/crypto/:id", (req, res, next) => {
//   const index = req.params.id;
//   const body = req.body;
//   pool
//     .query(
//       `UPDATE crypto SET name = COALESCE($1, name),
//               amount_invested = COALESCE($2, amount_invested),
//             price_at_purchase = COALESCE($3, price_at_purchase),
//                  tokens_owned = COALESCE($4, tokens_owned),
//                date_purchased = COALESCE($5, date_purchased)
//                      WHERE id = COALESCE($6, id)
//                      RETURNING *;`,
//       [
//         body.name,
//         body.amount_invested,
//         body.price_at_purchase,
//         body.tokens_owned,
//         body.date_purchased,
//         index,
//       ]
//     )
//     .then((data) => {
//       if (body.name) {
//         console.log(data);
//         res.send(data.rows[0]);
//       } else {
//         res.sendStatus(400);
//       }
//     })
//     .catch(next);
// });

// app.delete("/api/crypto/:id", (req, res, next) => {
//   const id = req.params.id;
//   pool
//     .query("DELETE FROM crypto WHERE id = $1 RETURNING *;", [id])
//     .then((data) => {
//       if (data.rows.length === 0) {
//         res.sendStatus(404);
//       } else {
//         res.send("Success!");
//       }
//     })
//     .catch(next);
// });

// app.use((err, req, res, next) => {
//   console.log(err);
//   return res
//     .set("content-type", "text/plain")
//     .status(500)
//     .send("Internal Server Error");
// });

// app.listen(PORT, () => {
//   console.log(`listening to ${PORT}`);
// });

import express from "express";
import pg from "pg";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

app.get("/api/crypto", (req, res, next) => {
  pool
    .query("SELECT * FROM crypto;")
    .then((response) => {
      res.send(response.rows);
    })
    .catch(next);
});

app.get("/api/crypto/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM crypto WHERE id = $1;", [id])
    .then((response) => {
      const asset = response.rows[0];
      if (asset) {
        res.send(asset);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(next);
});

app.post("/api/crypto", (req, res, next) => {
  const name = req.body.name;
  const amount_invested = req.body.amount_invested;
  const price_at_purchase = req.body.price_at_purchase;
  const date_purchased = req.body.date_purchased;
  const tokens_owned = req.body.tokens_owned;

  pool
    .query(
      "INSERT INTO crypto(name, amount_invested, price_at_purchase, date_purchased, tokens_owned) VALUES($1, $2, $3, $4, $5) RETURNING *;",
      [name, amount_invested, price_at_purchase, date_purchased, tokens_owned]
    )
    .then((response) => {
      if (req.body) {
        res.send(response);
      } else {
        res.sendStatus(400);
      }
    })
    .catch(next);
});

app.patch("/api/crypto/:id", (req, res, next) => {
  const index = req.params.id;
  const body = req.body;
  pool
    .query(
      `UPDATE crypto SET name = COALESCE($1, name),
              amount_invested = COALESCE($2, amount_invested),
            price_at_purchase = COALESCE($3, price_at_purchase),
                 tokens_owned = COALESCE($4, tokens_owned),
               date_purchased = COALESCE($5, date_purchased)
                     WHERE id = COALESCE($6, id)
                     RETURNING *;`,
      [
        body.name,
        body.amount_invested,
        body.price_at_purchase,
        body.tokens_owned,
        body.date_purchased,
        index,
      ]
    )
    .then((data) => {
      if (body.name) {
        console.log(data);
        res.send(data.rows[0]);
      } else {
        res.sendStatus(400);
      }
    })
    .catch(next);
});

app.delete("/api/crypto/:id", (req, res, next) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM crypto WHERE id = $1 RETURNING *;", [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send("Success!");
      }
    })
    .catch(next);
});

app.use((err, req, res, next) => {
  console.log(err);
  return res
    .set("content-type", "text/plain")
    .status(500)
    .send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});

// import express from "express";
// import pg from "pg";
// import dotenv from "dotenv";
// import cors from "cors";

// // fun global stuff ------------------------------------------------------------------//
// dotenv.config(); // process env deconstruction
// const app = express(); //express
// app.use(express.json()); //express
// app.use(
//   cors({
//     origin: "*",
//   })
// );
// const { DATABASE_URL, NODE_ENV, PORT } = process.env; //dotenv
// //my pg pool danny showed us, allows dynamic inputs for local and server no SSL
// const pool = new pg.Pool({
//   connectionString: DATABASE_URL,
//   ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
// });
