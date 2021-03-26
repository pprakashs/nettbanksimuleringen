const withPlugins = require('next-compose-plugins');
const images = require('next-images');

const nextConfig = {
	webpack: (config, { isServer }) => {
		return config;
	},
};

module.exports = withPlugins([[images]], nextConfig);
