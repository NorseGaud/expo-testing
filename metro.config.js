const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// config.watcher.healthCheck = {
//   timeout: 10000,
// };

module.exports = config;