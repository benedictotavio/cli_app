import styles from "./TreeNode.module.css";

const TreeNode = ({ node }: any) => (
  <div className={styles.node_content}>
    <h1>{node.name}</h1>
    {node.children.map((child: { name: any }) => (
      <TreeNode key={child.name} node={child} />
    ))}
  </div>
);

export default TreeNode;