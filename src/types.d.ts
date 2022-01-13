type Child = List | NoteRef

interface NoteRef {
	type: "noteRef"
	note: string
}

interface Task {
	type: "task"
	id: string
	name: string
	due: string
	completed: boolean
}

interface List {
	type: "list"
	id: string
	title: string
	note?: NoteRef
	children: Array<List | NoteRef | Task>
}

interface Note {
	type: "note"
	id: string
	title: string
	markdown: string
	images: Array<string>
}

interface Project {
	id: string
	lists: Array<List>
	notes: Array<Note>
}

type IDue = ["completed" | "overdue" | "today" | "tomorrow" | "future", string]

interface ITask {
	task: Task
	list: string
}
