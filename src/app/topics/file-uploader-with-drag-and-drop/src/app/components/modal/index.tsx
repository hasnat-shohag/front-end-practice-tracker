export default function FilePreviewModal({
	files,
	onClose,
}: {
	files: FileList | null;
	onClose: () => void;
}) {
	const handlePreview = (file: File) => {
		const url = URL.createObjectURL(file);
		window.open(url, "_blank");
		// Clean up the URL after a short delay to prevent memory leaks
		setTimeout(() => URL.revokeObjectURL(url), 100);
	};

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div
			onClick={handleBackDropClick}
			className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
		>
			<div className="bg-white p-6 rounded-lg shadow-xl min-w-lg max-w-2xl max-h-[80vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">Selected Files</h2>
					<button
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700 text-2xl"
					>
						×
					</button>
				</div>

				{files && files.length > 0 ? (
					<div className="space-y-3">
						<p className="text-sm text-gray-600 mb-4">
							{files.length} file{files.length > 1 ? "s" : ""} selected
						</p>
						{Array.from(files).map((file, index) => (
							<div
								key={index}
								className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
							>
								<div className="flex-1 min-w-0">
									<p className="font-medium text-sm truncate">{file.name}</p>
									<p className="text-xs text-gray-500">
										{formatFileSize(file.size)} • {file.type || "Unknown type"}
									</p>
								</div>
								<button
									onClick={() => handlePreview(file)}
									className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
								>
									Preview
								</button>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-gray-500 py-8">No files selected.</p>
				)}

				<div className="flex justify-end mt-6">
					<button
						onClick={onClose}
						className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
