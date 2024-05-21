import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing/Landing.tsx';
import Login from './pages/login/Login.tsx';
import SignUp from './pages/signup/SignUp.tsx';
import Dashboard from './pages/admin/dashboard/Dashboard.tsx';
import Collections from './pages/collections/Collections.tsx';
import CollectionCards from './pages/collectionCards/CollectionCards.tsx';
import BrowseCards from './pages/browseCards/BrowseCards.tsx';
import UserCollection from './pages/userCollection/UserCollection.tsx';
import DeckBuilder from './pages/deckBuilder/DeckBuilder.tsx';
import NewDeck from './pages/newDeck/NewDeck.tsx';
import MyDeck from './pages/myDeck/MyDeck.tsx';
import EditDeck from './pages/editDeck/EditDeck.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collectionName" element={<CollectionCards/>} />
        <Route path="/browse-cards" element={<BrowseCards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/my-collection" element={<UserCollection/>} />
        <Route path="/deck-builder" element={<DeckBuilder />} />
        <Route path="/deck-builder/new-deck" element={<NewDeck />} />
        <Route path="/deck-builder/:deckId" element={<MyDeck />} />
        <Route path="/deck-builder/edit/:deckId" element={<EditDeck />} />
      </Routes>
    </Router>
  );
}

export default App;
