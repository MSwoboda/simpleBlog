$('#summernote').summernote({
    tabsize: 2,
    height: 200
});

$("#article-button").on("click", (event) => {
    event.preventDefault();

    let body = $('#summernote').summernote('code');
    let title = $("#article-title").val().trim();

    if (!$("#rwFlag").attr("data-val").trim()) {


        $.ajax({
            method: "POST",
            url: "/api/articles",
            data: {
                title: title,
                body: body,
                author: $("#rwFlag").attr("data-user").trim()
            }
        })
            .then(() => window.location.href = "/");
    } else {

        $.ajax({
            method: "PUT",
            url: "/api/articles/" + $("#rwFlag").attr("data-reference").trim(),
            data: {
                title: title,
                body: body,
                author: $("#rwFlag").attr("data-user").trim()
            }
        })
            .then(() => window.location.href = "/");

    }

})