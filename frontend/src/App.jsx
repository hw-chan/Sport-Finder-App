import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Profile from "./pages/Profile";
import Game from "./pages/Game";
import UserGame from "./pages/UserGame.jsx";
import { Provider } from "react-redux";
import store from "./store.js";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<AuthPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<CreateGame />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/game/:id" element={<Game />} />
              <Route path="/game/user" element={<UserGame />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
