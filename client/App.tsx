import React, { useEffect } from "react"
import { Route, BrowserRouter, Switch } from "react-router-dom"
import Home from "./pages/Home"
import { SWRConfig } from "swr"
import { http } from "./data/http"
import { subscribe } from "valtio"
import { data, useData } from "./data/data"
import CryptoJS from "crypto-js"
import Sidebar from "./components/Sidebar"
import List from "./pages/List"
import { debounce } from "lodash"
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const cryptoOptions = {
	format: CryptoJS.format.OpenSSL,
}

function App() {
	const liveData = useData()

	useEffect(() => {
		const firebaseConfig = {
			apiKey: "AIzaSyDB6pki6IhuNoJ0_6iFUU_h4CEAX2MCboA",
			authDomain: "cartridge-3ba25.firebaseapp.com",
			projectId: "cartridge-3ba25",
			storageBucket: "cartridge-3ba25.appspot.com",
			messagingSenderId: "149001637583",
			appId: "1:149001637583:web:de45029f1e912e804f71ba",
			measurementId: "G-MCVTC9G99F",
		}

		// Initialize Firebase
		const app = initializeApp(firebaseConfig)
		const analytics = getAnalytics(app)

		if (
			localStorage.getItem("loaded") === "true" &&
			localStorage.getItem("aSj26BwZ5Hb7j2aXhzmW9g9ebKuQUDgd")
		) {
			data.project = JSON.parse(
				CryptoJS.AES.decrypt(
					localStorage.getItem("aSj26BwZ5Hb7j2aXhzmW9g9ebKuQUDgd"),
					"7A2WLPFZ87UHDvmS5XbkrpJL4MhbxeAE",
					cryptoOptions
				).toString(CryptoJS.enc.Utf8)
			)
			data.loaded = true
		}
		subscribe(
			data,
			debounce(() => {
				console.log(data)
				const encLog = CryptoJS.AES.encrypt(
					JSON.stringify(data.project),
					"7A2WLPFZ87UHDvmS5XbkrpJL4MhbxeAE",
					cryptoOptions
				).toString(CryptoJS.format.OpenSSL)
				localStorage.setItem("aSj26BwZ5Hb7j2aXhzmW9g9ebKuQUDgd", encLog)
				localStorage.setItem("loaded", "true")
				// data.loaded = true
			}, 300)
		)
	}, [])

	if (liveData.loaded !== true) {
		;<div id="focus">
			<h3>Loading...</h3>
		</div>
	}

	return (
		<div id="parent">
			<SWRConfig
				value={{
					fetcher: (url) => http.get(url).then((res) => res.data),
				}}
			>
				<BrowserRouter>
					{data.loggedIn ? <Sidebar /> : null}
					<Switch>
						<Route path="/:id" children={<List />} />
						<Route path="/" children={<Home />} />
					</Switch>
				</BrowserRouter>
			</SWRConfig>
		</div>
	)
}

export default App
