import React, { useState, useEffect } from "react"
import ContentEditable from "react-contenteditable"
import { useParams, useHistory } from "react-router-dom"
import NewTask from "../components/NewTask"
import Note from "../components/Note"
import Tasks from "../components/Tasks"
import { useData } from "../data/data"
import { ProjectService } from "../services/ProjectService"
import { TaskService } from "../services/TaskService"

function List() {
	const { id } = useParams<{ id: string }>()
	const history = useHistory()
	const data = useData()
	const [show, setShow] = useState(false)

	const list = data.project.lists.filter((e) => e.id === id)[0]

	useEffect(() => {
		setShow(false)
		setTimeout(() => {
			setShow(true)
		}, 100)
	}, [id])

	if (!list) {
		return (
			<div id="focus">
				<h3>List not found.</h3>
			</div>
		)
	}

	const title = list.title

	function setTitle(t) {
		ProjectService.updateList(
			id,
			t
				.replace(/<br>/g, "")
				.replace(/<div>/g, "")
				.replace(/<\/div>/g, "")
		)
	}

	function handleDelete() {
		const conf = confirm(
			"Confirm that you want to delete this list and all associated tasks and notes"
		)
		if (!conf) return
		ProjectService.deleteList(id)
		history.replace("/")
	}

	const tasks: Array<Task> = TaskService.sortTasks(
		list.children.filter((e) => e.type === "task").map((t) => t as Task)
	)

	return (
		<div id="main" className={show ? "list-page" : "page-hide"}>
			<ContentEditable
				html={title}
				onChange={(e) => setTitle(e.target.value)}
				tagName="h1"
			/>
			<div className="spacer"></div>
			<Tasks tasks={tasks} list={list.id} />
			<NewTask listId={id} />
			<div className="spacer"></div>
			{/* {list.note ? (
				<>
					<p className="disabled">Note</p>
					<Note noteRef={list.note} />
				</>
			) : (
				<button>Add a note!</button>
			)} */}
			{/* <div className="spacer"></div>
			<div className="spacer"></div> */}
			<button className="red" onClick={handleDelete}>
				Delete
			</button>
		</div>
	)
}

export default List
