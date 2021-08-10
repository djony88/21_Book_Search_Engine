import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppoloProvider } from '@appolo/react-hooks';
import AppoloClient from 'appolo-boost';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

const client = new AppoloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        autorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  url:"/graphql",
})

function App() {
  return (
  <AppoloProvider client = {client}>

    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    
  </AppoloProvider>

  );

}

export default App;
