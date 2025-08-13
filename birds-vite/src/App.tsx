import { useState } from 'react';
import { useBirds } from './hooks/useBirds';
import { useBird } from './hooks/useBird';

const App = () => {
	const [selectedBirdId, setSelectedBirdId] = useState<string | null>(null);
	const { loading: birdsLoading, error: birdsError, birds } = useBirds();
	const { bird: selectedBird, loading: birdLoading, error: birdError } = useBird(selectedBirdId);

	const handleBirdClick = (birdId: string) => {
		setSelectedBirdId(birdId);
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{birds.map((bird) => (
						<div
							key={bird.id}
							onClick={() => handleBirdClick(bird.id)}
							className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
						>
							<h3 className="font-semibold text-lg">{bird.english_name}</h3>
							<p className="text-gray-600 italic">{bird.latin_name}</p>
							{selectedBirdId === bird.id && birdLoading ? (
								<p className="text-blue-600 text-sm mt-2">Loading details...</p>
							) : null}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
