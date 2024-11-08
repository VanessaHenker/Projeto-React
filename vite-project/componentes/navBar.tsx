// ComponentFile.tsx
import React from 'react';

export function Component1() {
  return <div>Componente 1</div>;
}

export function Component2() {
  return <div>Componente 2</div>;
}

// Exportando como array e objeto
export const componentsArray = [Component1, Component2];
export const componentsObject = { Component1, Component2 };
