document.addEventListener("DOMContentLoaded", function() {
    var filterBtn = document.getElementById('filterBtn');
    var filters = document.getElementById('filters');
    
    filterBtn.addEventListener('click', function() {
        if (filters.style.display === "none" || filters.style.display === "") {
            filters.style.display = "block";
        } else {
            filters.style.display = "none";
        }
       
    });
});
