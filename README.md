# movie-app-CRUD

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the Repository:**
```bash
git clone https://github.com/yourusername/CRUD-APP-1.git
```

2. **Install Dependencies:**
Navigate to the project directory and install both frontend and backend dependencies:

cd movie-app-CRUD ->
cd movies-interface -> 
npm install

cd ../backend ->
npm install

### Database Export

The project includes exported MongoDB collections in the `data` directory. These exports contain the necessary data to run the application.

### Importing the Database

1. Make sure you have MongoDB installed and running locally.

2. Open your terminal and navigate to the `bin` directory of your MongoDB installation, typically located at `C:\Program Files\MongoDB\Server\<version>\bin`.

3. Use the following command to import the collections from your remote MongoDB instance:

    ```bash
    mongorestore --uri "mongodb+srv://admin:RnGj0FHQWVFA11cp@cluster0.0fmqc9v.mongodb.net/moviesdbms" --nsInclude "movies.*" --nsInclude "users.*" --dir "C:\Users\kappal\Documents\CRUD APP 1\data"
    ```

    - Replace `"mongodb+srv://admin:RnGj0FHQWVFA11cp@cluster0.0fmqc9v.mongodb.net/moviesdbms"` with your actual MongoDB URI.
    - Make sure to include all the collections you want to import in the `--nsInclude` flags.
    - Adjust the `--dir` flag to point to the correct folder where the data exports are stored.

4. The command will import the specified collections into your local MongoDB instance.

### Run the Application

Start both the frontend and backend servers:


## Usage
Login

![Screenshot (548)](https://github.com/abdrhxyii/movie-app-CRUD/assets/108976320/06d33032-e059-405a-8f57-e0c211d1f7db)

Signup

![Screenshot (549)](https://github.com/abdrhxyii/movie-app-CRUD/assets/108976320/21967e7f-fafb-4057-9203-04f1fb201ab8)

All Movies

![Screenshot (550)](https://github.com/abdrhxyii/movie-app-CRUD/assets/108976320/322013e6-aa18-4dc7-bc78-074d76292bf9)

Add new movies

![Screenshot (551)](https://github.com/abdrhxyii/movie-app-CRUD/assets/108976320/62768518-e384-4b19-ae2b-5c9a6a48a293)

Update existing movies

![Screenshot (552)](https://github.com/abdrhxyii/movie-app-CRUD/assets/108976320/d6d4feac-bb46-4b8b-b1ee-7298dd334f1a)




