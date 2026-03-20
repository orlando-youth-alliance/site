function dispatchIfIdle() {
  const token = $os.getenv("GITHUB_TOKEN")
  const runsUrl = "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/hugo.yml/runs"
  const headers = {
    Authorization: "Bearer " + token,
    Accept: "application/vnd.github+json",
  }

  for (const status of ["queued", "in_progress"]) {
    const res = $http.send({
      method: "GET",
      url: runsUrl + "?status=" + status + "&per_page=1",
      headers,
    })
    const data = JSON.parse(res.raw)
    if (data.total_count > 0) {
      $app.logger().info("deploy already pending, skipping dispatch (status=" + status + ")")
      return
    }
  }

  $http.send({
    method: "POST",
    url: runsUrl.replace("/runs", "/dispatches"),
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ ref: "main" }),
  })
}

onRecordAfterCreateSuccess((e) => {
  $app.logger().info("onRecordAfterCreateSuccess fired");
  dispatchIfIdle();
  e.next();
});

onRecordAfterUpdateSuccess((e) => {
  if (e.requestInfo().headers["x-deploy-stamp"]) {
    e.next();
    return;
  }
  $app.logger().info("onRecordAfterUpdateSuccess fired");
  dispatchIfIdle();
  e.next();
});

onRecordAfterDeleteSuccess((e) => {
  $app.logger().info("onRecordAfterDeleteSuccess fired");
  dispatchIfIdle();
  e.next();
});
