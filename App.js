// OGÓLNA FUNKCJA

/*
serwer wykona id za nas, ta fcja nie jest juz potrzebna

function randomString() {

	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	var str = '', i;
	for (i = 0; i < 10; i++) {
	  str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}

*/


var baseUrl = 'https://kodilla.com/pl/bootcamp-api';

var myHeaders = {

  'X-Client-Id': '2427',
  'X-Auth-Token': '8610cf31d82f799089cdcba61e636e7e'

};



/*
Każde zapytanie, które wykonamy, będzie musiało mieć w sobie nagłówki (myHeaders).
 JQuery daje opcję dodania tych nagłówków bez konieczności umieszczania ich w każdym zapytaniu osobno.
 Funkcja, która za to odpowiada, to metoda ajaxSetup().
*/
$.ajaxSetup({

	headers: myHeaders
});



$.ajax({

	url : baseUrl + '/board',
	method: 'GET',
	success: function(response) {

		setupColumns(response.columns);

		/*
			ze sposobu dzialania $.ajax() fcja przypisana do 'success' otrzymuje to, co zwroci serwer.
			te odpowiedz serwera(obiekt tablicę) zapisujemy jako parametr response, a nastepnie wewnatrz fcji anonimowej
			tworzymy setupColumns gdzie juz jako parametr bierzemy tablicę 'columns' z tablicy calej odpowiedzi 
		*/
	}
});


function setupColumns(columns) {  // tablica 'response.columns' z danymi opisujacymi kolumny juz przekazana do 'setupColumns', mozemy sobie skrocic do 'columns'

	columns.forEach(function(item) {   // dla kazdego itemu w tablicy wykonaj 

		var col = new Column(item.id, item.name);
		board.createColumn(col);

		setupCards(col, item.cards);

	/*
		item to tylko dane

		new Column służy do tego aby utworzyć element i umieścić go na stronie (this.$element)
		  
		var col wskazuje na obiekt (id, name, $element, metody), aby móc się do niego odwołać
		Przekazujemy do `Column(item.id, item.name);` parametry id i name, bo takich oczekuje konstruktor
		a item to tylko obiekt z danymi póki co
	*/

	});
}


function setupCards(col, cards) {  
 /* nie ma sensu dalej ciagnac nazwy parametru 'item.cards', wiec skrocimy do 'cards'.

 	var col co prawda byla utworzona jako lokalna zmienna, ale na koncu setupColumns 
 	przekazalismy ta zmienna tutaj, wiec nie bedzie problemu z 'var cards is undefined'
*/	
	
	cards.forEach(function(item) { // dla kazdego itemu w tablicy wykonaj 

		var card = new Card(item.id, item.name, item.bootcamp_kanban_column_id);
		col.createCard(card);
	});



}  								
								










