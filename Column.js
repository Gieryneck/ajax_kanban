function Column(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Brak nazwy';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		var columnChangeName = $('<button class="column-change-name">Zmień nazwę kolumny</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

		columnChangeName.click(function() {

			self.changeName();
		});
		
		columnAddCard.click(function(event) {

			var cardName = prompt('Wprowadz nazwe karty');
			event.preventDefault();
			//self.createCard(new Card(cardName));

			$.ajax({
				
				url: baseUrl + '/card',
				method: 'POST',
				data: {

					name: cardName, // zgodnie z dokumentacja api mamy przeslac wartosci dla 'name' i 'bootcamp_kanban_column_id'
					bootcamp_kanban_column_id: self.id
				},
				success: function(response){

					var card = new Card(response.id, cardName, self.id);
					self.createCard(card);
				}
			});
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnChangeName)
			.append(columnCardList);
			return column;
		}
	}

Column.prototype = {

	createCard: function(card) {

	  this.element.children('ul').append(card.element);
	},

	deleteColumn: function() {

	    var self = this;

	    $.ajax({

	  		url: baseUrl + '/column/' + self.id,
	  		method: 'DELETE',
	  		success: function(response){

	  		self.element.remove();

	  		}

	    });
	},

	changeName: function() {

		var self = this;
		var newName = prompt('Wprowadź nową nazwę dla tej kolumny');

		$.ajax({

			url: baseUrl + '/column/' + self.id,
			method: 'PUT',
			data: {

				id: self.id,
				name: newName
			},
			
			success: function() {

				self.name = newName;
				self.element.find('.column-title').text(newName);
			}
		});
	}

	
};