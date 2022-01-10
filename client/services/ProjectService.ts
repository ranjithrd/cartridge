import { data } from "../data/data"
import { GeneralService } from "./GeneralService"

export class ProjectService {
	static getProject() {
		return data.project
	}

	static updateList(listId: string, newTitle: string) {
		const i = data.project.lists.findIndex((e) => e.id === listId)
		data.project.lists[i] = {
			...data.project.lists[i],
			title: newTitle,
		}
	}

	static createList(title: string) {
		const id = GeneralService.randomId()
		data.project.lists.push({
			id: id,
			children: [],
			type: "list",
			title: title,
		})
		return id
	}

	static deleteList(id: string) {
		data.project.lists = data.project.lists.filter((e) => e.id !== id)
	}
}
