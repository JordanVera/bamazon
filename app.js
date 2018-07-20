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
		start();
	})
})


const start = function () {
	connection.query('SELECT * FROM inventory', function(err, result, fields) {
		inquirer.prompt(questions)
		.then(answers => {
			console.log(JSON.stringify(answers,null,'  '));
			for (let i = 0; i < result.length; i++) {
				if (result[i].item_id == answers.item_id) {
					
					connection.query('UPDATE inventory SET ? WHERE ?', [{
						volume: result[i].volume - answers.quantity
					},{
						volume: result[i].volume
					}] 
					,function(err, result, fields) {
						if (err) {
							throw err;
						}
					})
				}
			}
		});
	})
}


/* 
function validateInventory() {
	let validateIDs = []
  	for (var i = 0; i < result.length; i++) {
		validateIDs.push([result[i].item_id, result[i].volume])
  		if (answers.item_id == result[i].item_id) {
			console.log('Congrats, you made a purchase')
		}
	}
	
	console.log(validateIDs)
}

validateInventory()
 */
 
const questions = [
	  {
		type: 'input',
		name: 'item_id',
		message: `${chalk.cyan('What is the ID of the product you would like to purchase?')}`,
		validate: function (value) {
			if (isNaN(value) == false) return true;
			else return false;
		}
	},
	{
		type: 'input',
		name: 'quantity',
		message: `${chalk.cyan('How many units would like to purchase?')}`,
		default: function () {
			return 1
		},
			validate: function (value) {
			if (isNaN(value) == false) return true;
			else return false;
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
