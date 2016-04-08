// Пример оборачивания функции в песочнице

var fs = require('fs'),
    vm = require('vm');

// Объявляем хеш из которого сделаем контекст-песочницу
var context = {
  module: {},
  console: console,
  setTimeout: setTimeout,
  setInterval: setInterval,
  clearInterval: clearInterval,
  // Помещаем ссылку на fs API в песочницу
  fs: cloneInterface(fs),
  // // Оборачиваем функцию setTimeout в песочнице
  // setTimeout: function(callback, timeout) {
  //   // Добавляем поведение при вызове setTimeout
  //   console.log(
  //     'Call: setTimeout, ' +
  //     'callback function: ' + callback.name + ', ' +
  //     'timeout: ' + timeout
  //   );
  //   setTimeout(function() {
  //     // Добавляем поведение при срабатывании таймера
  //     console.log('Event: setTimeout, before callback');
  //     // Вызываем функцию пользователя на событии таймера
  //     callback();
  //     console.log('Event: setTimeout, after callback');
  //   }, timeout);
  // }
};

// Преобразовываем хеш в контекст
context.global = context;
var sandbox = vm.createContext(context);

var numberFunctionCalls = 0;
var numberCallbacks = 0;
var totalReadData = 0;
var averageCallbacksSpeedReturning = 0;
var time = setInterval(statisticOutput, 1000);

setTimeout(function(){
	clearInterval(time)
}, 7000);

function statisticOutput(){
	console.log('\nNumber function calls: ' + numberFunctionCalls);
	console.log('Number callbacks: ' + numberCallbacks);
	console.log('Total read data: ' + totalReadData);
	console.log('Average speed returning callbacks: ' + averageCallbacksSpeedReturning + ' callbacks / second\n');
};

function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    clone[key] = wrapFunction(anInterface[key].name, anInterface[key]);
  }
  return clone;
};

function wrapFunction(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    if(typeof(args[args.length - 1]) == typeof(Function)){
    	numberCallbacks++;
    	var startTime = process.hrtime();
    	args[args.length - 1] = wrapFunction(args[args.length - 1].name, args[args.length - 1]);
    	var endTime = process.hrtime();	
    	var differenceTime = (endTime[1] - startTime[0]) / 1000000000;
    	// console.log(differenceTime);
    	averageCallbacksSpeedReturning = numberCallbacks / ((numberCallbacks - 1) * averageCallbacksSpeedReturning + differenceTime);
    }
    console.log('Call: ' + fnName);
    if(args[1] instanceof Buffer){
    	totalReadData += args[1].length;
    }
    console.dir(args);
    numberFunctionCalls++;
    fn.apply(undefined, args);
  }
};

// Читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});
