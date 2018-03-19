const express = require('express')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let print = (...values) => {
  var RESULT = "";
  values.forEach((value)=>{RESULT += (value + " ")});
  console.log(RESULT);
}

let RESULT = {};
class TextStore {
  constructor() {
    this.children = {};
    this.values = [];

    this._add = (key, value) => {
      // print("Adding", key, value);
      if(!(typeof key === 'string')) {
        // print(key, "is not a string. It is", (typeof key), "Goodbye idiot.");
        return false;
      }
      else if(key.length === 0) {
        this.values.push(value);
        // print("Added", value, "( now", this.values, ")");
      }
      else {
        let current = key.charAt(0);
        if(!this.children.hasOwnProperty(current)) {
          this.children[current] = new TextStore();
        }
        return this.children[current]._add(key.slice(1), value);
      }
    };

    this._remove = (key, value) => {
      if(!(typeof key === 'string')) {
        return false;
      }
      else if(key.length === 0) {
        this.children = this.children.filter(val=>val!==value);
      }
      else {
        let current = key.charAt(0);
        if(!this.children.hasOwnProperty(current)) {
          return false;
        }
        return this.children[current]._remove(key.slice(1), value);
      }
    };

    this._search = (query) => {
      if(!(typeof query === 'string')) {
        return [];
      }
      else if(query.length === 0) {
        this.values.forEach((value)=>{
          RESULT[value] = true;
        });
        Object.keys(this.children).forEach((childKey)=>{
          this.children[childKey]._search(query);
        });
      }
      else {
        let current = query.charAt(0);
        if(!this.children.hasOwnProperty(current)) {
          return [];
        }
        return this.children[current]._search(query.slice(1))
      }
    };

    this._contains = (query, original) => {
      // print("Searching:", query, original);
      if(!(typeof query === 'string' || typeof original === 'string')) {
        // print("Wrong type");
        return false;
      }
      else if(query.length === 0) {
        // print("Hit base case");
        for(var i = 0; i < this.values.length; i++) {
          // print("Checking", this.values[i], original);
          if(this.values[i] === original) {
            return true;
          }
          print(this.values[i], "!===", original);
        }
        // print("Moron", original, JSON.stringify(this.values));
        return false;
      }
      else {
        // print("Checking children");
        // console.log(this);
        let current = query.charAt(0);
        if(!this.children.hasOwnProperty(current)) {
          return false;
        }
        return this.children[current]._contains(query.slice(1), original);
      }
    }

    this.add = (string) => {
      if(this.contains(string)) {
        console.log("Already contains " + string);
        return false;
      }
      // print("Starting add", string);
      this._add(string, string);
      for(var i = 1; i < string.length; i++) {
        this._add(string.slice(i), string);
      }
      return true;
    };

    this.remove = (string) => {
      if(!this.contains(string)) {
        return false;
      }
      this._remove(string, string);
      for(var i = 1; i < string.length; i++) {
        this._remove(string.slice(i), string);
      }
      return true;
    };

    this.search = (query) => {
      RESULT = {};
      this._search(query);
      var keys = Object.keys(RESULT);
      RESULT = {};
      return keys;
    }

    this.contains = (query) => {
      // console.log("Checking if names contains " + query);
      return this._contains(query, query);
    }
  }
}

let NAMES = new TextStore();
let DATA = {
  // "NAME": {
    // alarms: [
    //   "ALARM_1",
    //   "ALARM_1",
    //   "..."
    // ],
    // data: {
    //   "ALARM_1": {
    //     hour: 12,
    //     minute: 45,
    //     enabled: true,
    //     repeat: [false, true, true, true, true, true, false]
    //   },
    //   "ALARM_2": {
    //     hour: 12,
    //     minute: 45,
    //     enabled: true,
    //     repeat: [false, true, true, true, true, true, false]
    //   }
    // }
  // }
};

let addData = (name, data) => {
  if(!NAMES.add(name)) {
    console.log("Couldn't add " + name +", " + JSON.stringify(data));
    return false;
  }
  DATA[name] = data;
  return true;
};

let removeData = (name) => {
  if(DATA.hasOwnProperty(name) && NAMES.remove(name)) {
    delete DATA[name];
    return true;
  }
  return false;
};

let getData = (name) => {
  if(!DATA.hasOwnProperty(name)) {
    return undefined;
  }
  return DATA[name];
}

let searchNames = (query) => {
  return NAMES.search(query);
};

let modifyData = (name, data) => {
  if(!NAMES.contains(name)) {
    return false;
  }
  DATA[name] = data;
  return true;
};

addData("Example", {text:"Example text."});

let encode = (string) => {
  if(string === undefined) {
    return undefined;
  }
  let encoder = new Buffer(string);
  return encoder.toString('base64');
}

let decode = (b64) => {
  if(b64 === undefined) {
    return undefined;
  }
  let decoder = new Buffer(b64, 'base64');
  return decoder.toString();
};

//CREATE
app.post('/api/data/:name', (req, res) => {
  console.log(req.body);
  let name = decode(req.params.name);
  let data = req.body;
  if(!addData(name, data)) {
    res.status(404).send("Problem adding data.");
    return;
  }
  console.log("Added data: " + name);
  console.log(data);
  res.send(getData(name));
});

//READ
app.get('/api/names/:query', (req, res) => {
  res.send(searchNames(decode(req.params.query)));
});

app.get('/api/data/:name', (req, res) => {
  var data = getData(decode(req.params.name));
  console.log(data);
  res.send(data);
});

//UPDATE
app.put('/api/data/:name', (req, res) => {
  var name = decode(req.params.name);
  var data = req.body;
  console.log(data);
  if(!DATA.hasOwnProperty(name)) {
    res.status(404).send("No such data.");
    return;
  }
  if(!modifyData(name, data)) {
    res.status(404).send("Could not modify data.");
    return;
  }
  res.send(data);
});

//DELETE
app.delete('/api/data/:name', (req, res) => {
  if(!removeData(decode(req.params.name))) {
    res.status(404).send("Could not delete data.");
    return;
  }
  res.send(true);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
