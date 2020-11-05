# Risk Profile Project

This project determines the user’s insurance needs by asking personal & risk-related questions and gathering information about the user’s vehicle and house. Using this data, determines their risk profile for each line of insurance and then suggests an insurance plan ("economic", "regular", "responsible") corresponding to her risk profile.

# Requirements
Node >= 10.0.0

# Starting the project
* Make a pull of this repository and install dependencies `npm install`.
* Create a .env file and copy data from env-example.
* You can start in two ways
1. Running in a developer environment `npm run dev`. 
2. Running in a production environment `npm run build` after that `npm start`.
* Send a POST request to `http://localhost:3000/risk-profile` with the payload below to validate this job.
### INPUT
```
{
  "age": 35,
  "dependents": 2,
  "house": {"ownership_status": "owned"},
  "income": 0,
  "marital_status": "married",
  "risk_questions": [0, 1, 0],
  "vehicle": {"year": 2018}
}
```

### OUTPUT
```
{
    "auto": "regular",
    "disability": "ineligible",
    "home": "economic",
    "life": "regular"
}
```

# Testing your app
* You can start in four ways
1. Running just unit tests `npm run test:unit`. 
2. Running just integration tests `npm run test:integration`.
3. Running just functional(end to end) tests `npm run test:functional`.
4. Running all tests `npm test`.


# TODO
* Create an `infrastructure` domain to manipulate and save the Risk Profile in the Database. (Here we can use the Singleton pattern).
* Implement inversify.js to make dependency inversion clearer.
* Implements use cases based on Nodejs Events.
