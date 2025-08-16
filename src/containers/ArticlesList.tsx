import { useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinearProgress from "@mui/material/LinearProgress";

import useIntersection from "../utils/useIntersection.ts";
import { getArticles } from "../slices/dataSlice.ts";
import ArticleCard from "../components/ArticleCard.tsx";
import { getNextPageArticlesFromSources } from "../articleSources/thunks/thunk.ts";
import { getIsAnySourceLoading } from "../articleSources/slices/articleSourcesSelector.ts";
import type { AppDispatch } from "../store.ts";
import "./ArticlesList.scss";

const ArticlesList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const articles = useSelector(getArticles);
  const isAnySourceLoading = useSelector(getIsAnySourceLoading);
  const nextLoadTriggerRef = useRef<HTMLDivElement>(null);

  const handleCurrentArticlesExhausted = useCallback(() => {
    dispatch(getNextPageArticlesFromSources());
  }, [dispatch]);

  useIntersection(nextLoadTriggerRef, handleCurrentArticlesExhausted, false);

  return (
    <div className="articles-list-container">
      {articles.length === 0 && !isAnySourceLoading && (
        <div className="articles-not-found">
          No Articles present for the searched keyword and the filters selected.
          <br />
          Please refine your search and filters.
        </div>
      )}
      <div className="articles-list">
        {articles.map((article, index) => (
          <ArticleCard article={article} id={`article-${index}`} />
        ))}
      </div>
      {isAnySourceLoading && (
        <div className="articles-loading">
          <LinearProgress />
        </div>
      )}
      <div ref={nextLoadTriggerRef} />
    </div>
  );
};

export default ArticlesList;
