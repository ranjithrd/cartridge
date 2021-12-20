const { MongoClient } = require("mongodb")
const { main: createServer } = require("./server")
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT || 5001

const url = process.env.MONGO_URL
const client = new MongoClient(url)
const dbName = process.env.MONGO_DB

async function main() {
	await client.connect()
	const db = client.db(dbName)
	if (!db) throw "DB doesn't exist."
	const server = createServer(db)
	const port = PORT || 5000
	server.listen(PORT, () => {
		console.log(`Listening to port ${port}`)
	})
}

main()