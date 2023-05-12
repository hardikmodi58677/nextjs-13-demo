import Link from "next/link"
import PocketBase from "pocketbase"
import CreateNote from "./[id]/CreateNote"

// Variables that control the caching behavior of the page
export const dynamic = "auto",
	dynamicParams = true,
	revalidate = 0,
	fetchCache = "auto",
	runtime = "nodejs",
	preferredRegion = "auto"

async function getNotes() {
	// Approach 1: Use PocketBase SDK
	const pb = new PocketBase("http://127.0.0.1:8090")
	const resultList = await pb.collection("notes").getList(1, 30)
	return resultList.items ?? []

	// Approach 2: Use fetch
	// const res = await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
	// 	// cache: "no-cache",
	// })
	// const data = await res.json()
	// return data?.items ?? []
}

export default async function NotesPage() {
	const notes = await getNotes()

	return (
		<>
			<h1>Notes</h1>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "flex-start",
				}}
			>
				{notes.map((note: any) => {
					return <Note key={note.id} note={note} />
				})}
			</div>
			<CreateNote />
		</>
	)
}

function Note(props: any) {
	const { note } = props
	const { id, title, content, created } = note ?? {}
	return (
		<Link href={`/notes/${id}`} className="note">
			<h2>{title}</h2>
			<h5>{content}</h5>
			<p>{created}</p>
		</Link>
	)
}
