const serverUrl = process.env.IP_ADDRESS || 'localhost';

const corsConfig = {
	origin: `http://${serverUrl}:${process.env.FRONTEND_PORT || 5173}`,
	credentials: true,
};

export default corsConfig;
