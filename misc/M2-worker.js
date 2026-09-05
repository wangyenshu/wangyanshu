importScripts("workerTools.js");
importScripts("fzstd/index.js");

onmessage = async (msg) => {
  self.Module = self.Module || {};
  self.Module.thisProgram = "/m2/bin/M2-binary";

  const response = await fetch("M2.data.zst");
  if (!response.ok) {
    throw new Error(`Failed to load M2.data.zst: ${response.status}`);
  }

  const compressed = new Uint8Array(await response.arrayBuffer());
  const decompressed = fzstd.decompress(compressed);

  const data = decompressed.buffer.slice(
    decompressed.byteOffset,
    decompressed.byteOffset + decompressed.byteLength
  );

  self.Module.getPreloadedPackage = () => data;

  importScripts("M2.data.js");
  importScripts("M2-binary.js");

  emscriptenHack(new TtyClient(msg.data));
};