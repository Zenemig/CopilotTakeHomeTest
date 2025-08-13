import { useQuery } from '@apollo/client';
import { GET_BIRDS } from './services/graphql/queries';
import type { GetBirdsData } from './types';

const App = () => {
	const { loading, error, data } = useQuery<GetBirdsData>(GET_BIRDS);

	if (loading) return <div className="p-4 text-center">Loading birds...</div>;
	if (error) return <div className="p-4 text-center text-red-600">Error: {error.message}</div>;

	return (
		<div className="min-h-screen bg-gray-50 p-4">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Birds</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{data?.birds.map((bird) => (
						<div
							key={bird.id}
							className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4"
						>
							<h3 className="font-semibold text-lg">{bird.english_name}</h3>
							<p className="text-gray-600 italic">{bird.latin_name}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
