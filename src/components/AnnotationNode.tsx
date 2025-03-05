/*
 * @Author: Shber
 * @Date: 2025-03-05 08:21:28
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-05 08:22:32
 * @Description: 
 */
import React, { memo }  from 'react';

function AnnotationNode({ data }) {
  return (
    <>
      <div style={{ padding: 10, display: 'flex' }}>
        <div style={{ marginRight: 4 }}>{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className="arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
}

export default memo(AnnotationNode);