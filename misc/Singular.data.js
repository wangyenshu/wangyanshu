
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
      var PACKAGE_NAME = '/home/runner/work/recipes/recipes/output/bld/rattler-build_singular_1784043173/host_env_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placeho/bin/Singular.data';
      var REMOTE_PACKAGE_BASE = 'Singular.data';
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
Module['FS_createPath']("/", "LIB", true, true);
Module['FS_createPath']("/", "info", true, true);
Module['FS_createPath']("/info", "images", true, true);
Module['FS_createPath']("/info", "memory", true, true);

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
          }          Module['removeRunDependency']('datafile_/home/runner/work/recipes/recipes/output/bld/rattler-build_singular_1784043173/host_env_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placeho/bin/Singular.data');

      };
      Module['addRunDependency']('datafile_/home/runner/work/recipes/recipes/output/bld/rattler-build_singular_1784043173/host_env_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placehold_placeho/bin/Singular.data');

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
    loadPackage({"files": [{"filename": "/LIB/.singularrc", "start": 0, "end": 26}, {"filename": "/LIB/COPYING", "start": 26, "end": 12590}, {"filename": "/LIB/GND.lib", "start": 12590, "end": 41663}, {"filename": "/LIB/JMBTest.lib", "start": 41663, "end": 62388}, {"filename": "/LIB/JMSConst.lib", "start": 62388, "end": 91116}, {"filename": "/LIB/KVequiv.lib", "start": 91116, "end": 114739}, {"filename": "/LIB/SingularityDBM.lib", "start": 114739, "end": 129879}, {"filename": "/LIB/VecField.lib", "start": 129879, "end": 175854}, {"filename": "/LIB/absfact.lib", "start": 175854, "end": 200883}, {"filename": "/LIB/ainvar.lib", "start": 200883, "end": 221089}, {"filename": "/LIB/aksaka.lib", "start": 221089, "end": 233546}, {"filename": "/LIB/alexpoly.lib", "start": 233546, "end": 331022}, {"filename": "/LIB/algebra.lib", "start": 331022, "end": 369522}, {"filename": "/LIB/all.lib", "start": 369522, "end": 372383}, {"filename": "/LIB/all.lib.tmpl", "start": 372383, "end": 372810}, {"filename": "/LIB/arc.lib", "start": 372810, "end": 390335}, {"filename": "/LIB/arcpoint.lib", "start": 390335, "end": 406223}, {"filename": "/LIB/arnold.lib", "start": 406223, "end": 534805}, {"filename": "/LIB/arnoldclassify.lib", "start": 534805, "end": 596052}, {"filename": "/LIB/arr.lib", "start": 596052, "end": 695491}, {"filename": "/LIB/assprimeszerodim.lib", "start": 695491, "end": 715779}, {"filename": "/LIB/autgradalg.lib", "start": 715779, "end": 792300}, {"filename": "/LIB/bfun.lib", "start": 792300, "end": 847974}, {"filename": "/LIB/bimodules.lib", "start": 847974, "end": 874267}, {"filename": "/LIB/brillnoether.lib", "start": 874267, "end": 879869}, {"filename": "/LIB/brnoeth.lib", "start": 879869, "end": 1023275}, {"filename": "/LIB/central.lib", "start": 1023275, "end": 1080297}, {"filename": "/LIB/chern.lib", "start": 1080297, "end": 1209042}, {"filename": "/LIB/cimonom.lib", "start": 1209042, "end": 1224024}, {"filename": "/LIB/cisimplicial.lib", "start": 1224024, "end": 1272911}, {"filename": "/LIB/classify.lib", "start": 1272911, "end": 1367754}, {"filename": "/LIB/classify2.lib", "start": 1367754, "end": 1410016}, {"filename": "/LIB/classifyMapGerms.lib", "start": 1410016, "end": 1449110}, {"filename": "/LIB/classify_aeq.lib", "start": 1449110, "end": 1536206}, {"filename": "/LIB/classifyceq.lib", "start": 1536206, "end": 1598834}, {"filename": "/LIB/classifyci.lib", "start": 1598834, "end": 1625356}, {"filename": "/LIB/combinat.lib", "start": 1625356, "end": 1627481}, {"filename": "/LIB/compregb.lib", "start": 1627481, "end": 1633000}, {"filename": "/LIB/control.lib", "start": 1633000, "end": 1677728}, {"filename": "/LIB/crypto.lib", "start": 1677728, "end": 1771775}, {"filename": "/LIB/curveInv.lib", "start": 1771775, "end": 1792039}, {"filename": "/LIB/curvepar.lib", "start": 1792039, "end": 1832387}, {"filename": "/LIB/customstd.lib", "start": 1832387, "end": 1835877}, {"filename": "/LIB/deRham.lib", "start": 1835877, "end": 2020156}, {"filename": "/LIB/decodegb.lib", "start": 2020156, "end": 2072360}, {"filename": "/LIB/decomp.lib", "start": 2072360, "end": 2118763}, {"filename": "/LIB/deflation.lib", "start": 2118763, "end": 2147000}, {"filename": "/LIB/deform.lib", "start": 2147000, "end": 2177977}, {"filename": "/LIB/difform.lib", "start": 2177977, "end": 2265830}, {"filename": "/LIB/divisors.lib", "start": 2265830, "end": 2285696}, {"filename": "/LIB/dmod.lib", "start": 2285696, "end": 2442133}, {"filename": "/LIB/dmodapp.lib", "start": 2442133, "end": 2532689}, {"filename": "/LIB/dmodideal.lib", "start": 2532689, "end": 2565695}, {"filename": "/LIB/dmodloc.lib", "start": 2565695, "end": 2632963}, {"filename": "/LIB/dmodvar.lib", "start": 2632963, "end": 2656102}, {"filename": "/LIB/dummy.lib", "start": 2656102, "end": 2656592}, {"filename": "/LIB/elim.lib", "start": 2656592, "end": 2688497}, {"filename": "/LIB/ellipticcovers.lib", "start": 2688497, "end": 2705361}, {"filename": "/LIB/enumpoints.lib", "start": 2705361, "end": 2709935}, {"filename": "/LIB/equising.lib", "start": 2709935, "end": 2764206}, {"filename": "/LIB/ffmodstd.lib", "start": 2764206, "end": 2832281}, {"filename": "/LIB/ffsolve.lib", "start": 2832281, "end": 2859891}, {"filename": "/LIB/findifs.lib", "start": 2859891, "end": 2878474}, {"filename": "/LIB/finitediff.lib", "start": 2878474, "end": 2920602}, {"filename": "/LIB/finvar.lib", "start": 2920602, "end": 3234562}, {"filename": "/LIB/fpadim.lib", "start": 3234562, "end": 3313193}, {"filename": "/LIB/fpalgebras.lib", "start": 3313193, "end": 3360122}, {"filename": "/LIB/fpaprops.lib", "start": 3360122, "end": 3400268}, {"filename": "/LIB/freegb.lib", "start": 3400268, "end": 3493311}, {"filename": "/LIB/general.lib", "start": 3493311, "end": 3531955}, {"filename": "/LIB/gfan.lib", "start": 3531955, "end": 3571734}, {"filename": "/LIB/gitfan.lib", "start": 3571734, "end": 3662914}, {"filename": "/LIB/gkdim.lib", "start": 3662914, "end": 3665658}, {"filename": "/LIB/gmspoly.lib", "start": 3665658, "end": 3678487}, {"filename": "/LIB/gmssing.lib", "start": 3678487, "end": 3717642}, {"filename": "/LIB/goettsche.lib", "start": 3717642, "end": 3747044}, {"filename": "/LIB/graal.lib", "start": 3747044, "end": 3782404}, {"filename": "/LIB/gradedModules.lib", "start": 3782404, "end": 3985730}, {"filename": "/LIB/graphics.lib", "start": 3985730, "end": 3995792}, {"filename": "/LIB/grobcov.lib", "start": 3995792, "end": 4198362}, {"filename": "/LIB/groups.lib", "start": 4198362, "end": 4227555}, {"filename": "/LIB/grwalk.lib", "start": 4227555, "end": 4242471}, {"filename": "/LIB/hdepth.lib", "start": 4242471, "end": 4247021}, {"filename": "/LIB/help.cnf", "start": 4247021, "end": 4250089}, {"filename": "/LIB/hess.lib", "start": 4250089, "end": 4305690}, {"filename": "/LIB/hnoether.lib", "start": 4305690, "end": 4462434}, {"filename": "/LIB/hodge.lib", "start": 4462434, "end": 4479381}, {"filename": "/LIB/homolog.lib", "start": 4479381, "end": 4541728}, {"filename": "/LIB/hyperel.lib", "start": 4541728, "end": 4566712}, {"filename": "/LIB/inout.lib", "start": 4566712, "end": 4588011}, {"filename": "/LIB/integralbasis.lib", "start": 4588011, "end": 4751536}, {"filename": "/LIB/interval.lib", "start": 4751536, "end": 4783018}, {"filename": "/LIB/intprog.lib", "start": 4783018, "end": 4802523}, {"filename": "/LIB/invar.lib", "start": 4802523, "end": 4820403}, {"filename": "/LIB/involut.lib", "start": 4820403, "end": 4847600}, {"filename": "/LIB/jacobson.lib", "start": 4847600, "end": 4878243}, {"filename": "/LIB/kskernel.lib", "start": 4878243, "end": 4890085}, {"filename": "/LIB/latex.lib", "start": 4890085, "end": 4978287}, {"filename": "/LIB/lejeune.lib", "start": 4978287, "end": 4995887}, {"filename": "/LIB/linalg.lib", "start": 4995887, "end": 5042778}, {"filename": "/LIB/locnormal.lib", "start": 5042778, "end": 5048010}, {"filename": "/LIB/lrcalc.lib", "start": 5048010, "end": 5062156}, {"filename": "/LIB/makedbm.lib", "start": 5062156, "end": 5072694}, {"filename": "/LIB/mathml.lib", "start": 5072694, "end": 5096495}, {"filename": "/LIB/matrix.lib", "start": 5096495, "end": 5136286}, {"filename": "/LIB/maxlike.lib", "start": 5136286, "end": 5169779}, {"filename": "/LIB/methods.lib", "start": 5169779, "end": 5174981}, {"filename": "/LIB/moddiq.lib", "start": 5174981, "end": 5184447}, {"filename": "/LIB/modfinduni.lib", "start": 5184447, "end": 5189200}, {"filename": "/LIB/modnormal.lib", "start": 5189200, "end": 5194467}, {"filename": "/LIB/modprimdec.lib", "start": 5194467, "end": 5226660}, {"filename": "/LIB/modquotient.lib", "start": 5226660, "end": 5233973}, {"filename": "/LIB/modstd.lib", "start": 5233973, "end": 5260407}, {"filename": "/LIB/modular.lib", "start": 5260407, "end": 5275543}, {"filename": "/LIB/modules.lib", "start": 5275543, "end": 5339704}, {"filename": "/LIB/modwalk.lib", "start": 5339704, "end": 5357363}, {"filename": "/LIB/mondromy.lib", "start": 5357363, "end": 5385460}, {"filename": "/LIB/monomialideal.lib", "start": 5385460, "end": 5486696}, {"filename": "/LIB/mprimdec.lib", "start": 5486696, "end": 5550130}, {"filename": "/LIB/mregular.lib", "start": 5550130, "end": 5610681}, {"filename": "/LIB/multigrading.lib", "start": 5610681, "end": 5723174}, {"filename": "/LIB/ncHilb.lib", "start": 5723174, "end": 5745905}, {"filename": "/LIB/ncModslimgb.lib", "start": 5745905, "end": 5763763}, {"filename": "/LIB/ncalg.lib", "start": 5763763, "end": 6798532}, {"filename": "/LIB/ncall.lib", "start": 6798532, "end": 6799673}, {"filename": "/LIB/ncdecomp.lib", "start": 6799673, "end": 6812639}, {"filename": "/LIB/ncfactor.lib", "start": 6812639, "end": 7228483}, {"filename": "/LIB/ncfrac.lib", "start": 7228483, "end": 7261530}, {"filename": "/LIB/nchilbert.lib", "start": 7261530, "end": 7273690}, {"filename": "/LIB/nchomolog.lib", "start": 7273690, "end": 7294618}, {"filename": "/LIB/ncloc.lib", "start": 7294618, "end": 7305748}, {"filename": "/LIB/ncpreim.lib", "start": 7305748, "end": 7326465}, {"filename": "/LIB/ncrat.lib", "start": 7326465, "end": 7384525}, {"filename": "/LIB/nctools.lib", "start": 7384525, "end": 7432217}, {"filename": "/LIB/nets.lib", "start": 7432217, "end": 7461849}, {"filename": "/LIB/nfmodstd.lib", "start": 7461849, "end": 7486982}, {"filename": "/LIB/nfmodsyz.lib", "start": 7486982, "end": 7505520}, {"filename": "/LIB/noether.lib", "start": 7505520, "end": 7537512}, {"filename": "/LIB/normal.lib", "start": 7537512, "end": 7800371}, {"filename": "/LIB/normaliz.lib", "start": 7800371, "end": 7872180}, {"filename": "/LIB/ntsolve.lib", "start": 7872180, "end": 7881250}, {"filename": "/LIB/numerAlg.lib", "start": 7881250, "end": 7893506}, {"filename": "/LIB/numerDecom.lib", "start": 7893506, "end": 7940985}, {"filename": "/LIB/olga.lib", "start": 7940985, "end": 8004143}, {"filename": "/LIB/orbitparam.lib", "start": 8004143, "end": 8014069}, {"filename": "/LIB/parallel.lib", "start": 8014069, "end": 8025379}, {"filename": "/LIB/paraplanecurves.lib", "start": 8025379, "end": 8129189}, {"filename": "/LIB/perron.lib", "start": 8129189, "end": 8134184}, {"filename": "/LIB/pfd.lib", "start": 8134184, "end": 8205003}, {"filename": "/LIB/phindex.lib", "start": 8205003, "end": 8225023}, {"filename": "/LIB/pointid.lib", "start": 8225023, "end": 8241522}, {"filename": "/LIB/polybori.lib", "start": 8241522, "end": 8278325}, {"filename": "/LIB/polyclass.lib", "start": 8278325, "end": 8293961}, {"filename": "/LIB/polylib.lib", "start": 8293961, "end": 8328567}, {"filename": "/LIB/polymake.lib", "start": 8328567, "end": 8390635}, {"filename": "/LIB/presolve.lib", "start": 8390635, "end": 8442268}, {"filename": "/LIB/primdec.lib", "start": 8442268, "end": 8691365}, {"filename": "/LIB/primdecint.lib", "start": 8691365, "end": 8737143}, {"filename": "/LIB/primitiv.lib", "start": 8737143, "end": 8751607}, {"filename": "/LIB/puiseuxexpansions.lib", "start": 8751607, "end": 8797197}, {"filename": "/LIB/purityfiltration.lib", "start": 8797197, "end": 8821971}, {"filename": "/LIB/qhmoduli.lib", "start": 8821971, "end": 8868181}, {"filename": "/LIB/qmatrix.lib", "start": 8868181, "end": 8876295}, {"filename": "/LIB/random.lib", "start": 8876295, "end": 8892265}, {"filename": "/LIB/ratgb.lib", "start": 8892265, "end": 8905756}, {"filename": "/LIB/realclassify.lib", "start": 8905756, "end": 9069627}, {"filename": "/LIB/realizationMatroids.lib", "start": 9069627, "end": 9090301}, {"filename": "/LIB/realrad.lib", "start": 9090301, "end": 9116969}, {"filename": "/LIB/recover.lib", "start": 9116969, "end": 9185294}, {"filename": "/LIB/redcgs.lib", "start": 9185294, "end": 9298012}, {"filename": "/LIB/reesclos.lib", "start": 9298012, "end": 9310907}, {"filename": "/LIB/resbinomial.lib", "start": 9310907, "end": 9402642}, {"filename": "/LIB/resgraph.lib", "start": 9402642, "end": 9429167}, {"filename": "/LIB/resjung.lib", "start": 9429167, "end": 9452462}, {"filename": "/LIB/resolve.lib", "start": 9452462, "end": 9591341}, {"filename": "/LIB/resources.lib", "start": 9591341, "end": 9596084}, {"filename": "/LIB/reszeta.lib", "start": 9596084, "end": 9762819}, {"filename": "/LIB/ring.lib", "start": 9762819, "end": 9803066}, {"filename": "/LIB/ringgb.lib", "start": 9803066, "end": 9813844}, {"filename": "/LIB/rinvar.lib", "start": 9813844, "end": 9850745}, {"filename": "/LIB/rootisolation.lib", "start": 9850745, "end": 9888654}, {"filename": "/LIB/rootsmr.lib", "start": 9888654, "end": 9908923}, {"filename": "/LIB/rootsur.lib", "start": 9908923, "end": 9930677}, {"filename": "/LIB/rstandard.lib", "start": 9930677, "end": 9946919}, {"filename": "/LIB/rwalk.lib", "start": 9946919, "end": 9957361}, {"filename": "/LIB/sagbi.lib", "start": 9957361, "end": 10000113}, {"filename": "/LIB/sagbiNormaliz.lib", "start": 10000113, "end": 10052277}, {"filename": "/LIB/sagbiNormaliz0.lib", "start": 10052277, "end": 10099841}, {"filename": "/LIB/sagbigrob.lib", "start": 10099841, "end": 10109215}, {"filename": "/LIB/schreyer.lib", "start": 10109215, "end": 10117776}, {"filename": "/LIB/schubert.lib", "start": 10117776, "end": 10191782}, {"filename": "/LIB/sets.lib", "start": 10191782, "end": 10206250}, {"filename": "/LIB/sheafcoh.lib", "start": 10206250, "end": 10252188}, {"filename": "/LIB/signcond.lib", "start": 10252188, "end": 10262445}, {"filename": "/LIB/sing.lib", "start": 10262445, "end": 10297428}, {"filename": "/LIB/sing4ti2.lib", "start": 10297428, "end": 10311855}, {"filename": "/LIB/solve.lib", "start": 10311855, "end": 10371339}, {"filename": "/LIB/spcurve.lib", "start": 10371339, "end": 10403232}, {"filename": "/LIB/spectrum.lib", "start": 10403232, "end": 10404913}, {"filename": "/LIB/sresext.lib", "start": 10404913, "end": 10423854}, {"filename": "/LIB/ssi.lib", "start": 10423854, "end": 10428084}, {"filename": "/LIB/standard.lib", "start": 10428084, "end": 10506085}, {"filename": "/LIB/stanleyreisner.lib", "start": 10506085, "end": 10516848}, {"filename": "/LIB/stdmodule.lib", "start": 10516848, "end": 10528848}, {"filename": "/LIB/stratify.lib", "start": 10528848, "end": 10556698}, {"filename": "/LIB/surf.lib", "start": 10556698, "end": 10570595}, {"filename": "/LIB/surf_jupyter.lib", "start": 10570595, "end": 10576398}, {"filename": "/LIB/surfacesignature.lib", "start": 10576398, "end": 10591562}, {"filename": "/LIB/surfex.lib", "start": 10591562, "end": 10640607}, {"filename": "/LIB/swalk.lib", "start": 10640607, "end": 10662012}, {"filename": "/LIB/symodstd.lib", "start": 10662012, "end": 10702846}, {"filename": "/LIB/systhreads.lib", "start": 10702846, "end": 10704837}, {"filename": "/LIB/tasks.lib", "start": 10704837, "end": 10748536}, {"filename": "/LIB/tateProdCplxNegGrad.lib", "start": 10748536, "end": 10813084}, {"filename": "/LIB/teachstd.lib", "start": 10813084, "end": 10837115}, {"filename": "/LIB/template.lib", "start": 10837115, "end": 10840488}, {"filename": "/LIB/toric.lib", "start": 10840488, "end": 10868819}, {"filename": "/LIB/transformation.lib", "start": 10868819, "end": 10872188}, {"filename": "/LIB/triang.lib", "start": 10872188, "end": 10908757}, {"filename": "/LIB/tropical.lib", "start": 10908757, "end": 11218607}, {"filename": "/LIB/tropicalEllipticCovers.lib", "start": 11218607, "end": 11303193}, {"filename": "/LIB/tropicalNewton.lib", "start": 11303193, "end": 11332659}, {"filename": "/LIB/tst.lib", "start": 11332659, "end": 11358177}, {"filename": "/LIB/weierstr.lib", "start": 11358177, "end": 11365165}, {"filename": "/LIB/zeroset.lib", "start": 11365165, "end": 11411539}, {"filename": "/info/Building-Singular-from-source.md", "start": 11411539, "end": 11416375}, {"filename": "/info/C-STYLEGUIDE.md", "start": 11416375, "end": 11422563}, {"filename": "/info/COPYING.texi", "start": 11422563, "end": 11431574}, {"filename": "/info/C_CPP_StyleGuide.md", "start": 11431574, "end": 11445458}, {"filename": "/info/DEPENDENCIES", "start": 11445458, "end": 11445672}, {"filename": "/info/Development-model.md", "start": 11445672, "end": 11446088}, {"filename": "/info/HOWTO-libsingular", "start": 11446088, "end": 11449128}, {"filename": "/info/HOWTO.ispell", "start": 11449128, "end": 11449879}, {"filename": "/info/How-To-Contribute.md", "start": 11449879, "end": 11451088}, {"filename": "/info/Includes.dot", "start": 11451088, "end": 11455205}, {"filename": "/info/Makefile", "start": 11455205, "end": 11484572}, {"filename": "/info/Makefile-docbuild", "start": 11484572, "end": 11492670}, {"filename": "/info/Makefile-docbuild.in", "start": 11492670, "end": 11500645}, {"filename": "/info/Makefile.am", "start": 11500645, "end": 11506455}, {"filename": "/info/Makefile.in", "start": 11506455, "end": 11527800}, {"filename": "/info/Makefile.lib2doc", "start": 11527800, "end": 11529938}, {"filename": "/info/NEWS.texi", "start": 11529938, "end": 11552714}, {"filename": "/info/Porting-instructions.md", "start": 11552714, "end": 11553615}, {"filename": "/info/STYLEGUIDE", "start": 11553615, "end": 11563960}, {"filename": "/info/bad_lib0.lib", "start": 11563960, "end": 11564135}, {"filename": "/info/build_standards", "start": 11564135, "end": 11566627}, {"filename": "/info/changes_in_singular4.texi", "start": 11566627, "end": 11574564}, {"filename": "/info/cones.doc", "start": 11574564, "end": 11575462}, {"filename": "/info/cones.no.doc", "start": 11575462, "end": 11576360}, {"filename": "/info/cones.yes.doc", "start": 11576360, "end": 11580691}, {"filename": "/info/countedref.doc", "start": 11580691, "end": 11590037}, {"filename": "/info/decodegb.doc", "start": 11590037, "end": 11622433}, {"filename": "/info/dir_structure", "start": 11622433, "end": 11625189}, {"filename": "/info/doc2idx.pl", "start": 11625189, "end": 11627109}, {"filename": "/info/doc2tex.pl", "start": 11627109, "end": 11645699}, {"filename": "/info/elementsInTermsOfGeneratorsG25.sing", "start": 11645699, "end": 11649398}, {"filename": "/info/examples.doc", "start": 11649398, "end": 11779282}, {"filename": "/info/external-packages-dynamic-modules.md", "start": 11779282, "end": 11780156}, {"filename": "/info/general.doc", "start": 11780156, "end": 11934907}, {"filename": "/info/help.cnf", "start": 11934907, "end": 11934983}, {"filename": "/info/images/Mybg.gif", "start": 11934983, "end": 11935840}, {"filename": "/info/images/a_begin.gif", "start": 11935840, "end": 11936755}, {"filename": "/info/images/a_begin_na.gif", "start": 11936755, "end": 11937664}, {"filename": "/info/images/a_document.gif", "start": 11937664, "end": 11938591}, {"filename": "/info/images/a_document_na.gif", "start": 11938591, "end": 11939517}, {"filename": "/info/images/a_empty.gif", "start": 11939517, "end": 11940396}, {"filename": "/info/images/a_end.gif", "start": 11940396, "end": 11941314}, {"filename": "/info/images/a_end_na.gif", "start": 11941314, "end": 11942229}, {"filename": "/info/images/a_help.gif", "start": 11942229, "end": 11943137}, {"filename": "/info/images/a_help_na.gif", "start": 11943137, "end": 11944049}, {"filename": "/info/images/a_index.gif", "start": 11944049, "end": 11944980}, {"filename": "/info/images/a_index_na.gif", "start": 11944980, "end": 11945923}, {"filename": "/info/images/a_left.gif", "start": 11945923, "end": 11946823}, {"filename": "/info/images/a_left_na.gif", "start": 11946823, "end": 11947719}, {"filename": "/info/images/a_leftdouble.gif", "start": 11947719, "end": 11948635}, {"filename": "/info/images/a_leftdouble_na.gif", "start": 11948635, "end": 11949551}, {"filename": "/info/images/a_page.gif", "start": 11949551, "end": 11950472}, {"filename": "/info/images/a_page_na.gif", "start": 11950472, "end": 11951391}, {"filename": "/info/images/a_right.gif", "start": 11951391, "end": 11952296}, {"filename": "/info/images/a_right_na.gif", "start": 11952296, "end": 11953200}, {"filename": "/info/images/a_rightdouble.gif", "start": 11953200, "end": 11954118}, {"filename": "/info/images/a_rightdouble_na.gif", "start": 11954118, "end": 11955042}, {"filename": "/info/images/a_search.gif", "start": 11955042, "end": 11955974}, {"filename": "/info/images/a_search_na.gif", "start": 11955974, "end": 11956905}, {"filename": "/info/images/a_searchdoc.gif", "start": 11956905, "end": 11957865}, {"filename": "/info/images/a_searchdoc_na.gif", "start": 11957865, "end": 11958806}, {"filename": "/info/images/a_tableofcon.gif", "start": 11958806, "end": 11959738}, {"filename": "/info/images/a_tableofcon_na.gif", "start": 11959738, "end": 11960682}, {"filename": "/info/images/a_top.gif", "start": 11960682, "end": 11961582}, {"filename": "/info/images/a_top_na.gif", "start": 11961582, "end": 11962483}, {"filename": "/info/images/a_up.gif", "start": 11962483, "end": 11963377}, {"filename": "/info/images/a_up_na.gif", "start": 11963377, "end": 11964271}, {"filename": "/info/images/bg.jpg", "start": 11964271, "end": 11966843}, {"filename": "/info/images/bg_left.gif", "start": 11966843, "end": 11967003}, {"filename": "/info/images/bg_right.gif", "start": 11967003, "end": 11967377}, {"filename": "/info/images/blue_dir.gif", "start": 11967377, "end": 11967621}, {"filename": "/info/images/blue_down.gif", "start": 11967621, "end": 11967762}, {"filename": "/info/images/blue_grab.gif", "start": 11967762, "end": 11967931}, {"filename": "/info/images/blue_help.gif", "start": 11967931, "end": 11968086}, {"filename": "/info/images/blue_next.gif", "start": 11968086, "end": 11968224}, {"filename": "/info/images/blue_nnext.gif", "start": 11968224, "end": 11968385}, {"filename": "/info/images/blue_pprev.gif", "start": 11968385, "end": 11968550}, {"filename": "/info/images/blue_prev.gif", "start": 11968550, "end": 11968688}, {"filename": "/info/images/blue_readme.gif", "start": 11968688, "end": 11968933}, {"filename": "/info/images/blue_top.gif", "start": 11968933, "end": 11969094}, {"filename": "/info/images/blue_up.gif", "start": 11969094, "end": 11969234}, {"filename": "/info/images/blue_uup.gif", "start": 11969234, "end": 11969399}, {"filename": "/info/images/contents_motif.gif", "start": 11969399, "end": 11969624}, {"filename": "/info/images/index_motif.gif", "start": 11969624, "end": 11969804}, {"filename": "/info/images/invisible.xbm", "start": 11969804, "end": 11969901}, {"filename": "/info/images/letterplace.jpg", "start": 11969901, "end": 11987099}, {"filename": "/info/images/next_motif.gif", "start": 11987099, "end": 11987271}, {"filename": "/info/images/next_motif_gr.gif", "start": 11987271, "end": 11987443}, {"filename": "/info/images/plural-2.jpg", "start": 11987443, "end": 12001928}, {"filename": "/info/images/plural.jpg", "start": 12001928, "end": 12018974}, {"filename": "/info/images/previous_motif.gif", "start": 12018974, "end": 12019194}, {"filename": "/info/images/previous_motif_gr.gif", "start": 12019194, "end": 12019414}, {"filename": "/info/images/sca.jpg", "start": 12019414, "end": 12036322}, {"filename": "/info/images/singular-1.jpg", "start": 12036322, "end": 12074381}, {"filename": "/info/images/singular-2.jpg", "start": 12074381, "end": 12113434}, {"filename": "/info/images/singular-3.jpg", "start": 12113434, "end": 12152853}, {"filename": "/info/images/singular-icon-transparent.gif", "start": 12152853, "end": 12155763}, {"filename": "/info/images/singular-small.jpg", "start": 12155763, "end": 12160876}, {"filename": "/info/images/singular.jpg", "start": 12160876, "end": 12204103}, {"filename": "/info/images/spacer3.gif", "start": 12204103, "end": 12204148}, {"filename": "/info/images/xy_contents.gif", "start": 12204148, "end": 12204268}, {"filename": "/info/images/xy_foot.gif", "start": 12204268, "end": 12204341}, {"filename": "/info/images/xy_next.gif", "start": 12204341, "end": 12204456}, {"filename": "/info/images/xy_next_gr.gif", "start": 12204456, "end": 12204566}, {"filename": "/info/images/xy_nextsection.gif", "start": 12204566, "end": 12204703}, {"filename": "/info/images/xy_nextsection_gr.gif", "start": 12204703, "end": 12204834}, {"filename": "/info/images/xy_previous.gif", "start": 12204834, "end": 12204947}, {"filename": "/info/images/xy_previous_gr.gif", "start": 12204947, "end": 12205057}, {"filename": "/info/images/xy_previoussection.gif", "start": 12205057, "end": 12205193}, {"filename": "/info/images/xy_previoussection_gr.gif", "start": 12205193, "end": 12205325}, {"filename": "/info/images/xy_up.gif", "start": 12205325, "end": 12205432}, {"filename": "/info/images/xy_up_gr.gif", "start": 12205432, "end": 12205533}, {"filename": "/info/latex2html.init", "start": 12205533, "end": 12212157}, {"filename": "/info/letterplace.doc", "start": 12212157, "end": 12281128}, {"filename": "/info/lib2doc.texi", "start": 12281128, "end": 12283473}, {"filename": "/info/math.doc", "start": 12283473, "end": 12315030}, {"filename": "/info/memory/OMALLOC.texi", "start": 12315030, "end": 12330069}, {"filename": "/info/orbits.gp", "start": 12330069, "end": 12332820}, {"filename": "/info/orbitsG25.gp", "start": 12332820, "end": 12335341}, {"filename": "/info/parallel.texi", "start": 12335341, "end": 12337589}, {"filename": "/info/pdata.doc", "start": 12337589, "end": 12370081}, {"filename": "/info/pl2doc.pl", "start": 12370081, "end": 12383242}, {"filename": "/info/platform.doc", "start": 12383242, "end": 12392147}, {"filename": "/info/plulibs.doc", "start": 12392147, "end": 12397873}, {"filename": "/info/plural.doc", "start": 12397873, "end": 12519199}, {"filename": "/info/pyobject.doc", "start": 12519199, "end": 12527734}, {"filename": "/info/pyobject.no.doc", "start": 12527734, "end": 12530026}, {"filename": "/info/pyobject.yes.doc", "start": 12530026, "end": 12538561}, {"filename": "/info/reference.doc", "start": 12538561, "end": 12821884}, {"filename": "/info/sample.lib", "start": 12821884, "end": 12822269}, {"filename": "/info/sample_lib0.lib", "start": 12822269, "end": 12822814}, {"filename": "/info/sca.doc", "start": 12822814, "end": 12826979}, {"filename": "/info/simple-make", "start": 12826979, "end": 12828257}, {"filename": "/info/simplexOrbitRepresentativesG25.sing", "start": 12828257, "end": 12828887}, {"filename": "/info/simplexSymmetryGroupG25.sing", "start": 12828887, "end": 12836573}, {"filename": "/info/singcard.tex", "start": 12836573, "end": 12843063}, {"filename": "/info/singular.dic", "start": 12843063, "end": 12852139}, {"filename": "/info/singular.doc", "start": 12852139, "end": 12899533}, {"filename": "/info/singular.dot", "start": 12899533, "end": 12901117}, {"filename": "/info/singular_toc.html", "start": 12901117, "end": 12904632}, {"filename": "/info/start.doc", "start": 12904632, "end": 12940459}, {"filename": "/info/t2h_singular.init", "start": 12940459, "end": 12945029}, {"filename": "/info/t2h_standalone.init", "start": 12945029, "end": 12945621}, {"filename": "/info/texi2html", "start": 12945621, "end": 13088733}, {"filename": "/info/texinfo.tex", "start": 13088733, "end": 13288913}, {"filename": "/info/ti_ip.doc", "start": 13288913, "end": 13308461}, {"filename": "/info/tricks.doc", "start": 13308461, "end": 13330634}, {"filename": "/info/tutor-titlepage.tex", "start": 13330634, "end": 13332178}, {"filename": "/info/tutor.tex", "start": 13332178, "end": 13333958}, {"filename": "/info/types.doc", "start": 13333958, "end": 13468412}, {"filename": "/info/usercard.tex", "start": 13468412, "end": 13486756}, {"filename": "/info/version.texi", "start": 13486756, "end": 13486825}, {"filename": "/info/version.texi.in", "start": 13486825, "end": 13486916}], "remote_package_size": 13486916});

  })();
