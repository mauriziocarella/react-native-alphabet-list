/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const lib = path.resolve(__dirname, '..');

module.exports = {
	watchFolders: [path.resolve(__dirname, 'node_modules'), lib],
	resolver: {
		blacklistRE: blacklist([
			new RegExp(`${lib}/node_modules/react-native/.*`),
		]),
	},
	transformer: {
		getTransformOptions: async () => ({
			transform: {
				experimentalImportSupport: false,
				inlineRequires: false,
			},
		}),
	},
};