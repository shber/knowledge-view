/*
 * @Author: Shber
 * @Date: 2025-03-05 08:20:37
 * @LastEditors: Shber
 * @LastEditTime: 2025-03-09 21:41:51
 * @Description: 
 */
import React from 'react';
import { Edge, MarkerType, Node } from '@xyflow/react';

export const nodes = [
  // {
  //   id: 'annotation-1',
  //   type: 'annotation',
  //   draggable: false,
  //   selectable: false,
  //   data: {
  //     level: 1,
  //     label:
  //       '内置节点和边类型。可拖拽、可删除、可连线',
  //     arrowStyle: {
  //       right: 0,
  //       bottom: 0,
  //       transform: 'translate(-30px,10px) rotate(-80deg)',
  //     },
  //   },
  //   position: { x: -80, y: -30 },
  // },
  {
    id: '1-1',
    type: 'input',
    data: {
      label: 'Input Node',
    },
    position: { x: 150, y: 0 },
  },
  {
    id: '1-2',
    type: 'default',
    data: {
      label: 'Default Node',
    },
    position: { x: 0, y: 100 },
  },
  {
    id: '1-3',
    type: 'output',
    data: {
      label: 'Output Node',
    },
    position: { x: 300, y: 100 },
  },
  {
    id: '2-1',
    type: 'group',
    position: {
      x: -170,
      y: 250,
    },
    style: {
      width: 380,
      height: 180,
      backgroundColor: 'rgba(208, 192, 247, 0.2)',
    },
    data: {}
  },
  {
    id: '2-2',
    data: {
      label: 'Node with Toolbar',
    },
    type: 'tools',
    position: { x: 50, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
    },
    parentId: '2-1',
    extent: 'parent',
  },
  {
    id: '2-3',
    type: 'resizer',
    data: {
      label: 'resizable node',
    },
    position: { x: 250, y: 50 },
    style: {
      width: 80,
      height: 80,
      background: 'rgb(208, 192, 247)',
      color: 'white',
    },
    parentId: '2-1',
    extent: 'parent',
  },
  {
    id: '3-2',
    type: 'textinput',
    position: { x: 150, y: 650 },
    data: {},
  },
  {
    id: '3-1',
    type: 'circle',
    position: { x: 350, y: 500 },
    data: {},
  },
] as Node[];

export const edges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    label: 'edge',
    type: 'smoothstep',
  },
  {
    id: 'e1-3',
    source: '1-1',
    target: '1-3',
    animated: true,
    label: 'animated edge',
  },
  {
    id: 'e2-2',
    source: '1-2',
    target: '2-2',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e2-3',
    source: '2-2',
    target: '2-3',
    type: 'smoothstep',
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: 'e3-3',
    source: '2-3',
    sourceHandle: 'a',
    target: '3-2',
    type: 'button',
    animated: true,
    style: { stroke: 'rgb(158, 118, 255)', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: '2-3',
    sourceHandle: 'b',
    target: '3-1',
    type: 'button',
    style: { strokeWidth: 2 },
  },
] as Edge[];