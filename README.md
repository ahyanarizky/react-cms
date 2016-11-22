# Online House Selling

## Install Global Package

```
npm install -g nodemon liveserver express-generator bower
```

## Run Server

```
npm install
npm start
```

## Run Client

```
bower install
live-server
```

## Models

### user

```
const User = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
})
```

### data

```
const Data = new Schema({
    letter: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true,
    }
})
```

### dataDate

```
const dateDate = new Schema({
    letter: {
        type: Date,
        required: true
    },
    frequency: {
        type: Number,
        required: true,
    }
})
```

## Routing

### API user

| Endpoint              | HTTP      | Description               |
| ----------            | -----     | ------------              |
| api/user/login             | POST       | Login User             |
| api/user/register          | POST      | Create User              |

### API data

| Endpoint              | HTTP      | Description               |
| ----------            | -----     | ------------              |
| api/data/seed        | GET       | Create Dummy Data   |
| api/data             | GET       | Get All Data             |
| api/data             | POST      | Create Data              |
| api/data             | DELETE    | Delete All Data          |
| api/data/:dataId    | DELETE    | Delete House By dataId   |
| api/data/:dataId    | PUT       | Update House By dataId   |

### API dataDate

| Endpoint              | HTTP      | Description               |
| ----------            | -----     | ------------              |
| api/dataDate/seed        | GET       | Create Dummy Data Date   |
| api/dataDate             | GET       | Get All Data Date            |
| api/dataDate             | POST      | Create Data Date             |
| api/dataDate             | DELETE    | Delete All Data Date         |
| api/dataDate/:dataDateId    | DELETE    | Delete House By dataDateId   |
| api/dataDate/:dataDateId    | PUT       | Update House By dataDateId   |