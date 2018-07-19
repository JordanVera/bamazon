require('console.tablefy')

const fs = require('fs'),
	  inquirer = require('inquirer'),
	  chalk = require('chalk'),
	  mysql = require('mysql'),
	  hipsterProductCreator = require('hipster-product-creator'),
	  chalkPipe 	= require('chalk-pipe');
	  
// hipsterProductCreator(10)

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "Gcm9jg=gk3b8",
	database: "bamazon"
})

connection.connect(function(err) {
	if (err) throw err;
	
	connection.query('SELECT * FROM inventory', function(err, result, fields) {
		if (err) throw err;
		console.tablefy(result);
//		createProduct()
		inquirer.prompt(questions).then(answers => {
		  // This is where the magic happens
		  console.log(JSON.stringify(answers, null, '  '));
		});
	})
})

const questions = [
  {
    type: 'input',
    name: 'item_id',
    message: `${chalk.cyan('What is the ID of the product you would like to purchase?')}`	
  },
  {
    type: 'input',
    name: 'quantity',
    message: `${chalk.cyan('How many units would like to purchase?')}`,
    default: function() {
      return 1
    }
  },
];







// CRUD f(x)
//function createProduct() {
//	let query = connection.query(
//	'INSERT INTO inventory SET ?',
//	{
//		product_name: 'versace belt',
//		department_name: 'designer',
//		price: 425,
//		volume: 2
//	},
//	function(err, res) {
//	      updateProduct();
//	    }
//	)
//}
//
//function updateProduct() {
//  var query = connection.query(
//    "UPDATE inventory SET ? WHERE ?",
//    [
//      {
//        product_name: 'versace belt'
//      },
//      {
//        department_name: 'designer'
//      },
//	  {
//	    price: 425
//	  },
//	  {
//	    volume: 2
//	  }
//    ],
//    function(err, res) {
//      deleteProduct();
//    }
//  );
//}
