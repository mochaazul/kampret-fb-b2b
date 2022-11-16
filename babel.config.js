module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
				alias: {
					'^@app/(.+)': './src/\\1',
					'@components': './src/components',
					'@constant': './src/constant',
					'@helpers': './src/helpers',
					'@router': './src/router',
					'@store': './src/store',
					'@interfaces': './src/interfaces',
					'@assets/*': './src/assets/*',
					'@validator': './src/validator',
					'@utils': './src/utils',
					'@screens': './src/screens',
					'@config': './src/config',
				},
			},
		],
	],
};
