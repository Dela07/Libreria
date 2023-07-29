// Función para guardar un libro en el almacenamiento local
function saveBook(bookId) {
    let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    if (!savedBooks.includes(bookId)) {
      savedBooks.push(bookId);
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    }
  }
  
  // Función para eliminar un libro del almacenamiento local
  function deleteBook(bookId) {
    let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    const index = savedBooks.indexOf(bookId);
    if (index > -1) {
      savedBooks.splice(index, 1);
      localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    }
  }
  
  // Agregar el evento click al botón "Guardar" y "Eliminar"
  $(document).on('click', '.save_button, .delete_button', function () {
    const bookId = $(this).parent().data('id');
    if ($(this).hasClass('save_button')) {
      saveBook(bookId);
      $(this).removeClass('save_button').addClass('delete_button').text('Eliminar');
    } else {
      deleteBook(bookId);
      $(this).removeClass('delete_button').addClass('save_button').text('Guardar');
    }
  });