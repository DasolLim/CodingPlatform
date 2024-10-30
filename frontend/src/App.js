// Main
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ChallengeList from './pages/ChallengeList';
import { AuthProvider } from './context/AuthContext';

// Create a basic layout wrapper component for pages with sidebars (like Home)
function MainLayout({ children }) {
  return (
    <div className="main-layout">
      {children}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {/* Wrap the Home route with MainLayout */}
          <Route path="/" exact>
            <MainLayout>
              <Home />
            </MainLayout>
          </Route>

          {/* Register, Login, and ChallengeList can remain separate */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/challenges" component={ChallengeList} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
