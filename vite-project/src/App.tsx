// App.tsx
import React from 'react';
import './App.css';
import { Component1, Component2 } from './ComponentFile';

function App() {
  return (
    <>
      <nav>
        <h1>olá</h1>
      </nav>

      <section>
        <h1>Section 1</h1>
        <Component1 />
      </section>

      <section>
        <h1>Section 2</h1>
        <Component2 />
      </section>

      <footer>
        <h4>Footer</h4>
      </footer>
    </>
  );
}

export default App;
