//Custom Client side Javascript for UI Functionality

//Delete Confirmation popup - attach to an HTML element with the class of delete
$('.delete').on('click', () =>{
    return confirm('Are you sure you want to delete this?');
});

//Compare passwords when register
function comparePasswords()
{
    var ps1 = document.getElementById("password").value;
    var ps2 = document.getElementById("confirm").value;
    var psMsg = document.getElementById("psMsg");
    if(ps1 != ps2)
    {
        psMsg.innerHTML = "Passwords do not match";
        psMsg.className = "text-danger";
        return false;
    }
    else
    {
       psMsg.innerHTML = "";
       psMsg.className = "";
       return true;
    }
}