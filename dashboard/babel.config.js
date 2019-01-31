/* eslint-disable */
module.exports = {
	presets: [
		'@babel/preset-env',
		'@babel/preset-react',
	],
	plugins: [
    [
      "import",
      {
        "libraryName": "antd",
        "style": "css"
      }
    ],
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", {"loose": true }],
		require('react-hot-loader/babel'),
	],
};
