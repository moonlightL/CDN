function initComment() {
    $(".praise").on("click",function () {
        let that = this;
        let id = $(this).data("id");
        let key = "dynamic-hasPrize" + id;
        if (sessionStorage.getItem(key)) {
            layer.msg("已点赞");
            return;
        }

        $.post("/praiseDynamic/" + id, null, function (resp) {
            if (resp.success) {
                $(that).find(".praise-num").text(resp.data);
                $(that).find(".fa").css("color", "red");
                sessionStorage.setItem(key, "y");
            }
        },"json");

    });
}