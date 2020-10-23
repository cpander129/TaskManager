//Custom Client side Javascript for UI Functionality

//Delete Confirmation popup - attach to an HTML element with the class of delete
$('.delete').on('click', () =>{
    return confirm('Are you sure you want to delete this?');
});