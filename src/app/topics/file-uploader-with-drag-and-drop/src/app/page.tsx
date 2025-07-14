"use client";
import React from "react";
import FilePreviewModal from "./components/modal";

export default function Home() {
	const [isDragActive, setIsDragActive] = React.useState<boolean>();
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [files, setFiles] = React.useState<FileList | null>(null);
	const [showModal, setShowModal] = React.useState<boolean>(false);

	const handleClickFileUpload = () => {
		if (inputRef?.current) {
			inputRef?.current?.click();
		}
	};

	const handleClickInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFiles = e.target.files;
		if (selectedFiles && selectedFiles.length > 0) {
			// Create a deep copy of the FileList by converting to array and back
			const fileArray = Array.from(selectedFiles);
			const dt = new DataTransfer();
			fileArray.forEach((file) => dt.items.add(file));
			setFiles(dt.files);
			setShowModal(true);
		}
		e.target.value = ""; // Reset input value to allow re-uploading the same file
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);

		if (inputRef?.current) {
			const files = e.dataTransfer.files;
			if (files.length > 0) {
				inputRef.current.files = files;
				setFiles(files);
				setShowModal(true);
			}
		}
	};

	return (
		<div className="flex items-center justify-center flex-col min-h-screen gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<h1>This is my file uploader practice module</h1>

			<input
				type="file"
				// accept="image/*"
				multiple
				onChange={handleClickInputChange}
				ref={inputRef}
				className="hidden"
			/>

			<div
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onClick={handleClickFileUpload}
				className={`flex items-center justify-center h-[500px] w-[500px] border border-dashed cursor-pointer rounded-lg ${
					isDragActive ? "bg-gray-200" : "bg-white"
				}`}
			>
				Drag and drop files here or click to upload.
			</div>

			{showModal && (
				<FilePreviewModal files={files} onClose={() => setShowModal(false)} />
			)}
		</div>
	);
}
