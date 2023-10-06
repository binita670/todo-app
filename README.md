# Todo Application

This is a simple todo application built using nodejs, express, typescript, postgressql.
# Installation

To start the application follow these steps:
  
1. Clone the repository :

```bash
git clone https://github.com/binita670/todo-app
```

2.  Install the dependencies :
```bash
cd todo-app
npm install
```

3. Create configuration file `'default.json'` and copy the contents from `'default.example.json'` to the new file (inside `config` directory).

5. Run Migrations :
> Note: Create a database named **`todo-app`** (or the database name you have in previously created config file) in PostgreSQL.

```bash
npm run migration:run
```

6.  Start the development server
```bash
npm run dev
```

# For Test Cases

1.   Create configuration file `'test.json'` and copy the contents from `'test.example.json'` to the new file (inside `config` directory).

2.  Create a database named **`test-todo-app`** (or the database name you have in previously created config file) in PostgreSQL.

3. Run unit tests:
```bash
npm run test:unit
```

4. Run e2e tests:
```bash
npm run test:e2e
```