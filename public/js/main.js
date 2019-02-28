$(document).ready(function(){
    $('.deleteBook').on('click', deleteBook);
});

function deleteBook(){
   let con = confirm('Are you sure?');

   if(con){
       $.ajax({
        type: 'DELETE',
        url: '/delete/'+$(this).data('id')
       }).done(function(response){
            window.location.replace('/');
       });
   } else {
       return false;
   }
}