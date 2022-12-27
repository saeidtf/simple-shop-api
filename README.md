# Getting Started with simple shop api

This project was bootstrapped with [saeed taherifard](https://github.com/saeidtf/simple-shop-api).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Api Routes

### users api 

/users/register
/users/login

### products api 

/products/insertBulk // POST
/products/[?page=1&pageSize=25&q=search]
/products/:id
/products/bestSeller/[?limit=10]
/products/newest/[?limit=10]

### orders api 

/orders/[?page=1&pageSize=25]
/orders/:id
/orders // POST - add new order


