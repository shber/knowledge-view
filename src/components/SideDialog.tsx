/*
 * @Author: Shber
 * @Date: 2025-03-05 08:35:39
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-05 08:47:28
 * @Description: 
 */
import React from 'react';
import { useStoreApi, useReactFlow, Panel, Background } from '@xyflow/react';
 
const panelStyle = {
  color: '#777',
  fontSize: 12,
  top: '5vh',
  background: "#f8f8f9",
  height: '70vh',
//   left: '90%'
};
 
const buttonStyle = {
  fontSize: 12,
  marginRight: 5,
  marginTop: 5,
};
 
export default () => {
  const store = useStoreApi();
  const { zoomIn, zoomOut, setCenter } = useReactFlow();
 
  const focusNode = () => {
    const { nodeLookup } = store.getState();
    const nodes = Array.from(nodeLookup).map(([, node]) => node);
 
    if (nodes.length > 0) {
      const node = nodes[0];        
      const x = node.position.x + node.measured.width / 2;
      const y = node.position.y + node.measured.height / 2;
      const zoom = 1.85;
 
      setCenter(x, y, { zoom, duration: 1000 });
    }
  };
 
  return (
    <Panel position="top-right" style={panelStyle}>
      <div className="description">
        This is an example of how you can use the zoom pan helper hook
      </div>
      <div>
        <button onClick={focusNode} style={buttonStyle}>
          focus node
        </button>
        <button onClick={zoomIn} style={buttonStyle}>
          zoom in
        </button>
        <button onClick={zoomOut} style={buttonStyle}>
          zoom out
        </button>
      </div>
    </Panel>
  );
};