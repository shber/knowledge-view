import React, { useCallback, useRef } from 'react';
import {
  Background,
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
 
// 初始节点数据
const initialNodes = [
  {
    id: '0', // 节点唯一标识
    type: 'input', // 节点类型为输入节点
    data: { label: 'Node' }, // 节点显示的文本
    position: { x: 0, y: 50 }, // 节点位置
  },
];
 
// 用于生成唯一的节点ID
let id = 1;
const getId = () => `${id++}`;
const nodeOrigin = [0.5, 0]; // 节点原点位置
 
const AddNodeOnEdgeDrop = () => {
  // 创建对DOM元素的引用
  const reactFlowWrapper = useRef(null);
 
  // 使用hooks管理节点和边的状态
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();

  // 处理节点连接
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );
 
  // 处理连接结束事件
  const onConnectEnd = useCallback(
    (event, connectionState) => {
      // 当连接拖放到画布上而不是另一个节点时
      if (!connectionState.isValid) {
        const id = getId();
        // 获取鼠标/触摸事件的位置
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
        
        // 创建新节点
        const newNode = {
          id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: { label: `Node ${id}` },
          origin: [0.5, 0.0],
        };
 
        // 更新节点和边的状态
        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({ id, source: connectionState.fromNode.id, target: id }),
        );
      }
    },
    [screenToFlowPosition],
  );
 
  // 渲染流程图组件
  return (
    <div className="wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        style={{ backgroundColor: "#F7F9FB" }}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        fitView
        fitViewOptions={{ padding: 2 }}
        nodeOrigin={nodeOrigin}
    >
      <Background  />
    </ReactFlow>
    </div>
  );
};
 
// 导出主组件，包裹在ReactFlowProvider中以提供上下文
export default () => (
  <ReactFlowProvider>
    <AddNodeOnEdgeDrop />
  </ReactFlowProvider>
);