import { useEffect } from "react";

export const useDocumentTitle = (title: string, suffix: string = "Nusarupa") => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${suffix}` : suffix;
    document.title = fullTitle;
  }, [title, suffix]);
};
