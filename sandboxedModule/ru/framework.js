// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { 
	taskTimeout: setTimeout,
	taskInterval: setInterval,
	clearInterval: clearInterval,
	module: {},
	util: util,
	console: copyObj(console) 
};
context.global = context;
var sandbox = vm.createContext(context);

// Читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  if(err) return console.log(er);
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});

function copyObj(obj){
	var newObj = {};
	for(var i in obj){
		newObj[i] = obj[i];
	}
	return newObj;
}

context.console.log = function(message){
	var time = new Date().toLocaleTimeString();
	console.log(fileName + " " + time + " " + message);
	var file = fs.createWriteStream('result.txt', {flags: 'a+'});
	file.write(" " + fileName + " " + time + " " + message + '\n');
}
