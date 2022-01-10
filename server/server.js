const express = require("express")
const cors = require("cors")
const { Db } = require("mongodb")
const bcrypt = require("bcrypt")
const saltRounds = 10

/**
 * @param {Db} db
 */
function main(db) {
	if (!db) throw "DB does not exist"

	const app = express()

	const logs = db.collection("logs")

	app.use(cors())
	app.use(express.static(__dirname + "/../dist"))
	app.use(express.json())

	app.get("/log/:code", async (req, res) => {
		const password = req.headers.password ?? ""
		const code = req.params.code ?? ""
		if (!password || !code) {
			res.sendStatus(400)
			return
		}
		const logWithCode = await logs.findOne({
			code: parseInt(code),
		})
		if (!logWithCode) {
			res.sendStatus(404)
			return
		}
		if (!(await bcrypt.compare(password, logWithCode.password))) {
			res.sendStatus(403)
			return
		}
		res.send({
			...logWithCode,
			_id: undefined,
			password: undefined,
		})
	})

	app.post("/log/update/:code", async (req, res) => {
		const body = req.body
		const code = req.params.code ?? "0"

		if (!body?.password) {
			res.sendStatus(400)
			return
		}
		const logWithCode = await logs.findOne({
			code: parseInt(code),
		})
		if (!logWithCode) {
			res.sendStatus(404)
			return
		}
		if (!(await bcrypt.compare(body.password, logWithCode.password))) {
			res.sendStatus(403)
			return
		}
		await logs.findOneAndUpdate(
			{
				_id: logWithCode._id,
			},
			{
				$set: {
					...body,
					password: logWithCode.password,
				},
			}
		)
		res.end()
	})

	app.post("/log/create", async (req, res) => {
		const body = req.body
		if (!body?.password) {
			res.sendStatus(400)
			return
		}
		const result = await logs.insertOne({
			...body,
			password: await bcrypt.hash(body.password, saltRounds),
			code: Math.floor(Math.random() * 100000),
		})
		const resultantDoc = await logs.findOne({
			_id: result.insertedId,
		})
		res.send({
			...resultantDoc,
			password: undefined,
		})
	})

	app.get("/v", (_, res) => res.send("V0.0.1 alpha"))

	app.get("/v/logs", async (_, res) => {
		res.send(await logs.find({}).toArray())
	})

	app.get("/:id", async (req, res) => {
		res.send(req.params.id)
	})

	return app
}

exports.main = main
