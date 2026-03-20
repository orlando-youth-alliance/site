onRecordAfterCreateSuccess((e) => {
  $app.logger().info("onRecordAfterCreateSuccess fired");
  $http.send({
    method: "POST",
    url: "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/hugo.yml/dispatches",
    headers: {
      Authorization: "Bearer " + $os.getenv("GITHUB_TOKEN"),
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: "main" }),
  });
  e.next();
});

onRecordAfterUpdateSuccess((e) => {
  if (e.requestInfo().headers["x-deploy-stamp"]) {
    e.next();
    return;
  }
  $app.logger().info("onRecordAfterUpdateSuccess fired");
  $http.send({
    method: "POST",
    url: "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/hugo.yml/dispatches",
    headers: {
      Authorization: "Bearer " + $os.getenv("GITHUB_TOKEN"),
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: "main" }),
  });
  e.next();
});

onRecordAfterDeleteSuccess((e) => {
  $app.logger().info("onRecordAfterDeleteSuccess fired");
  $http.send({
    method: "POST",
    url: "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/hugo.yml/dispatches",
    headers: {
      Authorization: "Bearer " + $os.getenv("GITHUB_TOKEN"),
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ref: "main" }),
  });
  e.next();
});
