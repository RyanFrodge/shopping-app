import React from 'react';
import './App.css';
import ShoppingList from './components/ShoppingList.jsx'
import 'antd/dist/antd.min.css';


function App() {
  return (
    <div className="App">
      <nav className="bg-muted-blue">
        <section className="px-lg py-md">
        <h1 className="flex text-lg text-white mr-auto ml-md">
          SHOPPING LIST
        </h1>
        </section>
      </nav>
      <main>
        <section className="medium-container">        
            <ShoppingList />           
        </section>
      </main>
    </div>
  );
}

export default App;
