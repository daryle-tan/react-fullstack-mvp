import express from "express";
import pg from "pg";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const pool = new pg.Pool({
  database: "mvpcrypto",
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
      const asset = data.rows[0];
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
  const amount_invested = req.body.price_at_purchase;
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
