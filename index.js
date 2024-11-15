const core = require('@actions/core');
const github = require('@actions/github');

//const endpoint = "https://collector.asfaload.com/v1/register-github-release";
//const endpoint = "https://01jcg1ktx4kc77k5w0dpjdrcqq00-8469753c862210be1139.requestinspector.com";
const endpoint = "https://collector.asfaload.com/v1/github_action_register_release";

async function main() {
  const token = await core.getIDToken();
  const defaultOptions = {
    headers: {
      'Authorization': token,
    },
    method: 'POST'
  };
  //let releaseId = github.event.release.id;
  console.log("posting to ", endpoint);
  console.log("token");
  console.log(token);
  try {
    let body = JSON.stringify({ release: github.context.payload.release, repository: github.context.payload.repository })
    let response = await fetch(endpoint, { ...defaultOptions, body: body });
    //let json = await response.json();
    //console.log(`The notification response: ${json}`);
    console.log("body:")
    console.log(body)
    console.log("response text:")
    console.log(await response.text())
    console.log("full context:")
    console.log(github.context)
  } catch (error) {
    core.setFailed(error.message);
  }

}

main();
