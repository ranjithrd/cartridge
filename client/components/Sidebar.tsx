import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { data } from "../data/data"
import { ProjectService } from "../services/ProjectService"
import "./Sidebar.scss"

function Sidebar() {
	const history = useHistory()

	const [hidden, setHidden] = useState(true)
	const [newList, setNewList] = useState("")

	function handleCreate() {
		const id = ProjectService.createList(newList)
		if (id) {
			history.push(`/${id}`)
			setHidden(true)
			setNewList("")
		}
	}

	function handleKey(e) {
		if (e.key === "Enter") {
			console.log("enter")
			handleCreate()
		}
	}

	return (
		<aside id="sidebar">
			<div id="menu-button">
				<button onClick={() => setHidden(!hidden)} className="text">
					{hidden ? "Menu" : "Close"}
				</button>
			</div>
			<div id="menu-content" className={hidden ? "hidden" : "active"}>
				<h1>Devy</h1>
				<div className="spacer"></div>
				<div className="spacer"></div>
				<div id="menu-links">
					<Link to="/">Home</Link>
					<Link to="/tasks">Tasks</Link>
					<Link to="/docs">Docs</Link>
					{data.project.lists.map((list) => (
						<Link to={`/${list.id}`} key={list.id}>
							{list.title}
						</Link>
					))}
					<div id="new-list" onKeyDown={handleKey}>
						<input
							type="text"
							placeholder="+ New list"
							value={newList}
							onChange={(e) => setNewList(e.target.value)}
						/>
						<button className="green" onClick={handleCreate}>
							Create
						</button>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar