/*
 * @Author: Shber
 * @Date: 2025-03-05 08:10:14
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-05 18:13:45
 * @Description: 
 */
import React, { useCallback } from "react";
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <section className="content">
      <aside>
          <SideMenu/>
      </aside>
      <section className="react_flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="overview"
        >
          <MiniMap zoomable pannable nodeClassName={nodeClassName} />
          <Controls />
          <SideOperate/>
          <Background color="#999" variant="dots" />
        </ReactFlow>
      </section>

    </section>
  )
};

export default OverviewFlow;