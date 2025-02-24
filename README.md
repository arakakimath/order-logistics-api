# order-logistics-api
Last challenge of Rocketseat Node.js course, in which the student has to develop an api, for a ficticious delivery company called FastFeet, to manage related issues

---

## Functional Requirements

- [ ] Application must have two roles for users: admin and/or delivery person
- [ ] It should be possible to sign in with CPF (National ID) and password
- [ ] It should be possible to perform the CRUD of the delivery people
- [ ] It should be possible to perfome the CRUD of the orders
- [ ] It should be possible to perform the CRUD of the recipients
- [ ] It should be possible to flag an order as awaiting (Available for pickup)
- [ ] It should be possible to pickup an order
- [ ] It should be possible to flag an order as delivered
- [ ] It should be possible to flag an order as returned
- [ ] It should be possible to list orders whose delivery addresses are close to the delivery person
- [ ] It should be possible to change user's password
- [ ] It should be possible to list user's orders
- [ ] It should be possible to notify recipient on every order status change

## Business Rules

- [ ] Only admin users can perform CRUD of the orders
- [ ] Only admin users can perform CRUD of the delivery people
- [ ] Only admin users can perform CRUD of the recipients
- [ ] A photo is needed to flag an order as delivered
- [ ] Only the delivery person who picked up the order can flag it as delivered
- [ ] Only admin users can change an user's password
- [ ] It should not be possible to a delivery person to list another one's orders
