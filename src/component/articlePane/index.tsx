import React, { useEffect, useRef, useState } from "react";
import { IconButton, IIconProps } from "office-ui-fabric-react";
import { Parser as HtmlToReactParser } from "html-to-react";
import './style.css';

export interface article {
  title: string;
  content: string;
  url?: string;
}
export interface Props {
  className?: string;
  closeModal?(): any;
  article?: article;
  style?: {
    [prop: string]: string;
  };
}

const backIcon: IIconProps = { iconName: "Back" };

const ArticlePane = ({
  className,
  style,
  article = { title: "", content: "" },
  closeModal,
}: Props) => {
  const htmlToReactParserRef = useRef(new HtmlToReactParser());
  const [contentJSX, setContentJSX] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const parse = htmlToReactParserRef.current.parse;
    setContentJSX(parse(article.content));
  }, [article.content]);

  const contentRender = () => {
    return (
      <div className="flex flex-col">
        <div className="flex items-center h-10 border-b">
          <IconButton
            className="block lg:hidden"
            iconProps={backIcon}
            onClick={closeModal}
          />
        </div>
        <article className="max-w-3xl mx-auto py-4">
          <header>
            <h2 className="font-bold text-3xl mb-6">
              <a href={article.url} target="_blank" rel="noreferrer">
                {article.title}
              </a>
            </h2>
          </header>
          <div>{contentJSX}</div>
          <footer></footer>
        </article>
      </div>
    );
  };

  return (
    <div className={`${className}`} style={style}>
      {contentRender()}
    </div>
  );
};

export default ArticlePane;
