/*
 * @Author: Shber
 * @Date: 2025-03-05 08:10:14
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-10 17:14:35
 * @Description: 
 */
import React, { useCallback, useState, useRef } from "react";
import {
  ReactFlow,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  getRectOfNodes,
  getTransformForBounds,
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

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

document.oncontextmenu = function(){
  return false;
}

const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node) => node.type;

const OverviewFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showSideOperate, setShowSideOperate] = useState(false);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, type: null, nodeId: null });
  const flowRef = useRef(null);

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
      id: `type-${nodes.length + 1}`,
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

  // 处理画布的右键菜单
  const onPaneContextMenu = useCallback((event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      type: 'pane',
      nodeId: null
    });
  }, []);

  // 处理节点的右键菜单
  const onNodeContextMenu = useCallback((event, nodeId, data) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      type: 'node',
      nodeId,
      data
    });
  }, []);

  // 隐藏右键菜单
  const hideContextMenu = useCallback(() => {
    setContextMenu({ visible: false, x: 0, y: 0, type: null, nodeId: null });
  }, []);

  // 处理右键菜单项点击
  const handleMenuItemClick = useCallback((action) => {
    const { type, nodeId } = contextMenu;
    
    switch (action) {
      case 'create':
        createNode({
          label: '新节点',
          type: 'resizer'
        });
        break;
      case 'edit':
        // 处理编辑操作
        console.log('Edit node:', nodeId);
        break;
      case 'copy':
        // 处理复制操作
        if (nodeId) {
          const nodeToCopy = nodes.find(n => n.id === nodeId);
          if (nodeToCopy) {
            createNode({
              label: `${nodeToCopy.data.label} Copy`,
              type: nodeToCopy.type
            });
          }
        }
        break;
      case 'delete':
        // 处理删除操作
        if (nodeId) {
          onDeleteNode(nodeId);
        }
        break;
      default:
        break;
    }
    hideContextMenu();
  }, [contextMenu, createNode, nodes, onDeleteNode]);

  // 导出图片功能
  const onExportImage = useCallback(() => {
    if (flowRef.current === null) return;

    const nodesBounds = getRectOfNodes(nodes);
    const transform = getTransformForBounds(
      nodesBounds,
      1000,
      800,
      0.5,
      2
    );

    toPng(flowRef.current, {
      backgroundColor: '#fff',
      width: 1000,
      height: 800,
      style: {
        width: '1000px',
        height: '800px',
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'flow-chart.png';
        link.href = dataUrl;
        link.click();
      });
  }, [nodes]);

  return (
    <section className="content">
      <aside>
          <SideMenu onCreateNode={createNode}/>
      </aside>
      <section className="react_flow">
        <ReactFlow
          ref={flowRef}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={hideContextMenu}
          onPaneContextMenu={onPaneContextMenu}
          onNodeContextMenu={onNodeContextMenu}
          onKeyDown={onKeyDown}
          deleteKeyCode={null}
          fitView
          attributionPosition="top-right"
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          className="overview"
        >
          <Panel position="top-left" className="export-panel">
            <Button 
              type="primary"
              icon={<DownloadOutlined />}
              onClick={onExportImage}
            >
              导出为图片
            </Button>
          </Panel>
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
          
          {/* 右键菜单 */}
          {contextMenu.visible && (
            <div 
              className="context-menu"
              style={{
                position: 'fixed',
                top: contextMenu.y,
                left: contextMenu.x,
              }}
            >
              {contextMenu.type === 'pane' ? (
                // 画布右键菜单
                <div className="context-menu-item" onClick={() => handleMenuItemClick('create')}>
                  <span className="icon">➕</span>
                  新建节点
                </div>
              ) : (
                // 节点右键菜单
                <>
                  <div className="context-menu-item" onClick={() => handleMenuItemClick('edit')}>
                    <span className="icon">✏️</span>
                    编辑
                  </div>
                  <div className="context-menu-item" onClick={() => handleMenuItemClick('copy')}>
                    <span className="icon">📋</span>
                    复制
                  </div>
                  <div className="context-menu-item delete" onClick={() => handleMenuItemClick('delete')}>
                    <span className="icon">🗑️</span>
                    删除
                  </div>
                </>
              )}
            </div>
          )}
        </ReactFlow>
      </section>

    </section>
  )
};

export default OverviewFlow;