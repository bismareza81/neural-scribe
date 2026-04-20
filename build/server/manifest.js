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
		client: {start:"_app/immutable/entry/start.C1Y4KD9r.js",app:"_app/immutable/entry/app.BlVZgl0v.js",imports:["_app/immutable/entry/start.C1Y4KD9r.js","_app/immutable/chunks/D4iWnqrQ.js","_app/immutable/chunks/CIjs2MpQ.js","_app/immutable/entry/app.BlVZgl0v.js","_app/immutable/chunks/CIjs2MpQ.js","_app/immutable/chunks/D2Yxezly.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-BWPuQZDj.js')),
			__memo(() => import('./chunks/1-CWsZJ5oU.js')),
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
