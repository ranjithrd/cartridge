import React from "react"
import NewTask from "../components/NewTask"
import Tasks from "../components/Tasks"
import { useData } from "../data/data"
import { TaskService } from "../services/TaskService"

function AllTasks() {
	const liveData = useData()

	return (
		<div id="main">
			<h1>All Tasks</h1>
			{liveData.project.lists.map((list) => (
				<div>
					<div className="spacer"></div>
					<p className="small capital gray">{list.title}</p>
					{TaskService.sortTasks(
						list.children.filter(
							(e) => e.type === "task"
						) as Array<Task>
					).length > 0 ? (
						<div key={list.id}>
							<div className="spacer-small"></div>
							<Tasks
								list={list.id}
								tasks={
									list.children.filter(
										(e) => e.type === "task"
									) as Task[]
								}
							/>
							<div className="spacer-small"></div>
							<NewTask listId={list.id} />
						</div>
					) : (
						<>
							<p className="small">No tasks yet! Add one below</p>
                            <div className="spacer-small"></div>
							<NewTask listId={list.id} />
						</>
					)}
				</div>
			))}
		</div>
	)
}

export default AllTasks
