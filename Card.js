// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;
	this.columnId = columnId;
	this.id = id;
	this.name = name || 'Brak nazwy.';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardEditBtn = $('<button class="card-edit">Edit</button>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});

		cardEditBtn.click(function() {

			self.editCard();
		});



		
		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription)
			.append(cardEditBtn);
		return card;
	}
}
Card.prototype = {

	removeCard: function() {

		var self = this;

		$.ajax({

			url: baseUrl + '/card/' + self.id,
			method: 'DELETE',
			success: function() {

				self.element.remove();
			}

		});	  
	},

	editCard: function() {

		var self = this;
		var newCardName = prompt('Zmień zawartość karty:');

		$.ajax({

			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {

				id: self.id,
				name: newCardName,
				bootcamp_kanban_column_id: self.columnId
			},

			success: function() {

				self.name = newCardName;
				self.element.find('.card-description').text(newCardName);
			}
		});	
	}
};