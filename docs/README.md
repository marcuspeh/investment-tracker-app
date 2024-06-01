# Technical Design Document

## Introduction
This app will be based on offline first software paradigm where data will be stored locally and synced to the cloud when there is a network connection. 

## Database design 
![db design](schema.png)

In addition, each of the object will have `created_at`, `updated_at` and `deleted_at` fields.

### Conflict resolution
For conflict resolution, it will be based on the following:
1) Delete
2) Modification based on `update_time`

Note, primary keys designate object identity. If primary key of object is the same for both sides, then they are treated as the same object.

## Technicals

### User account
Since it is not mandatory to create an accout, there will be a default user created when the app is first opened. Since the user is not logged in, the data from the local db will not be sync to the cloud.

The creation of the user will only be created when the user has network connection. The creation will update all `user_id` fields where it is equal to the default `user_id` in the local db before the sync to the cloud happens.

### All Portfolio page
This page wil require a fetch of portfolios created by the user and add display their name and description. 

In a future iteration, we will be displaying the market value and P/L information of the portfolio, 

### Overview page
This page will retrieve all the financial instruments and transactions to display the following information:
* P/L (realised and unrealised)
* Dividends received and chart
* Pie chart for breakdown of stock along with by specific stocks


### Custom financial instruments page (WIP)
This page will allow the creation of financial instruments that is not available in the market.

It will also allow the adding of prices at a specific date, as well as dividends.

For prices entered, suppose time t has price x and at t + 10, price is y,  price will x between t to t + 9