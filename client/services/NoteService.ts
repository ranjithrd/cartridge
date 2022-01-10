import { data } from "../data/data"

export class NoteService {
	static findNote(ref: NoteRef, liveData?: Project): Note {
		const proj = liveData ?? data.project
		const i = proj.notes.findIndex((e) => e.id === ref.note)
		return proj.notes[i]
	}
	static updateNote(
		ref: NoteRef,
		updatedMd?: string,
		updatedImgs?: string[]
	) {
		const i = data.project.notes.findIndex((e) => e.id === ref.note)
		if (i < 0) return
		data.project.notes[i] = {
			...data.project.notes[i],
			markdown: updatedMd,
			images: updatedImgs,
		}
	}
}
