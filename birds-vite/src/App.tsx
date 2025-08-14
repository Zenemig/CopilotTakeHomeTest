import { BirdsGrid } from './components/birds/BirdsGrid';
import { useState } from 'react';
import { useBirds } from './hooks/useBirds';
import { useBird } from './hooks/useBird';
import { AppLayout } from './components/layout/AppLayout';
import { Header } from './components/layout/Header';
import { BirdDetails } from './components/birds/BirdDetails';

const App = () => {
	const [selectedBirdId, setSelectedBirdId] = useState<string | null>(null);
	const { loading: birdsLoading, error: birdsError, birds } = useBirds();
	const { bird: selectedBird, loading: birdLoading } = useBird(selectedBirdId);

	const handleBackClick = () => {
		setSelectedBirdId(null);
	};

	const handleAddNoteClick = () => {
		console.log('Add Note clicked');
	};

	if (birds) {
		console.log(birds);
	}
	if (birdLoading) {
		console.log(birdLoading);
	}

	const isDetailView = Boolean(selectedBirdId);

	return (
		<AppLayout>
			<Header
				isDetailView={isDetailView}
				birdName={selectedBird?.english_name}
				onBackClick={handleBackClick}
				onAddNoteClick={handleAddNoteClick}
			/>

			{/* Main Content */}
			<main className="h-full bg-white relative">
				<div className="h-full p-6 overflow-scroll">
					<BirdsGrid 
						birds={birds} 
						loading={birdsLoading} 
						error={birdsError} 
						onBirdClick={setSelectedBirdId} 
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
							<BirdDetails bird={selectedBird || undefined} />
						</div>
					) : null}
				</div>
			</main>
		</AppLayout>
	);
};

export default App;
