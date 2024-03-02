import server from './server';

const PORT = process.env.BACKEND_PORT || 4000;

server.listen(PORT, () => {
	console.log('Server is running on port: ', PORT);
});
