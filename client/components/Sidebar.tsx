import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { data } from "../data/data"
import { ProjectService } from "../services/ProjectService"
import "./Sidebar.scss"

function Sidebar() {
	const history = useHistory()

	const [hidden, setHidden] = useState(true)
	const [newList, setNewList] = useState("")
	const [listErr, setListErr] = useState("")

	function handleCreate() {
		if (newList === "") {
			setListErr("Enter a name")
			return
		}
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

	const showButton = newList !== ""

	return (
		<aside id="sidebar">
			<div id="menu-button">
				<button onClick={() => setHidden(!hidden)} className="text">
					{hidden ? "Menu" : "Close"}
				</button>
			</div>
			<div id="menu-content" className={hidden ? "hidden" : "active"}>
				<h1>Cartridge</h1>
				<div className="spacer"></div>
				<div className="spacer"></div>
				<div id="menu-links">
					<Link to="/" onClick={() => setHidden(true)}>
						Home
					</Link>
					<Link to="/tasks" onClick={() => setHidden(true)}>
						Tasks
					</Link>
					<Link to="/settings" onClick={() => setHidden(true)}>
						Settings
					</Link>
					{/* <Link to="/docs">Docs</Link> */}
					<div />
					{data.project.lists.map((list) => (
						<Link
							to={`/${list.id}`}
							key={list.id}
							onClick={() => setHidden(true)}
						>
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
						<button
							className={showButton ? "green" : "hide"}
							onClick={handleCreate}
						>
							Create
						</button>
						<p className="small red">{listErr}</p>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
