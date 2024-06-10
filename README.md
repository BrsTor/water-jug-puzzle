                     
<h1 align="center" style="font-weight: bold;">Water Jug Puzzle 💻</h1>


<p align="center">This is an API REST that solves the water jug puzzle implementing the Stein's Algorithm and the Breadth First Search graph traversal algorithm. Developed with NestJS and TypesScript</p>


 
<h2 id="technologies">💻 Technologies</h2>

- NestJS
- TypeScript
- Jest
 
<h2 id="started">🚀 Getting started</h2>

Make sure you have installed the prerequisites and executed the following commands.
 
<h3>Prerequisites</h3>

This are necessary for running this project.

- [NodeJS](https://nodejs.org/en/download/package-manager)
- [Git 2](https://www.git-scm.com/downloads)
- [NestJS](https://docs.nestjs.com/#installation)
 
<h3>Cloning</h3>

Clone the project with the following command

```bash
git clone https://github.com/BrsTor/chicks-design.git
```
 
<h3>Starting</h3>

Go to the project folder

```bash
cd water-jug-puzzle
```

Install the dependencies
```bash
npm install
```

Start the development server
```bash
npm run start:dev
```

If you want to start in debug mode
```bash
npm run start:debug
```

If you want to start in production mode
```bash
npm run start:prod
```
<h3>Testing</h3>

Go to the project folder

```bash
cd water-jug-puzzle
```

Install the dependencies
```bash
npm install
```

To run all the test of the project
```bash
npm run test
```

To run test in watch mode
```bash
npm run test:watch
```

To visually see the coverage of the tests
```bash
npm run test:cov
```

If you want to start in production mode
```bash
npm run start:prod
```
 
<h2 id="routes">📍 API Endpoints</h2>

This is the only request accepted by the server
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /solver/solution</kbd>     | Finds a solution to the water jug puzzle with the parameters requested [request details](#post-solver-detail)

<h3 id="post-solver-detail">POST /solver/solution</h3>

**REQUEST**
```json
{
    "x_capacity": 3,
    "y_capacity": 5,
    "z_amount_wanted": 4
}
```

**RESPONSE**
```json
{
    "solution": [
        {
            "step": 1,
            "bucketX": 0,
            "bucketY": 5,
            "action": "Fill Bucket Y"
        },
        {
            "step": 2,
            "bucketX": 3,
            "bucketY": 2,
            "action": "Transfer 3 from Bucket Y to Bucket X"
        },
        {
            "step": 3,
            "bucketX": 0,
            "bucketY": 2,
            "action": "Empty Bucket X"
        },
        {
            "step": 4,
            "bucketX": 2,
            "bucketY": 0,
            "action": "Transfer 2 from Bucket Y to Bucket X"
        },
        {
            "step": 5,
            "bucketX": 2,
            "bucketY": 5,
            "action": "Fill Bucket Y"
        },
        {
            "step": 6,
            "bucketX": 3,
            "bucketY": 4,
            "action": "Transfer 1 from Bucket Y to Bucket X",
            "status": "Solved"
        }
    ]
}
```

<h3 id="post-solver-detail">POST /solver/solution. BadRequest</h3>

**REQUEST**
```json
{
    "x_capacity": 3,
    "y_capacity": 5,
    "z_amount_wanted": 6
}
```

**RESPONSE**
```json
{
    "message": "No solution.",
    "error": "The value of the amount wanted (6), can't be greater than the capacities of the jugs (3, 5).",
    "statusCode": 400
}
```

<h3 id="post-solver-detail">POST /solver/solution. BadRequest</h3>

**REQUEST**
```json
{
    "x_capacity": 2,
    "y_capacity": 8,
    "z_amount_wanted": 3
}
```

**RESPONSE**
```json
{
    "message": "No solution.",
    "error": "The value of the amount wanted (3), must be a multiple of the GCD (2) of the jugs (2, 8).",
    "statusCode": 400
}
```

<h3 id="post-solver-detail">POST /solver/solution. GatewayTimeout</h3>

It happens if the solver takes more than 5  seconds.

**RESPONSE**
```json
{
    "message": "Timeout",
    "error": "The algorithm took too long to find a solution.",
    "statusCode": 504
}
```
 
<h2 id="contribute">📫 Contribute</h2>

Here you will explain how other developers can contribute to your project. For example, explaining how can create their branches, which patterns to follow and how to open an pull request

1. `git clone https://github.com/BrsTor/water-jug-puzzle.git`
2. `git checkout -b feature/NAME`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
 
<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[📝 Commit pattern](https://www.conventionalcommits.org/en/v1.0.0/#summary)

[📝 NestJS documentation](https://docs.nestjs.com/)

[📝 Jest documentation](https://jestjs.io/docs/getting-started)
