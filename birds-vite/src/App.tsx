import { useState } from 'react';
import { useBirds } from './hooks/useBirds';
import { useBird } from './hooks/useBird';
import { AppLayout } from './components/layout/AppLayout';
import { Header } from './components/layout/Header';

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
			<main className="h-full bg-white p-6 overflow-scroll">
				{birdsLoading ? <div className="p-4 text-center">Loading birds...</div> : null}
				{birdsError ? <div className="p-4 text-center text-red-600">Error: {birdsError.message}</div> : null}
				{birds && birds.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{birds.map((bird) => (
							<div key={bird.id} onClick={() => setSelectedBirdId(bird.id)} className="cursor-pointer">
								<img src={bird.thumb_url} alt={bird.english_name} />
								<h2>{bird.english_name}</h2>
							</div>
						))}
					</div>
				) : null}
			</main>
		</AppLayout>
	);
};

export default App;
