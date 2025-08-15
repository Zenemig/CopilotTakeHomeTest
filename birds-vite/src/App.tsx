import { BirdsGrid } from './components/birds/BirdsGrid';
import { useState, useCallback } from 'react';
import { useBirds } from './hooks/useBirds';
import { useBird } from './hooks/useBird';
import { useSearch } from './hooks/useSearch';
import { AppLayout } from './components/layout/AppLayout';
import { Header } from './components/layout/Header';
import { BirdDetails } from './components/birds/BirdDetails';
import { Input } from './components/common/Input';
import { AddNoteModal } from './components/notes/AddNoteModal';

const App = () => {
	const [selectedBirdId, setSelectedBirdId] = useState<string | null>(null);
	const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
	const { loading: birdsLoading, error: birdsError, birds } = useBirds();
	const { bird: selectedBird } = useBird(selectedBirdId);
	
	// Initialize search with birds data
	const { 
		query, 
		setQuery, 
		filteredBirds, 
		isSearching, 
		clearSearch 
	} = useSearch(birds || []);

	// Memoize callback to prevent unnecessary re-renders of BirdCard components
	const handleBirdClick = useCallback((birdId: string) => {
		setSelectedBirdId(birdId);
	}, []);

	const handleBackClick = useCallback(() => {
		setSelectedBirdId(null);
	}, []);

	const handleAddNoteClick = useCallback(() => {
		if (selectedBirdId) {
			setIsAddNoteModalOpen(true);
		}
	}, [selectedBirdId]);

	const isDetailView = Boolean(selectedBirdId);

	return (
		<AppLayout>
			<Header
				isDetailView={isDetailView}
				birdName={selectedBird?.english_name}
				onBackClick={handleBackClick}
				onAddNoteClick={handleAddNoteClick}
			/>

			{/* Content Container - Includes search and grid */}
			<div className="h-full bg-white relative flex flex-col">
				{/* Search Section */}
				<div className="border-b border-border p-6 flex-shrink-0">
					<Input
						type="search"
						value={query}
						onChange={setQuery}
						onClear={clearSearch}
						placeholder="Search for birds"
						isSearching={isSearching}
					/>
				</div>

				{/* Birds Grid */}
				<div className="flex-1 p-6 overflow-y-auto min-h-0">
					<BirdsGrid 
						birds={filteredBirds} 
						loading={birdsLoading} 
						error={birdsError} 
						onBirdClick={handleBirdClick} 
					/>
				</div>
				
				{/* Full-screen Bird Details Overlay */}
				<div 
					className={`absolute inset-0 bg-white transition-transform duration-500 ease-in-out z-10 overflow-hidden ${
						selectedBirdId
							? 'translate-x-0'
							: 'translate-x-full'
					}`}
				>
				{selectedBirdId ? (
					<div className="h-full p-6 overflow-y-auto bg-white">
						<BirdDetails 
							bird={selectedBird || undefined} 
							onAddNoteClick={handleAddNoteClick}
						/>
					</div>
				) : null}
				</div>
			</div>

			{/* Add Note Modal */}
			<AddNoteModal
				isOpen={isAddNoteModalOpen}
				onClose={() => setIsAddNoteModalOpen(false)}
				birdId={selectedBirdId || undefined}
			/>
		</AppLayout>
	);
};

export default App;
