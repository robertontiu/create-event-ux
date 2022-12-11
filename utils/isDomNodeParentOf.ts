export function isDomNodeParentOf(parentNode: Node, childNode: Node) {
  let node = childNode.parentNode
  while (node) {
    if (node === parentNode) {
      return true
    }
    node = node.parentNode
  }
  return false
}
