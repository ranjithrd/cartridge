import React from "react"
import useSWR from "swr"

function Home() {
	const { data: version, error } = useSWR("/v")

	// if (!version || error) return "Loading..."

	return (
		<div id="main">
			<h1>Loggy</h1>
			<table>
				
			</table>
			<p>Version: {version}</p>
		</div>
	)
}

export default Home
