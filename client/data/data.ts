import { proxy, useSnapshot } from "valtio"

export const EmptyProject: Project = {
	id: "",
	lists: [],
	notes: [],
}

export const SampleProject: Project = {
	id: "",
	notes: [
		{
			type: "note",
			id: "note1",
			title: "Note 1",
			images: [],
			markdown: "## Hi \n**Bold** _Italics_",
		},
		{
			type: "note",
			id: "note2",
			title: "Note 2",
			images: [],
			markdown: "## Hi \n**Bold** _Italics_",
		},
	],
	lists: [
		{
			type: "list",
			id: "design",
			title: "Design",
			note: {
				type: "noteRef",
				note: "note1",
			},
			children: [
				{
					type: "task",
					id: "12345",
					name: "Task 1",
					due: "2021-01-09",
					completed: true,
				},
			],
		},
		{
			type: "list",
			id: "dev",
			title: "Development",
			note: {
				type: "noteRef",
				note: "note2",
			},
			children: [
				{
					type: "task",
					id: "12348",
					name: "Develop Home Screen",
					due: "2021-01-10",
					completed: false,
				},
				{
					type: "list",
					id: "cloud",
					title: "Cloud Services",
					children: [
						{
							type: "task",
							id: "12349",
							name: "Google Cloud",
							due: "2021-01-11",
							completed: false,
						},
					],
				},
			],
		},
	],
}

export const data = proxy({
	project: EmptyProject,
	password: "",
	loggedIn: true,
	loaded: false,
	customCss: "",
})

export const useData = () => useSnapshot(data)
