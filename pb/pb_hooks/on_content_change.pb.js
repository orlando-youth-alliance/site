onRecordAfterCreateSuccess(function(e) {
  $app.logger().info("onRecordAfterCreateSuccess fired");
  try {
    var token = $os.getenv("GITHUB_TOKEN")
    var runsUrl = "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/deploy.yml/runs"
    var authHeaders = {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
    }
    var statuses = ["queued", "in_progress"]
    for (var i = 0; i < statuses.length; i++) {
      var res = $http.send({ method: "GET", url: runsUrl + "?status=" + statuses[i] + "&per_page=1", headers: authHeaders })
      console.log("gh check statusCode=" + res.statusCode + " total_count=" + res.json.total_count)
      if (res.json.total_count > 0) {
        console.log("deploy already pending, skipping (status=" + statuses[i] + ")")
        e.next(); return
      }
    }
    console.log("dispatching workflow")
    var dr = $http.send({ method: "POST", url: "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/deploy.yml/dispatches", headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" }, body: JSON.stringify({ ref: "main" }) })
    console.log("dispatch response statusCode=" + dr.statusCode)
  } catch(err) { console.log("hook error: " + err) }
  e.next();
});

onRecordAfterUpdateSuccess(function(e) {
  if (e.request && e.request.header.get("x-deploy-stamp")) { e.next(); return; }
  $app.logger().info("onRecordAfterUpdateSuccess fired");
  try {
    var token = $os.getenv("GITHUB_TOKEN")
    var runsUrl = "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/deploy.yml/runs"
    var authHeaders = {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
    }
    var statuses = ["queued", "in_progress"]
    for (var i = 0; i < statuses.length; i++) {
      var res = $http.send({ method: "GET", url: runsUrl + "?status=" + statuses[i] + "&per_page=1", headers: authHeaders })
      console.log("gh check statusCode=" + res.statusCode + " total_count=" + res.json.total_count)
      if (res.json.total_count > 0) {
        console.log("deploy already pending, skipping (status=" + statuses[i] + ")")
        e.next(); return
      }
    }
    console.log("dispatching workflow")
    var dr = $http.send({ method: "POST", url: "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/deploy.yml/dispatches", headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" }, body: JSON.stringify({ ref: "main" }) })
    console.log("dispatch response statusCode=" + dr.statusCode)
  } catch(err) { console.log("hook error: " + err) }
  e.next();
});

onRecordAfterDeleteSuccess(function(e) {
  $app.logger().info("onRecordAfterDeleteSuccess fired");
  try {
    var token = $os.getenv("GITHUB_TOKEN")
    var runsUrl = "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/deploy.yml/runs"
    var authHeaders = {
      Authorization: "Bearer " + token,
      Accept: "application/vnd.github+json",
    }
    var statuses = ["queued", "in_progress"]
    for (var i = 0; i < statuses.length; i++) {
      var res = $http.send({ method: "GET", url: runsUrl + "?status=" + statuses[i] + "&per_page=1", headers: authHeaders })
      console.log("gh check statusCode=" + res.statusCode + " total_count=" + res.json.total_count)
      if (res.json.total_count > 0) {
        console.log("deploy already pending, skipping (status=" + statuses[i] + ")")
        e.next(); return
      }
    }
    console.log("dispatching workflow")
    var dr = $http.send({ method: "POST", url: "https://api.github.com/repos/orlando-youth-alliance/site/actions/workflows/deploy.yml/dispatches", headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" }, body: JSON.stringify({ ref: "main" }) })
    console.log("dispatch response statusCode=" + dr.statusCode)
  } catch(err) { console.log("hook error: " + err) }
  e.next();
});
