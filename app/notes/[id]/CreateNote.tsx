"use client"

import { useState } from "react"
import PocketBase from "pocketbase"
import { useRouter } from "next/navigation"

export default function CreateNote() {
	const [title, setTitle] = useState("")
	const [content, setContent] = useState("")
	const router = useRouter()

	const handleCreateNote = async () => {
		const pb = new PocketBase("http://localhost:8090")
		await pb.collection("notes").create({
			title,
			content,
		})
		setContent("")
		setTitle("")
		router.refresh()
	}

	return (
		<form onSubmit={handleCreateNote}>
			<h3>Create Note</h3>
			<label htmlFor="title">Title</label>
			<input
				type="text"
				id="title"
				name="title"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label htmlFor="content">Content</label>
			<textarea
				id="content"
				name="content"
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<button type="submit">Create note</button>
		</form>
	)
}
