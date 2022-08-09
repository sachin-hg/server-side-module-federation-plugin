const map = {
  app2: 'http://localhost:8080/server/app2.js',
  app3: 'http://localhost:8081/server/app3.js'
}
const load = (url) => {
  global.__message = function(abc) {return abc};
  /******/ 			console.log(url, '3345234523');return new Promise((resolve, reject) => {
    const req = __non_webpack_require__
    /******/ 				var filename = req("path").basename(url);
    /******/ 				var protocol = req("url").parse(url).protocol.replace(':', '');
    /******/ 				if (!protocol.startsWith("http")) { return reject() }
    /******/ 				req(protocol).get(url, "utf-8", function (res) {
      /******/ 					var statusCode = res.statusCode;
      /******/ 					res.setEncoding("utf8");
      /******/ 					let content = "";
      /******/ 					if (statusCode !== 200) {
        /******/ 						return reject(new Error("Request Failed. Status Code: " + statusCode));
        /******/ 					}
      /******/ 					res.on("data", (c) => {
        /******/ 						content += c;
        /******/ 					});
      /******/ 					res.on("end", () => {
        /******/ 						if (statusCode === 200) {
          /******/ 							let chunk = { exports: {} };console.log(chunk.exports,req,chunk,req("path").dirname(filename),filename);
          /******/ 							req("vm").runInThisContext("(function(exports, require, module, __filename, __dirname){"+content+"}\n)", filename)(
            /******/ 								chunk.exports,req,chunk,req("path").dirname(filename),filename
            /******/ 							);
          /******/ 							resolve(chunk.exports);
          /******/ 						}
        /******/ 					});
      /******/ 				});
    /******/ 			})
  /******/ 		}
function loadComponent (scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    /* eslint no-undef:off */
    await __webpack_init_sharing__('default')
    // const container = __non_webpack_require__(`/Users/sachinagrawal/projects/server-side-module-federation-plugin/packages/${scope}/dist/server/${scope}.js`) // or get the container somewhere else
    const container = await load(map[scope])
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default)
    const factory = await container.get(module)
    const Module = factory()
    return Module
  }
}

const test = async (req, res) => {
  const scope = req.path.includes('app2') ? 'app2' : 'app3'
  console.log(req.path, scope)
  return await loadComponent(scope, './message')().then(module => console.log(module.default))
}
export default async function initRenderMiddleware(app) {
  app.get('/app/:type', test)
  app.get("/*", async (req, res, next) => {
    // always refresh the renderer implementation
    const { html } = (await import("./renderer")).default();
    delete require.cache[require.resolve("./renderer")];
    res.send(html);
  });
}
