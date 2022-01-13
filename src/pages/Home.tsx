import React from "react"
import moment from "moment"
import TaskCard from "../components/TaskCard"
import { useData, data } from "../data/data"

function Home() {
	const liveData = useData()
	console.log(liveData)

	let allTasks: Array<ITask> = []

	for (let list of liveData.project.lists) {
		const listTasks = list.children.filter(
			(e) => e.type === "task"
		) as Array<Task>
		for (let t of listTasks) {
			if (t.completed) continue
			allTasks.push({
				list: list.id,
				task: t,
			})
		}
	}

	let overdueTasks = allTasks.filter((e) =>
		moment(e.task.due).isBefore(moment(), "day")
	)

	let todayTasks = allTasks.filter((e) =>
		moment(e.task.due).isSame(moment(), "day")
	)

	let tomorrowTasks = allTasks.filter((e) =>
		moment(e.task.due).isSame(moment().add({ days: 1 }), "day")
	)

	let futureTasks = allTasks.filter((e) =>
		moment(e.task.due).isAfter(moment().add({ days: 1 }), "day")
	)
	futureTasks.sort(
		(a, b) => moment(a.task.due).valueOf() - moment(b.task.due).valueOf()
	)

	let greeting = "Welcome back!"
	const hour = moment().get("hour")
	console.log(hour)

	if (hour < 12) {
		greeting = "Good morning!"
	} else if (hour < 16) {
		greeting = "Good afternoon!"
	} else {
		greeting = "Good evening!"
	}

	return (
		<div id="main">
			<h1>{greeting}</h1>
			{overdueTasks.length > 0 ? (
				<div className="list">
					<p className="small capital gray">Overdue Tasks</p>
					<div className="spacer"></div>
					{overdueTasks.map((task) => (
						<TaskCard
							list={task.list}
							task={task.task}
							key={task.task.id}
						/>
					))}
					<div className="spacer"></div>
				</div>
			) : null}
			{todayTasks.length > 0 ? (
				<div className="list">
					<p className="small capital gray">Today's Tasks</p>
					<div className="spacer"></div>
					{todayTasks.map((task) => (
						<TaskCard
							list={task.list}
							task={task.task}
							key={task.task.id}
						/>
					))}
					<div className="spacer"></div>
				</div>
			) : overdueTasks.length > 0 ? null : (
				<>
					<div className="spacer"></div>
					<h3>All tasks for today completed! 🥳</h3>
					<div className="spacer"></div>
				</>
			)}
			{tomorrowTasks.length > 0 ? (
				<div className="list">
					<p className="small capital gray">Tomorrow's Tasks</p>
					<div className="spacer"></div>
					{tomorrowTasks.map((task) => (
						<TaskCard
							list={task.list}
							task={task.task}
							key={task.task.id}
						/>
					))}
					<div className="spacer"></div>
				</div>
			) : null}
			{futureTasks.length > 0 ? (
				<div className="list">
					<p className="small capital gray">Tasks in the future</p>
					<div className="spacer"></div>
					{futureTasks.map((task) => (
						<TaskCard
							list={task.list}
							task={task.task}
							key={task.task.id}
						/>
					))}
					<div className="spacer"></div>
				</div>
			) : null}
		</div>
	)
}

export default Home
