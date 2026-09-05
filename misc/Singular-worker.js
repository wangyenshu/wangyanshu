importScripts("workerTools.js");

onmessage = (msg) => {
  self.Module = self.Module || {};
  self.Module.preRun = self.Module.preRun || [];
  importScripts("Singular.js");
  importScripts("Singular.data.js");

  emscriptenHack(new TtyClient(msg.data));
};