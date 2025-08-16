import { useCallback } from "react";
import moment from "moment";
import LazyImageRenderer from "../utils/LazyImageRendererWithFill.tsx";
import type { Article } from "../slices/dataSlice.ts";
import "./ArticleCard.scss";

type ArticleProps = {
  article: Article;
  id: string;
};

const ArticleCard: React.FC<ArticleProps> = ({ article, id }) => {
  const seeFullArticle = useCallback(() => {
    window.open(article.fullArticleUrl, "_blank");
  }, [article.fullArticleUrl]);

  return (
    <div className="article-container-outer" key={id} onClick={seeFullArticle}>
      <div className="article-container">
        <div className="image-container">
          <LazyImageRenderer
            id={id}
            url={article.imageUrl}
            altText={article.source}
          />
        </div>
        <div className="text-container">
          {article.title} | {article.description}
        </div>
        <div className="article-source-details">
          <div className="published-date">
            {moment(article.publishedAt).fromNow()}
          </div>
          &#9679;
          <div className="published-source">{article.source}</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
