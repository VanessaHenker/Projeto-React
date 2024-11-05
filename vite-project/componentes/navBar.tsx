import React from 'react';

function Component1() {
  return <div>Componente 1</div>;
}

function Component2() {
  return <div>Componente 2</div>;
}

export const componentsArray = [Component1, Component2];
// Ou como um objeto
export const componentsObject = { Component1, Component2 };
