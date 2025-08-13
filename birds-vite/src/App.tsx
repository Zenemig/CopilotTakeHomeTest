import { useState } from 'react';
import { useBirds } from './hooks/useBirds';
import { useBird } from './hooks/useBird';
import { useAddNote } from './hooks/useAddNote';
import { useSearch } from './hooks/useSearch';
import { WatermarkedImage } from './components/common/WatermarkedImage';

const App = () => {
	const [selectedBirdId, setSelectedBirdId] = useState<string | null>(null);
	const [noteText, setNoteText] = useState('');
	const { loading: birdsLoading, error: birdsError, birds } = useBirds();
	const { query, setQuery, filteredBirds, isSearching, clearSearch } = useSearch(birds);
	const { bird: selectedBird, loading: birdLoading, error: birdError } = useBird(selectedBirdId);
	const { submitNote, loading: addingNote, error: addNoteError } = useAddNote();

	const handleBirdClick = (birdId: string) => {
		setSelectedBirdId(birdId);
		setNoteText(''); // Clear note form when selecting a new bird
	};

	const handleSubmitNote = async () => {
		if (!selectedBirdId || !noteText.trim()) return;
		
		try {
			await submitNote(selectedBirdId, noteText.trim());
			setNoteText(''); // Clear form on success
			console.log('Note added successfully!');
		} catch (error) {
			console.error('Failed to add note:', error);
		}
	};

	if (selectedBird) {
		console.log('Selected Bird Details:', selectedBird);
	}

	if (birdError) {
		console.error('Error loading bird details:', birdError);
	}

	if (birdsLoading) return <div className="p-4 text-center">Loading birds...</div>;
	if (birdsError) return <div className="p-4 text-center text-red-600">Error: {birdsError.message}</div>;

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Birds</h1>
				
				{/* Search Bar */}
				<div className="mb-6">
					<div className="relative">
						<input
							type="text"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search birds by English or Latin name..."
							className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
						{query && (
							<button
								onClick={clearSearch}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								✕
							</button>
						)}
					</div>
					<div className="mt-2 text-sm text-gray-600">
						{isSearching ? (
							<span className="text-blue-600">Searching...</span>
						) : (
							<span>
								{query ? `Found ${filteredBirds.length} of ${birds.length} birds` : `Showing all ${birds.length} birds`}
							</span>
						)}
					</div>
				</div>
				
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filteredBirds.map((bird) => (
						<div
							key={bird.id}
							onClick={() => handleBirdClick(bird.id)}
							className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
						>
							{bird.thumb_url ? (
								<WatermarkedImage
									src={bird.thumb_url}
									alt={bird.english_name}
									className="w-full object-cover rounded mb-3"
									loading="lazy"
								/>
							) : null}
							<h3 className="font-semibold text-lg">{bird.english_name}</h3>
							<p className="text-gray-600 italic">{bird.latin_name}</p>
							
							{/* Show loading state */}
							{selectedBirdId === bird.id && birdLoading ? (
								<p className="text-blue-600 text-sm mt-2">Loading details...</p>
							) : null}
							
							{/* Show bird details and note form when selected */}
							{selectedBirdId === bird.id && selectedBird ? (
								<div className="mt-4 border-t pt-4">
									<div className="mb-4">
										<h4 className="font-semibold text-sm text-gray-700 mb-2">Bird Details:</h4>
										<p className="text-xs text-gray-600">ID: {selectedBird.id}</p>
										{selectedBird.image_url ? (
											<WatermarkedImage 
												src={selectedBird.image_url} 
												alt={selectedBird.english_name}
												className="w-full object-cover rounded mt-2"
											/>
										) : null}
									</div>
									
									<div className="mb-4">
										<h4 className="font-semibold text-sm text-gray-700 mb-2">
											Existing Notes ({selectedBird.notes.length}):
										</h4>
										{selectedBird.notes.length > 0 ? (
											<div className="max-h-24 overflow-y-auto">
												{selectedBird.notes.map((note) => (
													<div key={note.id} className="text-xs text-gray-600 mb-1 p-1 bg-gray-50 rounded">
														{note.comment} - {new Date(note.timestamp * 1000).toLocaleDateString()}
													</div>
												))}
											</div>
										) : (
											<p className="text-xs text-gray-500">No notes yet</p>
										)}
									</div>
									
									<div>
										<h4 className="font-semibold text-sm text-gray-700 mb-2">Add New Note:</h4>
										<textarea
											value={noteText}
											onChange={(e) => setNoteText(e.target.value)}
											placeholder="Enter your note here..."
											className="w-full p-2 text-xs border rounded resize-none"
											rows={3}
											disabled={addingNote}
										/>
										<button
											onClick={handleSubmitNote}
											disabled={!noteText.trim() || addingNote}
											className="mt-2 w-full bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
										>
											{addingNote ? 'Adding...' : 'Add Note'}
										</button>
										{addNoteError && (
											<p className="text-xs text-red-600 mt-1">Error: {addNoteError.message}</p>
										)}
									</div>
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
