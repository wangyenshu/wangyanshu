importScripts("workerTools.js");

onmessage = (msg) => {
  self.Module = self.Module || {};
  self.Module.preRun = self.Module.preRun || [];
  importScripts("fricas-init.js");
  importScripts("ecl.data.js");
  importScripts("ecl.js");

  emscriptenHack(new TtyClient(msg.data));
};