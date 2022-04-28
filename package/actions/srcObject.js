export function srcObject(node, stream) {
    node.srcObject = stream;
    return {
        update(newStream) {
            if (node.srcObject != newStream) {
                node.srcObject = newStream;
            }
        },
    };
}
