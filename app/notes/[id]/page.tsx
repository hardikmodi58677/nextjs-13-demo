// import PocketBase from "pocketbase"

async function getNote(noteId: string) {
	// Approach 1: Get the note by ID using pocketbase api
	const res = await fetch(`http://localhost:8090/api/collections/notes/records/${noteId}`, {
		next: { revalidate: 10 },
	})
	const note = await res.json()
	return note

	// Approach 2: Get the note by ID using pocketbase sdk
	// const pb = new PocketBase("http://localhost:8090")
	// const note = await pb.collection("notes").getOne(noteId)
	// return note
}

export default async function NotePage({ params }: any) {
	const note = await getNote(params.id)

	return (
		<div>
			<h1>{`notes/${params.id}`}</h1>
			<div className={"note"}>
				<h3>{note.title}</h3>
				<h5>{note.content}</h5>
				<p>{note.created}</p>
			</div>
		</div>
	)
}
