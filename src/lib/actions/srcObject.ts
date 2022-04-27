export function srcObject(node: HTMLVideoElement, stream: MediaStream) {
  node.srcObject = stream;
  return {
    update(newStream: MediaStream) {
      if (node.srcObject != newStream) {
        node.srcObject = newStream;
      }
    },
  };
}
