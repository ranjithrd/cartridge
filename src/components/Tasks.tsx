import React from "react"
import TaskCard from "./TaskCard"
import "./Tasks.scss"

function Tasks({ tasks, list }: { tasks: Array<Task>; list: string }) {
	return (
		<div id="tasks">
			{tasks.map((task) => (
				<TaskCard task={task} list={list} key={task.id} />
			))}
		</div>
	)
}

export default Tasks
