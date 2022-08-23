export const GetLastPage = (link: string) => {
  const start = link.lastIndexOf("<");
  const end = link.lastIndexOf(">");
  const result = link.substring(start + 1, end);
  const url = new URL(result);
  const pageNumber = Number(url.searchParams.get("page"));
  return pageNumber;
};

export const getIDFromUrl = (url: string) => {
  const index = url.lastIndexOf("/");
  return url.substring(index + 1);
};
