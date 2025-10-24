# FFAwards


This readme is trash, so if you're trying to spin it up locally, read the code and resolve the errors till it works lol. I will explain more in details later!

* Windows or Mac
* MUST use Node 20 or higher
* Requires docker to spin up local DynamoDB
* If using Yahoo, you must register the oauth account in your Yahoo account.


### Spinning yourself up, I think

Step 1
 ```text
npm i
```

Step 2
 ```text
docker compose up
```

Step 3
```text
node ./scripts/dynamo_create_table.js`
```

Step 4
 ```text
npm run dev
```

This will spin up an https server on `https://localhost:3000`. Yahoo requires that the callback URL use SSL. So run the following to get some certs and keys


```sh
openssl req -x509 -newkey rsa:2048 -nodes -keyout server.key -out server.crt -days 365 -subj "/CN=localhost"
```

Step 5
```text
cd client
```

Step 6
```text
npm i
```

Step 7
```text
npm run dev
```

This will spin up the React frontend on `https://localhost:5173`

### Website Inspiration/Ideas

* https://fhelper.azurewebsites.net/
* https://legends-league.vercel.app/records/
* Example of awards to give: https://docs.google.com/document/d/1kvMU1ebQIXEinpOBMqUY23kqOGiq4euA/edit?usp=sharing&ouid=112714707424319647843&rtpof=true&sd=true

