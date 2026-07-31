
  var Module = typeof Module != 'undefined' ? Module : {};

  Module['expectedDataFileDownloads'] ??= 0;
  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    var isNode = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = '/home/runner/work/recipes/recipes/output/bld/rattler-build_cocoa5_1784567883/host_env_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold/bin/CoCoAInterpreter.data';
      var REMOTE_PACKAGE_BASE = 'CoCoAInterpreter.data';
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (isNode) {
          require('fs').readFile(packageName, (err, contents) => {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        Module['dataFileDownloads'] ??= {};
        fetch(packageName)
          .catch((cause) => Promise.reject(new Error(`Network Error: ${packageName}`, {cause}))) // If fetch fails, rewrite the error to include the failing URL & the cause.
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(new Error(`${response.status}: ${response.url}`));
            }

            if (!response.body && response.arrayBuffer) { // If we're using the polyfill, readers won't be available...
              return response.arrayBuffer().then(callback);
            }

            const reader = response.body.getReader();
            const iterate = () => reader.read().then(handleChunk).catch((cause) => {
              return Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`, {cause}));
            });

            const chunks = [];
            const headers = response.headers;
            const total = Number(headers.get('Content-Length') ?? packageSize);
            let loaded = 0;

            const handleChunk = ({done, value}) => {
              if (!done) {
                chunks.push(value);
                loaded += value.length;
                Module['dataFileDownloads'][packageName] = {loaded, total};

                let totalLoaded = 0;
                let totalSize = 0;

                for (const download of Object.values(Module['dataFileDownloads'])) {
                  totalLoaded += download.loaded;
                  totalSize += download.total;
                }

                Module['setStatus']?.(`Downloading data... (${totalLoaded}/${totalSize})`);
                return iterate();
              } else {
                const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
                let offset = 0;
                for (const chunk of chunks) {
                  packageData.set(chunk, offset);
                  offset += chunk.length;
                }
                callback(packageData.buffer);
              }
            };

            Module['setStatus']?.('Downloading data...');
            return iterate();
          });
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (data) => {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "src", true, true);
Module['FS_createPath']("/src", "CoCoA-5", true, true);
Module['FS_createPath']("/src/CoCoA-5", "CoCoAManual", true, true);
Module['FS_createPath']("/src/CoCoA-5/CoCoAManual", "aux-files", true, true);
Module['FS_createPath']("/src/CoCoA-5/CoCoAManual/aux-files", "GUI-extra-files", true, true);
Module['FS_createPath']("/src/CoCoA-5/CoCoAManual/aux-files", "TeX-extra-files", true, true);
Module['FS_createPath']("/src/CoCoA-5", "packages", true, true);
Module['FS_createPath']("/src/CoCoA-5", "tests", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_/home/runner/work/recipes/recipes/output/bld/rattler-build_cocoa5_1784567883/host_env_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold/bin/CoCoAInterpreter.data');

      };
      Module['addRunDependency']('datafile_/home/runner/work/recipes/recipes/output/bld/rattler-build_cocoa5_1784567883/host_env_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold/bin/CoCoAInterpreter.data');

      Module['preloadResults'] ??= {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      (Module['preRun'] ??= []).push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/src/CoCoA-5/CoCoAManual/CoCoAHelp.xml", "start": 0, "end": 927476}, {"filename": "/src/CoCoA-5/CoCoAManual/Makefile", "start": 927476, "end": 929903}, {"filename": "/src/CoCoA-5/CoCoAManual/README", "start": 929903, "end": 933483}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/bugs.html", "start": 933483, "end": 937679}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/completion.html", "start": 937679, "end": 943777}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/history.html", "start": 943777, "end": 948184}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/index.html", "start": 948184, "end": 950027}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/menus.html", "start": 950027, "end": 959290}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/notes.html", "start": 959290, "end": 961886}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/shortcuts.html", "start": 961886, "end": 970868}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/toolbars.html", "start": 970868, "end": 975474}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI-extra-files/uih.html", "start": 975474, "end": 978576}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/GUI_help.xsl", "start": 978576, "end": 1004798}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/TeX-extra-files/mybook.cls", "start": 1004798, "end": 1028805}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/TeX.xsl", "start": 1028805, "end": 1039491}, {"filename": "/src/CoCoA-5/CoCoAManual/aux-files/saxon.jar", "start": 1039491, "end": 1669635}, {"filename": "/src/CoCoA-5/packages/ApproxSolve.cpkg5", "start": 1669635, "end": 1679063}, {"filename": "/src/CoCoA-5/packages/BackwardCompatible.cpkg5", "start": 1679063, "end": 1686490}, {"filename": "/src/CoCoA-5/packages/BinRepr.cpkg5", "start": 1686490, "end": 1690398}, {"filename": "/src/CoCoA-5/packages/BringIn.cpkg5", "start": 1690398, "end": 1693255}, {"filename": "/src/CoCoA-5/packages/CantStop.cpkg5", "start": 1693255, "end": 1707765}, {"filename": "/src/CoCoA-5/packages/CoLA.cpkg5", "start": 1707765, "end": 1715829}, {"filename": "/src/CoCoA-5/packages/DesignOfExperiments.cpkg5", "start": 1715829, "end": 1727958}, {"filename": "/src/CoCoA-5/packages/EdgeIdeals.cpkg5", "start": 1727958, "end": 1782001}, {"filename": "/src/CoCoA-5/packages/FoldString.cpkg5", "start": 1782001, "end": 1783644}, {"filename": "/src/CoCoA-5/packages/GeomModelling.cpkg5", "start": 1783644, "end": 1789603}, {"filename": "/src/CoCoA-5/packages/GroebnerFan.cpkg5", "start": 1789603, "end": 1803479}, {"filename": "/src/CoCoA-5/packages/LinearSimplify.cpkg5", "start": 1803479, "end": 1809675}, {"filename": "/src/CoCoA-5/packages/MatNormalForm.cpkg5", "start": 1809675, "end": 1844282}, {"filename": "/src/CoCoA-5/packages/NotBuiltin.cpkg5", "start": 1844282, "end": 1863768}, {"filename": "/src/CoCoA-5/packages/OperationCommunication.cpkg5", "start": 1863768, "end": 1910434}, {"filename": "/src/CoCoA-5/packages/PrimaryDecompositionGTZ0.cpkg5", "start": 1910434, "end": 1916136}, {"filename": "/src/CoCoA-5/packages/RationalPoints.cpkg5", "start": 1916136, "end": 1922052}, {"filename": "/src/CoCoA-5/packages/RealRoots.cpkg5", "start": 1922052, "end": 1935350}, {"filename": "/src/CoCoA-5/packages/RelNotes.cpkg5", "start": 1935350, "end": 1956134}, {"filename": "/src/CoCoA-5/packages/StatStagedTrees.cpkg5", "start": 1956134, "end": 1961638}, {"filename": "/src/CoCoA-5/packages/TmpImplicit.cpkg5", "start": 1961638, "end": 1978705}, {"filename": "/src/CoCoA-5/packages/TypeVectors.cpkg5", "start": 1978705, "end": 1990813}, {"filename": "/src/CoCoA-5/packages/apolarity.cpkg5", "start": 1990813, "end": 1995068}, {"filename": "/src/CoCoA-5/packages/arrangements.cpkg5", "start": 1995068, "end": 2019980}, {"filename": "/src/CoCoA-5/packages/coclib.cpkg5", "start": 2019980, "end": 2045345}, {"filename": "/src/CoCoA-5/packages/combinatoria.cpkg5", "start": 2045345, "end": 2050065}, {"filename": "/src/CoCoA-5/packages/empty.cpkg5", "start": 2050065, "end": 2050906}, {"filename": "/src/CoCoA-5/packages/experimental.cpkg5", "start": 2050906, "end": 2066351}, {"filename": "/src/CoCoA-5/packages/hilop.cpkg5", "start": 2066351, "end": 2076273}, {"filename": "/src/CoCoA-5/packages/hp.cpkg5", "start": 2076273, "end": 2092804}, {"filename": "/src/CoCoA-5/packages/init.cocoa5", "start": 2092804, "end": 2092830}, {"filename": "/src/CoCoA-5/packages/io.cpkg5", "start": 2092830, "end": 2094705}, {"filename": "/src/CoCoA-5/packages/latex.cpkg5", "start": 2094705, "end": 2099225}, {"filename": "/src/CoCoA-5/packages/list.cpkg5", "start": 2099225, "end": 2109022}, {"filename": "/src/CoCoA-5/packages/mat.cpkg5", "start": 2109022, "end": 2128863}, {"filename": "/src/CoCoA-5/packages/maximal.cpkg5", "start": 2128863, "end": 2137761}, {"filename": "/src/CoCoA-5/packages/misc.cpkg5", "start": 2137761, "end": 2161595}, {"filename": "/src/CoCoA-5/packages/monomial_ideals.cpkg5", "start": 2161595, "end": 2172178}, {"filename": "/src/CoCoA-5/packages/obsolescent.cpkg5", "start": 2172178, "end": 2190247}, {"filename": "/src/CoCoA-5/packages/plot.cpkg5", "start": 2190247, "end": 2193459}, {"filename": "/src/CoCoA-5/packages/points.cpkg5", "start": 2193459, "end": 2201384}, {"filename": "/src/CoCoA-5/packages/posets.cpkg5", "start": 2201384, "end": 2209481}, {"filename": "/src/CoCoA-5/packages/primary.cpkg5", "start": 2209481, "end": 2219691}, {"filename": "/src/CoCoA-5/packages/prototype-EvalPolyInterval.cpkg5", "start": 2219691, "end": 2222992}, {"filename": "/src/CoCoA-5/packages/prototype-GBZZ.cpkg5", "start": 2222992, "end": 2235831}, {"filename": "/src/CoCoA-5/packages/radical.cpkg5", "start": 2235831, "end": 2272527}, {"filename": "/src/CoCoA-5/packages/regularity.cpkg5", "start": 2272527, "end": 2275676}, {"filename": "/src/CoCoA-5/packages/sppoly.cpkg5", "start": 2275676, "end": 2278758}, {"filename": "/src/CoCoA-5/packages/subalgebra.cpkg5", "start": 2278758, "end": 2281431}, {"filename": "/src/CoCoA-5/packages/taylor.cpkg5", "start": 2281431, "end": 2284841}, {"filename": "/src/CoCoA-5/packages/thmproving.cpkg5", "start": 2284841, "end": 2306134}, {"filename": "/src/CoCoA-5/packages/toric.cpkg5", "start": 2306134, "end": 2313004}, {"filename": "/src/CoCoA-5/packages/verbosity.cpkg5", "start": 2313004, "end": 2313816}, {"filename": "/src/CoCoA-5/tests/AnonFunc.cocoa5", "start": 2313816, "end": 2316243}, {"filename": "/src/CoCoA-5/tests/AnonFunc.out", "start": 2316243, "end": 2316772}, {"filename": "/src/CoCoA-5/tests/ErrMesg.cocoa5", "start": 2316772, "end": 2317784}, {"filename": "/src/CoCoA-5/tests/ErrMesg.out", "start": 2317784, "end": 2318313}, {"filename": "/src/CoCoA-5/tests/ExtLibNORMALIZ.cocoa5", "start": 2318313, "end": 2319218}, {"filename": "/src/CoCoA-5/tests/ExtLibNORMALIZ.out", "start": 2319218, "end": 2319736}, {"filename": "/src/CoCoA-5/tests/INACTIVE-packages.cocoa5", "start": 2319736, "end": 2321118}, {"filename": "/src/CoCoA-5/tests/INACTIVE-parameters.cocoa5", "start": 2321118, "end": 2322405}, {"filename": "/src/CoCoA-5/tests/INACTIVE-protection.cocoa5", "start": 2322405, "end": 2323015}, {"filename": "/src/CoCoA-5/tests/Makefile", "start": 2323015, "end": 2329221}, {"filename": "/src/CoCoA-5/tests/RealRoots.cocoa5", "start": 2329221, "end": 2329404}, {"filename": "/src/CoCoA-5/tests/RunTests.sh", "start": 2329404, "end": 2333502}, {"filename": "/src/CoCoA-5/tests/SourceAnna.cocoa5", "start": 2333502, "end": 2333579}, {"filename": "/src/CoCoA-5/tests/SourceAnna.out", "start": 2333579, "end": 2333982}, {"filename": "/src/CoCoA-5/tests/TutHokkaido2.cocoa5", "start": 2333982, "end": 2341021}, {"filename": "/src/CoCoA-5/tests/TutHokkaido2.out", "start": 2341021, "end": 2343975}, {"filename": "/src/CoCoA-5/tests/TutHokkaido3.cocoa5", "start": 2343975, "end": 2352857}, {"filename": "/src/CoCoA-5/tests/TutHokkaido3.out", "start": 2352857, "end": 2355134}, {"filename": "/src/CoCoA-5/tests/TutHokkaido4.cocoa5", "start": 2355134, "end": 2366388}, {"filename": "/src/CoCoA-5/tests/TutHokkaido4.out", "start": 2366388, "end": 2379385}, {"filename": "/src/CoCoA-5/tests/TutHokkaido5.cocoa5", "start": 2379385, "end": 2389188}, {"filename": "/src/CoCoA-5/tests/TutHokkaido5.out", "start": 2389188, "end": 2395520}, {"filename": "/src/CoCoA-5/tests/anna.cocoa5", "start": 2395520, "end": 2414611}, {"filename": "/src/CoCoA-5/tests/bug-EvalTwice.cocoa5", "start": 2414611, "end": 2418133}, {"filename": "/src/CoCoA-5/tests/bug-GBasisSelfSat.cocoa5", "start": 2418133, "end": 2418462}, {"filename": "/src/CoCoA-5/tests/demo-GeMiTo2011.cocoa5", "start": 2418462, "end": 2420374}, {"filename": "/src/CoCoA-5/tests/demo-GeMiTo2011.out", "start": 2420374, "end": 2420796}, {"filename": "/src/CoCoA-5/tests/demo-Osaka2015.cocoa5", "start": 2420796, "end": 2427819}, {"filename": "/src/CoCoA-5/tests/demo-Osaka2015.out", "start": 2427819, "end": 2452213}, {"filename": "/src/CoCoA-5/tests/exbugs.cocoa5", "start": 2452213, "end": 2465301}, {"filename": "/src/CoCoA-5/tests/exbugs.out", "start": 2465301, "end": 2465763}, {"filename": "/src/CoCoA-5/tests/exsegv.cocoa5", "start": 2465763, "end": 2467138}, {"filename": "/src/CoCoA-5/tests/exsegv.out", "start": 2467138, "end": 2467596}, {"filename": "/src/CoCoA-5/tests/lecture-HF1.cocoa5", "start": 2467596, "end": 2471022}, {"filename": "/src/CoCoA-5/tests/lecture-HF1.out", "start": 2471022, "end": 2473645}, {"filename": "/src/CoCoA-5/tests/lecture-HF2.cocoa5", "start": 2473645, "end": 2479009}, {"filename": "/src/CoCoA-5/tests/lecture-HF2.out", "start": 2479009, "end": 2479494}, {"filename": "/src/CoCoA-5/tests/lecture-HF3.cocoa5", "start": 2479494, "end": 2484430}, {"filename": "/src/CoCoA-5/tests/lecture-HF3.out", "start": 2484430, "end": 2485470}, {"filename": "/src/CoCoA-5/tests/lecture-HF4.cocoa5", "start": 2485470, "end": 2495074}, {"filename": "/src/CoCoA-5/tests/lecture-HF4.out", "start": 2495074, "end": 2497967}, {"filename": "/src/CoCoA-5/tests/primary.cocoa5", "start": 2497967, "end": 2499895}, {"filename": "/src/CoCoA-5/tests/primary.out", "start": 2499895, "end": 2500700}, {"filename": "/src/CoCoA-5/tests/quine.cocoa5", "start": 2500700, "end": 2500873}, {"filename": "/src/CoCoA-5/tests/quine.out", "start": 2500873, "end": 2501044}, {"filename": "/src/CoCoA-5/tests/tagging.cocoa5", "start": 2501044, "end": 2502331}, {"filename": "/src/CoCoA-5/tests/tagging.out", "start": 2502331, "end": 2504177}, {"filename": "/src/CoCoA-5/tests/test-ApproxSolve.cocoa5", "start": 2504177, "end": 2520081}, {"filename": "/src/CoCoA-5/tests/test-ArrAndPosets.cocoa5", "start": 2520081, "end": 2540081}, {"filename": "/src/CoCoA-5/tests/test-FactorAlgExt.cocoa5", "start": 2540081, "end": 2548462}, {"filename": "/src/CoCoA-5/tests/test-GB.cocoa5", "start": 2548462, "end": 2551565}, {"filename": "/src/CoCoA-5/tests/test-HomomorphismOps.cocoa5", "start": 2551565, "end": 2557093}, {"filename": "/src/CoCoA-5/tests/test-PrimaryDecomposition0.cocoa5", "start": 2557093, "end": 2568474}, {"filename": "/src/CoCoA-5/tests/test-RingElems.cocoa5", "start": 2568474, "end": 2569698}, {"filename": "/src/CoCoA-5/tests/test-implicit.cocoa5", "start": 2569698, "end": 2570435}, {"filename": "/src/CoCoA-5/tests/test-manual.cocoa5", "start": 2570435, "end": 2570477}, {"filename": "/src/CoCoA-5/tests/test-manual.out", "start": 2570477, "end": 2572440}, {"filename": "/src/CoCoA-5/tests/test-output.cocoa5", "start": 2572440, "end": 2573645}, {"filename": "/src/CoCoA-5/tests/test-radical.cocoa5", "start": 2573645, "end": 2581299}, {"filename": "/src/CoCoA-5/tests/test-radical0.cocoa5", "start": 2581299, "end": 2584979}, {"filename": "/src/CoCoA-5/tests/test-saturate.cocoa5", "start": 2584979, "end": 2593813}, {"filename": "/src/CoCoA-5/tests/test-syz.cocoa5", "start": 2593813, "end": 2596164}, {"filename": "/src/CoCoA-5/tests/test-toric.cocoa5", "start": 2596164, "end": 2597190}, {"filename": "/src/CoCoA-5/tests/tricky-references.cocoa5", "start": 2597190, "end": 2597652}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA1.cocoa5", "start": 2597652, "end": 2605886}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA1.out", "start": 2605886, "end": 2608933}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA2.cocoa5", "start": 2608933, "end": 2616724}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA2.out", "start": 2616724, "end": 2622416}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA3.cocoa5", "start": 2622416, "end": 2627738}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA3.out", "start": 2627738, "end": 2639718}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA4.cocoa5", "start": 2639718, "end": 2646766}, {"filename": "/src/CoCoA-5/tests/tut-CoCoLA4.out", "start": 2646766, "end": 2657048}, {"filename": "/src/CoCoA-5/tests/whatiscocoa.cocoa5", "start": 2657048, "end": 2659261}, {"filename": "/src/CoCoA-5/tests/whatiscocoa.out", "start": 2659261, "end": 2659764}], "remote_package_size": 2659764});

  })();
