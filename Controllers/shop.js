$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault(); // מניעת הפעולה הרגילה של שליחת הטופס
        var searchQuery = $("#searchInput").val();

        $.get(`/search?q=${searchQuery}`, function (data) {
            // טפל בנתונים שחוזרים מהשרת (לדוגמה, עדכן את DOM עם תוצאות החיפוש)
            console.log(data); // לצורך בדיקה, ניתן להדפיס את הנתונים לקונסול
            $("#searchResultsContainer").html(data); // הצג את תוצאות החיפוש בתוך האלמנט שיש לו id="searchResultsContainer"
        });
    });
});
