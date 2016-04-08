// Вывод из глобального контекста модуля
console.log('From application global context');

// Объявляем функцию для события таймера
function timerEvent() {
  console.log('From application timer event');
}

// // Устанавливаем функцию на таймер
// setTimeout(timerEvent, 1000);


var fileName = './t.txt';

var read = function() {
  console.log('\nApplication going to read ' + fileName);
  fs.readFile(fileName, function (err, src) {
    console.log('File ' + fileName + ' size ' + src.length);
  });
};



var st = function(){
	console.log('\nstat function module fs demonstration:');
	fs.stat(fileName, function(err, st){
		// console.log(st);
	})
};

var rd = function(){
	console.log('\nreaddir function module fs demonstration:');
	fs.readdir('./', function(err, rd){
		// console.log(rd);
	})
};

setTimeout(st, 1000);
setTimeout(rd, 3000);
setTimeout(read, 5000);


// fs.rename('./READYOU.md', './README.md', function(err, src){
// 	console.log('\nrename function module fs demonstration:');
// 	// console.log(src);
// })

