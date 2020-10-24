$(function () {

    // 数据分组
    function group(res, len) {
        var buffer_size = 50 * 1024 * 1024;
        var start = 0;
        var group = [];
        while (start < len) {
            var part = res.slice(start, start + buffer_size);
            start += buffer_size;
            group.push(part)
        }
        return group
    }

    var input = document.querySelector('input');
    input.addEventListener('change', function (ev) {
        var file = this.files[0];

        console.log("file is: " + file)
        $.file = file;

        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.addEventListener("load", function (ev) {
            var res = ev.target.result
            console.log(res)
            $.res = res;

            var len = res.byteLength;
            console.log("file size is: ");
            var group_list = group(res, len)
            $.group_list = group_list

            // 计算md5值
            var hash = md5.create();
            hash.update(res);
            var md5_hash = hash.hex();
            $.ajax({
                url: "/session/create",
                type: "POST",
                dataType: "json",

                data: {
                    uid: 2608812381,
                    customer_id: 2608812381,
                    file_name: file.name,
                    file_size: len,
                    file_md5: md5_hash,
                    file_partition_num: group_list.length
                }
            }).done(function (json) {
                var sessionId = json.data;
                console.log("session_id is: " + sessionId);

                var ws = new WebSocket("ws://localhost:9090/ws");
                ws.onopen = function (ev) {
                    console.log("socket is open")
                    ws.send(JSON.stringify({id: 0, command: "bind", session_id: sessionId}))

                    for (var i = 0; i < group_list.length; i++) {
                        var part = group_list[i];
                        $.ajax({
                            url: "/upload?session_id=" + sessionId + "&partition_id=" + (i + 1),
                            type: 'POST',
                            //contentType: "application/octet-stream",
                            //dataType: "blob",
                            processData: false,
                            contentType: false,
                            data: part,
                            success: function (response) {
                                console.log(response)
                            }
                        });

                    }
                };

                ws.onclose = function (ev) {
                    console.log("ws closed")
                };

                ws.onmessage = function (ev) {
                    if (ev.data === "ping") {
                        ws.send("pong");
                    } else {
                        var message = ev.data;
                        var json = JSON.parse(message);
                        if(json.event === "progress") {
                            $("#progress_txt").val("已完成: " + json.data.percent)
                        }
                    }
                }

            });
        });

    });

    $("#upload_btn").click(function () {
        //var md5_val = md5(file);
        //console.log("md5 value is: " + md5_val);

    });


});