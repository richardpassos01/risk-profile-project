# Personal Notes

Here are some notes I had taken while I was developing for the code challenge.

I am more familiar with nodejs, so I chose to use it, for this project I found it more appropriate to create an object-oriented application, so I chose to use typescript and not javascript.

Also, in some topics, I've left alternatives that I could have chosen and the reasons that I haven't opted for them.

# Main technical decisions - Architecture
* I thought of three ways to do this project.
1. I could create an Object Mapping to map all the Insurance Rules and provide a summary of that.
2. I could create an SOLID app not many decouple, but with the use cases isolates and more scalable.
3. I could create an SOLID app more decouple, with inside use cases communication through Events.

Today I'm working in a code similar to the first option, and this code is very complex to new employers' maintenance it, understand the business rules and create new features.

SOLID concepts are the best choice for this type of project, as you can isolate business rules and have more flexibility to maintain them, it is also safer and simpler to create the tests.

If you use a large internal communication through Events, it will be much more complex to do and at that point it will become a great overengineering.

Because of these reasons, I prefer to choose the second option.

# Main technical decisions - Tests
* **Functional**: I created this directory to test the application end-to-end and validate the required entry criteria.
```
  * Age (an integer equal or greater than 0).
  * The number of dependents (an integer equal or greater than 0).
  * Income (an integer equal or greater than 0).
  * Marital status ("single" or "married").
  * Risk answers (an array with 3 booleans).
```

* **Integration**: I created this directory to test the small integration between use cases, here I test the main functionalities of the application and its integrity. 
```
  * If the user is under 30 years old, deduct 2 risk points from all lines of insurance. If she is  * between 30 and 40 years old, deduct 1.
  * If her income is above $200k, deduct 1 risk point from all lines of insurance.
  * If the user's house is mortgaged, add 1 risk point to her home score and add 1 risk point to her disability score.
  * If the user has dependents, add 1 risk point to both the disability and life scores.
  * If the user is married, add 1 risk point to the life score and remove 1 risk point from disability.
  * If the user's vehicle was produced in the last 5 years, add 1 risk point to that vehicle’s score.
```

* **Unit**: Here I test the other business rules and small functionalities in a unitary form.
```
  * First, it calculates the base score by summing the answers from the risk questions, resulting in a  number ranging from 0 to 3. Then, it applies the following rules to determine a risk score for each  line of insurance.
  * If the user doesn’t have income, vehicles or houses, she is ineligible for disability, auto, and  home insurance, respectively.
  * If the user is over 60 years old, she is ineligible for disability and life insurance.
```

My focus was not on testing the entire application, I preferred to test the business rules rather than doing 100% test coverage

# Attention Point
* **income Rule**: 
  The rule specifies that the number must be an integer greater than or equal to 0.
  Then we found that if the user's income are greater than 200k, 1 risk points will be deducted for you profile.
  I considered 200000 to be 200k on my solution.
  I also made a block to allow only integer numbers as requested, so if the user sends 200.00 in the payload, it will   not work.
  If the client sends a value from 0 to 200000, I will consider it to be below the expected value to deduct risk  points, if sending 200001 it will enter the condition to deduct 1 risk point

* **Scripts to running Tests**:
  Before running the tests, to prevents reference errors I always delete the build folder (rm -rf build /).
  If your computer does not accept this command, remove the npm run prebuild from within the tests script.
  The intention is to run in a docker environment with linux

# The solution
The risk calculation is started in the use case 'ProvideRiskProfileForInsurances', at that moment I create a RiskProfile instance and link it to the use cases.
At each step of the flow I record what happened to be able to follow the flow at the terminal (later in a grayLog or kibana).


# Architecture
* **application**: In this directory I isolate the files that belong to the app's responsibilities, such as server, error handler, logger, controller, router and middleware. (**DDD** pattern).
The `container` folder represents a Inversion of dependency Factory, so in this folder I start the use cases, controller, etc. (SOLI**D** - dependency inversion principle). In the future, we can change this to an [inversify](https://www.npmjs.com/package/inversify), for example.

* **domain**: In this directory, I isolated the files that contain the Business Rules.
The `shared` folder is a shared directory that can be used in any context, within this folder there are global configurations such as env vars setups and all the enumerators of the software.

Inside the `user` folder you have all the business rules about the user, including their model and 
interfaces, and also their schema validation.

The `riskProfile` folder looks `user` folder, contains an isolated domain, inside this folder you have a riskProfile model, you interfaces, **DTO** (data transfer object), domain specific errors and their use cases.

cases' is a pattern similar to the service pattern, it keeps the business rules of the code, but different from the service pattern that couples everything in a single file, this it isolates each rule in a use case.
These use cases are respecting the single responsibility (** S ** OLID), also respecting the open / closed principle (S**O**LID).

The `Repository.ts` is the file that communicates the domain with external things (SO**L**ID - Liskov Substitution Principle), this file respects the interface segregation principle (SOL**I**D).
I do something similar with LoggerDTO inside the `Contract.ts` file.
