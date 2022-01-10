import React, { useState } from "react"
import { TaskService } from "../services/TaskService"
import "./TaskCard.scss"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"

function TaskCard({ task, list }: { task: Task; list: string; key: any }) {
	const [expanded, setExpanded] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [showDateSelector, setShowDateSelector] = useState(false)

	function handleToggleExpanded() {
		setExpanded(!expanded)
	}

	function handleComplete() {
		TaskService.completeTask(list, task.id, !task.completed)
	}

	function handleClickDue() {
		if (task.completed) {
			handleComplete()
			return
		} else {
			setShowDateSelector(true)
		}
	}

	function handleDueChange(date) {
		console.log(list)
		console.log(date)
		const m = moment(date)
		TaskService.updateDue(list, task, m.toISOString())
		setShowDateSelector(false)
	}

	function handleInitDelete() {
		setShowConfirm(true)
	}

	function handleDelete() {
		if (!showConfirm) return
		TaskService.deleteTask(task, list)
		setShowConfirm(false)
	}

	function getDue() {
		const [type, text] = TaskService.humanizeDueDate(task)
		switch (type) {
			case "completed":
				return [type, <p className="green">{text}</p>]
			case "overdue":
				return [type, <p className="red">{text}</p>]
			case "today":
				return [type, <p className="blue">{text}</p>]
			case "tomorrow":
				return [type, <p className="cyan">{text}</p>]
			case "future":
				return [type, <p className="gray">{text}</p>]
		}
	}

	return (
		<div
			className={`task-card ${expanded ? "expanded" : "hidden"} ${
				task.completed ? "completed" : "due"
			}`}
			key={task.id}
		>
			<div className="main-contents">
				<div className="row grow">
					{task.completed ? (
						<button
							className="material-icons"
							onClick={handleComplete}
						>
							check_box
						</button>
					) : (
						<button
							className="material-icons"
							onClick={handleComplete}
						>
							check_box_outline_blank
						</button>
					)}
					<p>{task.name}</p>
				</div>
				<div className="row">
					{task.completed ? null : showDateSelector ? (
						<ReactDatePicker
							dateFormat="d MMM yyyy"
							selected={moment(task.due).toDate()}
							onChange={handleDueChange}
							startOpen={true}
							id="inp-due"
							customInput={getDue()[1]}
							minDate={moment().startOf("day").toDate()}
						/>
					) : (
						<button onClick={handleClickDue}>{getDue()[1]}</button>
					)}
					{/* {getDue()[0] === "completed" ? null : (
						<button onClick={handleComplete}>Complete</button>
					)} */}
					{/* <button
						className="toggle-expanded gray"
						onClick={handleToggleExpanded}
					>
						{expanded ? "Close" : "More"}
					</button> */}
					{showConfirm ? (
						<button className="red" onClick={handleDelete}>
							Sure?
						</button>
					) : (
						<button
							className="material-icons gray"
							onClick={handleInitDelete}
						>
							delete
						</button>
					)}
					{/* <button className="red" onClick={handleDelete}>
						Delete
					</button> */}
				</div>
			</div>
			<div className="expanded-contents"></div>
		</div>
	)
}

export default TaskCard
