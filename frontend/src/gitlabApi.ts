const apiPrefix = "/api/v4";

export function getAllProjects(url: string): unknown {
  return fetch(`http://${url}${apiPrefix}/projects?membership=true&simple=true`, { method: "GET" }).then(unpackResult);
}

export function unpackResult(result: Response): unknown {
  return result
    .json()
    .then((content: unknown) => content)
    .catch((response: unknown) => console.warn(`An erorr has occured ${response.toString()}`));
}
