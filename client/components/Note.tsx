import React, { useState, useEffect } from "react"
import "./Note.scss"
import { marked } from "marked"
import * as sanitizeHtml from "sanitize-html"
import { NoteService } from "../services/NoteService"
import { useData } from "../data/data"

function Note({ noteRef }: { noteRef: NoteRef }) {
	const liveData = useData()
	const note = NoteService.findNote(noteRef, liveData.project)

	const [tab, setTab] = useState("preview")

	function handleChange(e) {
		console.log("Change.")
		const newVal = sanitizeHtml(e.target.value)
			.replace(/(<div>|\<\/div>)/g, "")
			.replace(/<br>/g, `\n`)
			.replace(/<br \/>/g, `\n`)
		NoteService.updateNote(noteRef, newVal)
	}

	const output = sanitizeHtml(
		marked(note.markdown.replace(/<br>/g, `\n`)).replace(/\n/g, `<br>`)
	)

	return (
		<div className="note" key={note.id}>
			<div className="tabs">
				<button
					className={`tab ${
						tab === "write" ? "t-active" : "t-inavtive"
					}`}
					onClick={() => setTab("write")}
				>
					Write
				</button>
				<button
					className={`tab ${
						tab === "preview" ? "t-active" : "t-inavtive"
					}`}
					onClick={() => setTab("preview")}
				>
					Preview
				</button>
			</div>
			<div className="tab-container">
				<div
					className={`tab-view write ${
						tab === "write" ? "active" : "inactive"
					}`}
				>
					<textarea
						value={note.markdown.replace(/<br>/g, "\n")}
						onChange={handleChange}
					/>
				</div>
				<div
					className={`tab-view preview ${
						tab === "preview" ? "active" : "inactive"
					}`}
					dangerouslySetInnerHTML={{ __html: output }}
				/>
			</div>
		</div>
	)
}

export default Note
