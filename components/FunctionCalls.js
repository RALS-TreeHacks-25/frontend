const baseURL = "http://localhost:5001/rals-treehacks-25-57224/us-central1"

export async function createUser(user) {
  console.log(baseURL+"/usersApi/createUser")

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json")

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(user),
    redirect: 'follow'
  }

  let res =  await fetch(baseURL+"/usersApi/createUser", requestOptions)

  return res
}