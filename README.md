# Mongoose Express CRUD

## Objective

Develop a Node.js Express application using TypeScript and MongoDB with Mongoose. Ensure data integrity through validation using Joi/Zod.

### Project Setup

Create a new Node.js Express project.

Set up a MongoDB database using Mongoose for storing user and order data.

Data Models

User Data Model

```
userId (number)
username (string)
password (string)
fullName (object)
firstName (string)
lastName (string)
age (number)
email (string)
isActive (boolean)
hobbies (array of strings)
address (object)
street (string)
city (string)
country (string)
orders (array of objects)
productName (string)
price (number)
quantity (number)
```

User Management & Order Management

1. Create a New User

   Endpoint: POST /api/users

2. Retrieve a List of All Users

   Endpoint: GET /api/users

3. Retrieve a Specific User by ID

   Endpoint: GET /api/users/:userId

4. Update User Information

   Endpoint: PUT /api/users/:userId

5. Delete a User

   Endpoint: DELETE /api/users/:userId

6. Add New Product in Order
   Endpoint: PUT /api/users/:userId/orders

7. Retrieve All Orders for a Specific User

   Endpoint: GET /api/users/:userId/orders

8. Calculate Total Price of Orders for a Specific User

   Endpoint: GET /api/users/:userId/orders/total-price

##

## API Documentation

- [Postman Collection](./docs/postman.json)
