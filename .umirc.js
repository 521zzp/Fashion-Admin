var path = require('path')


function resolve (dir) {
  return path.join(__dirname, dir)
}

export default {
  alias: {
    '@': resolve('src')
  },
  plugins: [
    ['umi-plugin-react',{
			antd: true,
			polyfills: ['ie9'],
			dva: {
				immer: true,
			},
      routes: {
        exclude: [/models\//],
      },
		}
    ],
  ],
};
