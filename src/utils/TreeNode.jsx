class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
  }
}

export class TreeNode {
  constructor() {
    this.treeData = null;
    this.inorderList = [];
    this.preorderList = [];
    this.postorderList = [];
  }

  generateTree(list) {
    const n = list.length;
    this.generate(list, 0, n - 1);
  }

  generate(list, l, r) {
    if (l <= r) {
      let m = Math.floor(l + (r - l) / 2);
      let node = {
        name: list[m].name,
        attributes: {
          style: list[m].style,
        },
      };
      let children = [];
      let left = this.generate(list, l, m - 1);
      if (left) children.push(left);
      let right = this.generate(list, m + 1, r);
      if (right) children.push(right);
      if (children !== 0) node.children = children;
      this.treeData = node;
      return node;
    }
  }

  inorder(treeData) {
    if (!treeData?.children) return;
    this.inorder(treeData.children[0]);
    this.inorderList.push(treeData?.name);
    this.inorder(treeData.children[1]);
  }

  preorder(treeData) {
    if (!treeData?.children) return;
    this.preorderList.push(treeData?.name);
    this.preorder(treeData.children[0]);
    this.preorder(treeData.children[1]);
  }

  postorder(treeData) {
    if (!treeData?.children) return;
    this.postorder(treeData.children[0]);
    this.postorder(treeData.children[1]);
    this.postorderList.push(treeData?.name);
  }
}

export default TreeNode;
