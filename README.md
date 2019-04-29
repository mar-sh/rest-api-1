# rest-api

## endpoint

No|route|http method|request|response|description|
---|---|---|---|---|---|
1|/api/signup| POST|```body: {username: (string), password: (string)} ```|``` status: (201), user: { userID: (id) ,username:(...)}```| Sign up user
2|/api/signin|POST|```body: {username:(...), password:(...)}```|```status(200), accessToken:(jwt), user: {userID: (id), username:(...)} ```| Sign in and get access token
3|/api/todos/| GET|``` headers: { accessToken: 'Bearer jwt'```| ```status(200), todos: [{title: (...), description:(...)}, {title:(...), description:(...)}, ...{}]``` | Get all users todos
4|api/todos/:id| GET|```headers: {accesToken: 'Bearer jwt'}, params: {id: todo id} ```| ``` status(200), todo: {title:(...), description:(...)}```| Get a todo by its id
5|api/todos | POST| ``` headers: {accessToken: 'Bearer jwt'}, body: { title:(string), description:(string)} ```|```status(201), todo: {title:(...), description:(...)}```| Create a new todo
6|api/todos/:id |PUT| ```headers:{accessToken: 'Bearer jwt'}, body: { updated title:(string), updated description: (string)}```| ```status(200), updated: { title:(...), description:(...)} ```| Update all todo fields by id
7|api/todos/:id |PATCH| ```headers:{accessToken: 'Bearer jwt'}, body: { updated title:(string) or updated description: (string)}```| ```status(200), updated: { title:(...) or description:(...)} ```| Update one or multiple todo fields by id
8|api/todos/:id |DELETE| ```headers: {accessToken: 'Bearer jwt'} ```| ```status(204), content: { none } ```| Delete a todo by id|
