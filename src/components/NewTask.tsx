import moment from "moment"
import React, { useState } from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { TaskService } from "../services/TaskService"
import "./NewTask.scss"

function NewTask({ listId }) {
	const [newName, setNewName] = useState("")
	const [newDue, setNewDue] = useState(moment().toISOString())

	// function handleCancel() {}

	function handleCreate() {
		if (newName.replace(/ /g, "") === "") return
		TaskService.createTask(listId!, newName, newDue)
		setNewName("")
		setNewDue(moment().toISOString())
	}

	function handleKey(e) {
		if (e.key === "Enter") {
			console.log("enter")
			handleCreate()
		}
	}

	const showButton = newName !== ""

	return (
		<div id="new-row" onKeyDown={handleKey}>
			<input
				type="text"
				id="inp-name"
				placeholder="Create a new task..."
				value={newName}
				onChange={(e) => setNewName(e.target.value)}
			/>

			<div id="inp-due-wrap">
				<ReactDatePicker
					dateFormat="d MMM yyyy"
					selected={moment(newDue).toDate()}
					onChange={(date) => setNewDue(moment(date).toISOString())}
					id="inp-due"
					minDate={moment().startOf("day").toDate()}
					customInput={
						<button>{moment(newDue).format("D MMM YYYY")}</button>
					}
					popperProps={{
						positionFixed: true,
						strategy: "fixed",
					}}
				/>
			</div>

			<button
				type="submit"
				onClick={handleCreate}
				className={showButton ? "" : "button-hide"}
			>
				Create
			</button>

			{/* <button type="reset" onClick={handleCancel}>
				Cancel
			</button> */}
		</div>
	)
}

export default NewTask
