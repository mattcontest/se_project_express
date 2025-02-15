# WTWR (What to Wear?): Back End

This is a Node.js & Express backend application that allows users to manage clothing items based on different weather conditions. Users can create, update, delete, and like/dislike clothing items, while also linking them to their profiles. The application uses MongoDB as the database and provides a RESTful API for handling users and clothing items.

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

## Features

- Create, read, update, and delete clothing items.
- Users can like or dislike clothing items.
- Items are categorized by weather conditions.
- User profiles with linked clothing items.

---

## Technologies Used

- **Node.js** and **Express.js** for the server.
- **MongoDB** and **Mongoose** for the database.
- **Nodemon** for development.

---

## Running the Project

1. Clone the repository:
   ```bash
   git clone https://github.com/mattcontest/clothing-items-backend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file with your MongoDB URI.
4. Run the server in development mode:
   ```bash
   npm run dev
   ```

---

## AClothing Items Backend API Endpoints

### Users

- **GET** `/users` – Retrieve all users.
- **POST** `/users` – Create a new user.

### Clothing Items

- **GET** `/items` – Retrieve all clothing items.
- **POST** `/items` – Create a new clothing item.
- **DELETE** `/items/:id` – Delete a clothing item.
- **PUT** `/items/:id/likes` – Like an item.
- **DELETE** `/items/:id/likes` – Dislike an item.

---

## Error Handling

- **404** – Resource not found.
- **400** – Bad request.
- **500** – Internal server error.

---

## Future Improvements

- Add user authentication.
- Implement more detailed weather data integration.
- Enhance API documentation.

---

## Author

[MattCo] – [Check My Portfolio](https://github.com/mattcontest)
