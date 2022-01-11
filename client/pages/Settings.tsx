import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { data, useData } from "../data/data"

function Settings() {
	const liveData = useData()

	const [importData, setImportData] = useState("")
	const [showImportField, setShowImportField] = useState(false)
	const [showExport, setShowExport] = useState(false)
	const history = useHistory()

	function handleCopy() {
		navigator.clipboard.writeText(JSON.stringify(data.project))
	}

	function handleImport() {
		const conf = confirm(
			"Are you sure? This will erase all current data and replace it with the new data."
		)
		if (!conf) return
		setImportData("")
		try {
			data.project = JSON.parse(importData)
			setShowImportField(false)
			history.replace("/")
		} catch (error) {
			setImportData(`Error: ${error}`)
		}
	}

	function handleCss(e) {
		data.customCss = e.target.value
	}

	return (
		<div id="main">
			<h1>Settings</h1>
			<div className="spacer"></div>
			<h3>Manage Data</h3>
			<p>
				In case you need to export data to another device or import from
				another device
			</p>
			<div className="dense-row">
				<button
					className="filled grow"
					onClick={() => setShowExport(!showExport)}
				>
					Export Data
				</button>
				<p className="gray small">or</p>
				<button
					className="filled grow"
					onClick={() => setShowImportField(!showImportField)}
				>
					Import Data
				</button>
			</div>
			{showImportField ? (
				<>
					<div className="spacer"></div>
					<p>Enter the data you copied from your other device here</p>
					<textarea
						value={importData}
						onChange={(e) => setImportData(e.target.value)}
						className="textarea"
						placeholder="Paste the data you exported here"
					/>
					<button className="filled" onClick={handleImport}>
						Import
					</button>
					<div className="spacer"></div>
				</>
			) : null}
			{showExport ? (
				<>
					<div className="spacer"></div>
					<p>
						Copy the below and in the other device, <i>Import</i>{" "}
						this data by pasting it
					</p>
					<button className="filled" onClick={handleCopy}>
						Copy
					</button>
					<div className="monospace-field">
						{JSON.stringify(data.project)}
					</div>
					<button
						className="filled"
						onClick={() => setShowExport(false)}
					>
						Done
					</button>
					<div className="spacer"></div>
				</>
			) : null}
			<div className="spacer"></div>
			<h3>Custom Styling</h3>
			<p>
				If you know your way around CSS, you can enter any styling you
				like in this field.
				<br />
				For example, change the font, border radii, anything.
			</p>
			<textarea
				value={liveData.customCss}
				onChange={handleCss}
				className="textarea"
				placeholder="Type in your CSS here"
			/>
			<h4>Writing CSS</h4>
			<p>
				Make sure that you write the CSS in another site or on a
				NotePad, and paste that into the textarea above.
			</p>
			<p>
				To change the font, use <code>html,*</code> as the selector.
			</p>
		</div>
	)
}

export default Settings
