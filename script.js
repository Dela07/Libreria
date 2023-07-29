$(document).ready(function () {
  // Agregar el div con la clase "categoria_container"
  $('.categoria_container').html('<div id="categoria"></div>');

  // Función para obtener los detalles de un libro por su ID y mostrarlos en el div "container_libros"
  function showBookDetails(id) {
    $.ajax({
      url: 'https://www.etnassoft.com/api/v1/get/?id=' + id,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        $('.container_libros').empty();
        const bookDetailsDiv = $('<div>').addClass('book_details_container');

        const idElement = $('<p>').text('ID: ' + data[0].ID);
        const titleElement = $('<h2>').text(data[0].title);
        const authorElement = $('<p>').text('Autor: ' + data[0].author);
        const contentElement = $('<p>').text(data[0].content);
        const publisherElement = $('<p>').text('Editor: ' + data[0].publisher);
        const publisherDateElement = $('<p>').text('Fecha de publicación: ' + data[0].publisher_date);
        const pagesElement = $('<p>').text('Páginas: ' + data[0].pages);
        const languageElement = $('<p>').text('Idioma: ' + data[0].language);

        const urlDetailsElement = $('<a>').attr('href', data[0].url_details).text('Ver detalles completos');
        const urlDownloadElement = $('<a>').attr('href', data[0].url_download).text('Descargar libro');

        const coverImage = $('<img>').attr('src', data[0].cover).attr('alt', 'portada');
        const thumbnailImage = $('<img>').attr('src', data[0].thumbnail).attr('alt', 'thumbnail');

        bookDetailsDiv.append(
          idElement,
          titleElement,
          authorElement,
          contentElement,
          publisherElement,
          publisherDateElement,
          pagesElement,
          languageElement,
          urlDetailsElement,
          urlDownloadElement,
          coverImage,
          thumbnailImage
        );

        $('.container_libros').append(bookDetailsDiv);
      }
    });
  }

  // Obtener los libros más vistos 
  function showMostViewedBooks() {
    $.ajax({
      url: 'https://www.etnassoft.com/api/v1/get/?criteria=most_viewed',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        // Limpiar el contenido actual y mostrar los libros más vistos 
        $('.container_libros').empty();
        for (let i = 0; i < data.length; i++) {
          const book = data[i];
          const bookDiv = $('<div>').addClass('book_container').data('id', book.ID); // Agregar data-id con el ID del libro
          const title = $('<h4>').text(book.title);
          const image = $('<img>').attr('src', book.cover).attr('alt', 'portada');

          bookDiv.append(title, image);
          $('.container_libros').append(bookDiv);
        }

        // Agregar el evento click a cada libro para mostrar sus detalles
        $('.book_container').click(function () {
          const bookId = $(this).data('id');
          showBookDetails(bookId);
        });
      }
    });
  }

  // Mostrar los libros más vistos al cargar la página
  showMostViewedBooks();

  // Obtener las categorías de libros existentes y crear botones
  $.ajax({
    url: 'https://www.etnassoft.com/api/v1/get/?get_categories=all',
    type: 'GET',
    dataType: 'json',
    success: function (categoriesData) {
      const categoriesList = $('<ul>').addClass('categories_list');
      for (let i = 0; i < categoriesData.length; i++) {
        const category = categoriesData[i];
        const categoryName = category.name;
        const categoryButton = $('<button>').addClass('category_button').text(categoryName);

        categoryButton.click(function () {
          // Obtener los libros de la categoría al hacer clic en el botón
          $.ajax({
            url: 'https://www.etnassoft.com/api/v1/get/?category_id=' + category.category_id,
            type: 'GET',
            dataType: 'json',
            success: function (booksData) {
              // Limpiar el contenido actual y mostrar los libros de la categoría
              $('.container_libros').empty();
              for (let j = 0; j < booksData.length; j++) {
                const book = booksData[j];
                const bookDiv = $('<div>').addClass('book_container').data('id', book.ID); 
                const title = $('<h4>').text(book.title);
                const image = $('<img>').attr('src', book.cover).attr('alt', 'portada');

                bookDiv.append(title, image);
                $('.container_libros').append(bookDiv);
              }

              // Agregar el evento click a cada libro para mostrar sus detalles
              $('.book_container').click(function () {
                const bookId = $(this).data('id');
                showBookDetails(bookId);
              });
            }
          });
        });

        const listItem = $('<li>').append(categoryButton);
        categoriesList.append(listItem);
      }

      $('.categoria_container').append(categoriesList);
    }
  });

  // buscar
  $('#search_input').keypress(function (event) {
    if (event.which === 13) { 
      event.preventDefault();
      const searchTerm = $('#search_input').val();
      searchBooksByName(searchTerm);
    }
  });

  // Función para buscar libros por nombre
  function searchBooksByName(searchTerm) {
    $.ajax({
      url: 'https://www.etnassoft.com/api/v1/get/?keyword=' + searchTerm,
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        $('.container_libros').empty();
        for (let i = 0; i < data.length; i++) {
          const book = data[i];
          const bookDiv = $('<div>').addClass('book_container').data('id', book.ID);
          const title = $('<h4>').text(book.title);
          const image = $('<img>').attr('src', book.cover).attr('alt', 'portada');

          bookDiv.append(title, image);
          $('.container_libros').append(bookDiv);
        }

        // Agregar el evento click a cada libro para mostrar sus detalles
        $('.book_container').click(function () {
          const bookId = $(this).data('id');
          showBookDetails(bookId);
        });
      }
    });
  }
});