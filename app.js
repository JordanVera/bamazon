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

// CRUD F(X)

const start = function () {
	connection.query('SELECT * FROM inventory', function(err, result, fields) {
		inquirer.prompt(questions)
		.then(answers => {
			
//			console.log(JSON.stringify(answers,null,'  '));

			for (let i = 0; i < result.length; i++) {
				if (result[i].item_id == answers.item_id  && result[i].volume >= answers.quantity) {
					
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
					let totalCost = result[i].price * answers.quantity
					console.log(`${chalk.greenBright('Thank you, your purchase was succesful')}`)
					console.log(`${chalk.greenBright(`total cost: ${totalCost}`)}`)
				} else if (result[i].item_id == answers.item_id  && answers.quantity > result[i].volume) {
					console.log(`${chalk.redBright('We do not have enough volume at the moment to fulfill your order, sorry for the inconvenience.')}`)
				}
			}
		});
	})
}

 
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