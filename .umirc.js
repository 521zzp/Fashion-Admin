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
  "proxy": {
    "/api": {
      "target": "http://192.165.6.235:4100",
      "changeOrigin": true,
    }
  }
};
