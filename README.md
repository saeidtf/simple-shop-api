# Getting Started with simple shop api

This project was bootstrapped with [saeed taherifard](https://github.com/saeidtf/simple-shop-api).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Api Routes

### users api 

- /users/register
- /users/login

### products api 

- /products/insertBulk // POST
- /products/[?page=1&pageSize=25&q=search]
- /products/:id
- /products/bestSeller/[?limit=10]
- /products/newest/[?limit=10]

### orders api 

- /orders/[?page=1&pageSize=25]
- /orders/:id
- /orders // POST - add new order


### How to

Here's an example to register a user:

```ts
const user = {
    name : 'john',
    family : 'doe',
    email : 'john@test.com',
    password:'123456',
    phone:'09123456789'
}
fetch("http://localhost:3000/users/register",{
    body:JSON.stringify(user),
    method:'POST',
})
  .then(response => response.json())
  .then(json => console.log(json)); // returns a token and user object
```

Here's an example to login a user:
    
```ts
    const user = {
        email : 'john@test.com',
        password : '123456'
    }
    fetch("http://localhost:3000/users/login",{
        body:JSON.stringify(user),
        method:'POST',
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a token and user object

```

Here's an example to insert mock products:

```ts
    fetch("http://localhost:3000/products/insertBulk",{
        method:'POST',
    })
      .then(response => response.json())
      .then(json => console.log(json)); 
```

Here's an example to get products:

```ts
    fetch("http://localhost:3000/products",{
        method:'GET',
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a list of products
```

Here's an example to get products whith params:

```ts
    fetch("http://localhost:3000/products?page=1&pageSize=25&q=search",{
        method:'GET',
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a list of products
```

Here's an example to get product by id:

```ts
    fetch("http://localhost:3000/products/1",{
        method:'GET',
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a product
```

Here's an example to get best seller products:

```ts
    fetch("http://localhost:3000/products/bestSeller?limit=10",{
        method:'GET',
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a list of products
```

Here's an example to get newest products:

```ts
    fetch("http://localhost:3000/products/newest?limit=10",{
        method:'GET',
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a list of products
```

Here's an example to get orders with token in header:

```ts
    fetch("http://localhost:3000/orders",{
        method:'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns a list of orders
```

Here's an example to get order by id with token in header:

```ts
    fetch("http://localhost:3000/orders/1",{
        method:'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
      .then(response => response.json())
      .then(json => console.log(json)); // returns an order items
```
