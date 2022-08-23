import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import Characters from "./pages/characters";
import Books from "./pages/books";
import Houses from "./pages/houses";
import SingleCharacter from "./pages/characters/single";
import SingleHouse from "./pages/houses/single";
import SingleBook from "./pages/books/single";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <Container maxWidth={"xl"} disableGutters>
      <CssBaseline />
      <Navbar />
      <Container maxWidth={"lg"} sx={{ py: 5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="characters" element={<Characters />} />
          <Route path="houses" element={<Houses />} />
          <Route path="books" element={<Books />} />
          <Route
            path="/characters/:characterId"
            element={<SingleCharacter />}
          />
          <Route path="/houses/:houseId" element={<SingleHouse />} />
          <Route path="/books/:bookId" element={<SingleBook />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </Container>
  );
};

export default App;
