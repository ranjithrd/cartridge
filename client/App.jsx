import React from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Home from "./pages/Home"
import { SWRConfig } from "swr"
import { http } from "./data/http"

function App() {
	return (
		<div id="parent">
			<SWRConfig
				value={{
					fetcher: (url) => http.get(url).then((res) => res.data),
				}}
			>
				<BrowserRouter>
					<Switch>
						<Route path="/" children={<Home />} />
					</Switch>
				</BrowserRouter>
			</SWRConfig>
		</div>
	)
}

export default App
