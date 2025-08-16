import HeaderAndMenu from "./containers/HeaderAndMenu.tsx";
import ArticlesList from "./containers/ArticlesList.tsx";
import "./App.scss";

function App() {
  return (
    <div id="news-aggregator-container">
      <HeaderAndMenu />
      <ArticlesList />
    </div>
  );
}

export default App;
