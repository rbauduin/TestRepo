const core = require('@actions/core');
const github = require('@actions/github');

//const endpoint = "https://collector.asfaload.com/v1/register-github-release";
const endpoint = "https://01jcg1ktx4kc77k5w0dpjdrcqq00-8469753c862210be1139.requestinspector.com";

async function main() {
  const token = await core.getIDToken();
  const defaultOptions = {
    headers: {
      'Authorization': token,
    },
    method: 'POST'
  };
  //let releaseId = github.event.release.id;
  console.log(github.context)
  try {
    let response = await fetch(endpoint, { ...defaultOptions, body: JSON.stringify({ release: github.context.payload.release }) });
    //let json = await response.json();
    //console.log(`The notification response: ${json}`);
    console.log(await response.text())
  } catch (error) {
    core.setFailed(error.message);
  }

}

main();
