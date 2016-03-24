// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');

taskTimeout(function(){
	console.log("Timeout")
}, 1000);

var timeId = taskInterval(function(){
	console.log("Interval")
}, 2000);

taskTimeout(function(){
	clearInterval(timeId)
}, 7000);

var obj = {
	a: 'Lab',
	b: 1,
	c: 'task',
	d: 2123
}
obj.self = obj;
console.log(util.inspect(obj));
console.log(util.isNull(obj));
console.log(util.isDate(obj));
console.log(util.isObject(obj));

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};