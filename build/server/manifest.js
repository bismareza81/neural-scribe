const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","robots.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.Clsmtp6S.js",app:"_app/immutable/entry/app.BYOW-eT4.js",imports:["_app/immutable/entry/start.Clsmtp6S.js","_app/immutable/chunks/CDTg-29K.js","_app/immutable/chunks/CIjs2MpQ.js","_app/immutable/entry/app.BYOW-eT4.js","_app/immutable/chunks/CIjs2MpQ.js","_app/immutable/chunks/D2Yxezly.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BWPuQZDj.js')),
			__memo(() => import('./chunks/1-_5YcS1F-.js')),
			__memo(() => import('./chunks/2-BIJop2f-.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
