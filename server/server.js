const express = require("express")
const cors = require("cors")
const { Db } = require("mongodb")

/**
 * @param {Db} db
 */
function main(db) {
	if (!db) throw "DB does not exist"
	
	const app = express()

	const forms = db.collection("forms")

	app.use(cors())
	app.use(express.static(__dirname + "/../dist"))

	app.get("/v", (_, res) => res.send("V0.0.1 alpha"))

	app.get("/v/forms", async (_, res) => {
		res.send(await forms.find({}).toArray())
	})

	app.get("/:id", async (req, res) => {
		res.send(req.params.id)
	})

	return app
}

exports.main = main
