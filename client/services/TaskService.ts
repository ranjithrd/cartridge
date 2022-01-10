import { v4 } from "uuid"
import moment from "moment"
import { data } from "../data/data"
import { GeneralService } from "./GeneralService"

export class TaskService {
	static sortTasks(tasks: Task[]): Task[] {
		let tasksClone = [...tasks]
		tasksClone.sort(
			(a, b) => moment(a.due).valueOf() - moment(b.due).valueOf()
		)
		tasksClone.sort((a, b) => (a.completed ? 1 : -1))
		return tasksClone
	}

	static humanizeDueDate(task: Task): IDue {
		const d = moment(task.due)

		if (task.completed) {
			return ["completed", "Completed"]
		}

		if (d.isBefore(moment(), "year")) {
			return ["overdue", "Overdue"]
		}
		if (moment().isSame(d, "day")) {
			return ["today", "Due today"]
		}
		if (moment().add({ days: 1 }).isSame(d, "day")) {
			return ["tomorrow", "Due tomorrow"]
		}
		if (d.isAfter(moment().add({ days: 1 }))) {
			return ["future", `Due on ${d.format("D MMM")}`]
		}
	}

	static createTask(listId: string, name: string, due: string) {
		const newData: Task = {
			id: GeneralService.randomId(),
			name: name,
			due: due,
			completed: false,
			type: "task",
		}
		const i = data.project.lists.findIndex((e) => e.id === listId)
		data.project.lists[i].children.push(newData)
	}

	static completeTask(
		listId: string,
		taskId: string,
		completed: boolean = true
	) {
		const i = data.project.lists.findIndex((e) => e.id === listId)
		if (i < 0) return
		const iTask = data.project.lists[i].children.findIndex(
			(e) => e.type === "task" && e.id === taskId
		)
		;(data.project.lists[i].children[iTask] as Task).completed = completed
	}

	static deleteTask(task: Task, listId: string) {
		const i = data.project.lists.findIndex((e) => e.id === listId)
		data.project.lists[i].children = data.project.lists[i].children.filter(
			(e) => e.type === "task" && e.id !== task.id
		)
	}

	static updateDue(listId: string, task: Task, newDue: string) {
		const li = data.project.lists.findIndex((e) => e.id === listId)
		if (li < 0) return
		const i = data.project.lists[li].children.findIndex(
			(e) => e.type === "task" && e.id === task.id
		)
		if (i < 0) return
		;(data.project.lists[li].children[i] as Task).due = newDue
	}
}
