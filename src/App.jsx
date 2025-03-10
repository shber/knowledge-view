/*
 * @Author: Shber
 * @Date: 2025-03-05 08:10:14
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-10 08:08:00
 * @Description: 
 */
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  Position,
} from '@xyflow/react';

import {
  nodes as initialNodes,
  edges as initialEdges,
} from './components/initial-elements';
import AnnotationNode from './components/AnnotationNode';
import ToolbarNode from './components/ToolbarNode';
import ResizerNode from './components/ResizerNode';
import CircleNode from './components/CircleNode';
import TextNode from './components/TextNode';
import ButtonEdge from './components/ButtonEdge';
import SideOperate from './components/SideOperate/index';
import SideMenu from './components/SideMenu';

import '@xyflow/react/dist/style.css';

const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node) => node.type;

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSideOperate, setShowSideOperate] = useState(false);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'button',
        style: { strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [],
  );

  const createNode = useCallback(({label,type}) => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `${label} ${nodes.length + 1}` },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes.length, setNodes]);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setShowSideOperate(true);
  }, []);

  const onCloseSideOperate = useCallback(() => {
    setShowSideOperate(false);
    setSelectedNode(null);
  }, []);

  const onDeleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    onCloseSideOperate();
  }, []);

  const onKeyDown = useCallback((event) => {
    // 阻止默认的删除行为
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
    }
  }, []);

  return (
    <section className="content">
      <aside>
          <SideMenu onCreateNode={createNode}/>
      </aside>
      <section className="react_flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onKeyDown={onKeyDown}
          deleteKeyCode={null}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="overview"
        >
          <MiniMap zoomable pannable nodeClassName={nodeClassName} />
          <Controls />
          {showSideOperate && (
            <SideOperate 
              node={selectedNode}
              onClose={onCloseSideOperate}
              onDelete={onDeleteNode}
            />
          )}
          <Background color="#999" variant="dots" />
        </ReactFlow>
      </section>

    </section>
  )
};

export default OverviewFlow;