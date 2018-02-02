//connect to mysql
var mysql = require("mysql");
//connect to inquirer
var inquirer = require("inquirer");
//connect to cli-table to display data in a readble format
var Table = require("cli-table");

//connection to mysql database: bamazonDB
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products", function(err, res) {
    if (err) throw err;
    connection.end();
  
//create table to display inventory
var table = new Table({
  //column titles
  head: ["Item ID", "Department Name", "Product Name", "Price", "Stock Quantity"]


});
//push inventory data into new table
for(var i = 0; i < res.length; i++){

  table.push(

    [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]

  );
}

console.log(table.toString());


//call function to display inventory table
promptCustomerPurchase();

});

//create function to validate user's selection (from the name category below)
function validateSelection(name) {
  var integer = Number.isInteger(parseFloat(name));
  var sign = Math.sign(name);
  if (integer && (sign === 1)) {
    return true;
  } else {
    return "Please enter a valid number.";
  }
}

//function to purchase items
function promptCustomerPurchase() {
  //ask user to select product and quantity
  inquirer.prompt([
    {
      type: "input",
      name: "item_id",
      message: "Please enter the ID of the product you wish to purchase.",
      validate: validateSelection,
      filter: Number
    },

    {
      type: "input",
      name: "stock_quantity",
      message: "Please enter the quantity of the product you would like to purchase.",
      validate: validateSelection,
      filter: Number
    },

    //takes users response and checks against inventory to determine if the order can be completed
    ]).then(function(answer) {

        var item = input.item_id;
        var quantity = input.quantity;
          
        //check item_id in mysql bamazonDB
        connection.query("SELECT * FROM products WHERE item_id", function (err, res, fields) {  
            //if an invalid ID is entered the user will be notified
            if (err) console.log(err, "That Item ID doesn't exist, please enter a valid ID.");
            //if item is unavailable alert user 
            if (input[0].item_id < 20) {
            console.log("That item is out of stock.");
            } 
            //if item in available alert user and include price
            else if (input[0].item_id > 20) { 
            console.log("The following item(s) have been purchased: " + res[i].product_name + " " + res[i].price);
            }
        });

    });  

}




