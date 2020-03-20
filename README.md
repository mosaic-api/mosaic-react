                                        
          |‾‾‾‾‾\  /‾‾‾‾‾|  |‾‾‾‾‾‾‾‾‾|  |‾‾‾‾‾‾‾‾‾|  |‾‾‾‾‾‾‾‾‾|  |‾‾|  |‾‾‾‾‾‾‾‾‾|  
          |   |\ \/ /|   |  |  |‾‾‾|  |  | |‾‾‾‾‾‾‾   |  |‾‾‾|  |  |  |  |   ______|
          |   | \  / |   |  |  |   |  |  |  ‾‾‾‾‾‾‾|  |   ‾‾‾   |  |  |  |  |
          |   |  \/  |   |  |  |   |  |  |_______  |  |  |‾‾‾|  |  |  |  |  |
          |   |      |   |  |  |___|  |   _______| |  |  |   |  |  |  |  |   ‾‾‾‾‾‾|
          |___|      |___|  |_________|  |_________|  |__|   |__|  |__|  |_________|
          

                               ___      ___        ____________      _____________       _____       ____    ____________
                              /   \    /   \      |  _______   |   /   ___________|     /     \      |  |   |   ________/
                             /  /\ \  / /\  \     |  |      |  |  |   /___________     /  /\   \     |  |   |  |
                            /  /  \ \/ /  \  \    |  |      |  |  | ___________  |    /  /__\   \    |  |   |  |
                           /  /    \__/    \  \   |  |______|  |   ___________/  |   /  ______   \   |  |   |  |__________
                          /__/              \__\  |____________|  |_____________/   /__/       \__\  |__|   |____________/




# Things to come. Future Features.
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
[]loading spinners
  []loading user boards
  [x]deleteing userboards
  [x]saving boards
  [x]login
[]try/catches on all calls
[]change catch errors to onscreen messages
[]refactor code and clean up
[]landscape or lock landscape
[]clean up README.md
[]rename files
[]reorganize layout
[]fade in title
[]picture on landing page and/or logo
[]more options for music
[]remove black, white, gray, (and super dark/light color?)
[]name it your saved board (overrideable name)

*stretch* ability to share; share something that's playable



# Mosaic

## Chris, Cody, Joe, and Scott

### It's a F@#cking Relaxtion Color App, just....just play it

### Problem Domain: Stress in a stressfull world! Don't you just wanna set aside your worries and take the edge off modern life?? Well there are drugs for that, but in the meantime there is ... Mosaic :)

### To Play click: https://the-mosaic.herokuapp.com/

### Version 1.0.0 

### Front End Dependencies: 
```
{
    "@material-ui/core": "^4.9.5",
    "@material-ui/icons": "^4.9.1",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.4.1",
    "@testing-library/user-event": "^7.2.1",
    "enzyme": "^3.11.0",
    "enzyme-adapter-react-16": "^1.15.2",
    "react": "^16.13.0",
    "react-dom": "^16.13.0",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.4.0",
    "react-test-renderer": "^16.13.0",
    "superagent": "^5.2.2"
  },
```
### Back End Dependencies:
```
{
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jest": "^25.1.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.9.1",
    "pg": "^7.12.1",
    "string-hash": "^1.1.3",
    "superagent": "^5.1.0",
    "supertest": "^4.0.2"
  },
```

### API Endpoints: 
```
    export async function getRandomColor() {
        const generateHex = Math.floor(Math.random()*16777215).toString(16);
        return await request.get(`https://www.thecolorapi.com/id?hex=${generateHex}`);
    }
    export async function getScheme(hex, mode) {
      const cleanHex = hex.slice(1)
      const schemeData = await request.get(`https://www.thecolorapi.com/scheme?hex=${cleanHex}&mode=${mode}&count=6`);
      return schemeData.body.colors.map(color => color.hex.value)
    }
```

### BackEnd Endpoints:
```
const URL = 'https://mosaic-node-db.herokuapp.com/api'

    export async function signin(user) {
      return await request.post(`${URL}/auth/signin`, user)
    }
    export async function signup(user) {
      return await request.post(`${URL}/auth/signup`, user)
    }
    export async function saveBoard(stateObject, user) {
      return await request.post(`${URL}/user/saved`, stateObject).set('Authorization', user.token)
    }
    export async function updateBoard(stateObject, user, id) {
      return await request.put(`${URL}/user/saved/${id}`, stateObject).set('Authorization', user.token)
    }
    export async function getBoards(user) {
      return await request.get(`${URL}/user/saved`).set('Authorization', userCheck.token)
    }
    export async function deleteBoard(id, user) {
      return await request.delete(`${URL}/user/saved/${id}`).set('Authorization', user.token)
    }
```

### Boards Database structure
![BoardsDB](./public/Boards-DB-ScreenShot.png "boards database")

### Users Database structure
![UsersDB](./public/Users-DB-ScreenShot.png "users database")

## MIT License
### Copyright 2020 The Mosaic

##### Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

##### The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

##### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



