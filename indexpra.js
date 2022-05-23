const request = require("request");
const cheerio = require("cheerio");


finalhrefs =[];

function getData() {
    href = "https://www.ppomppu.co.kr/zboard/view.php?id=coupon&page=1&divpage=13&no=76334"

    request(href, function (err, res, body) {
        $ = cheerio.load(body);
        const bodyList = $("table tr").map(function (i, element) {
            finalhref = String($(element).find('.board-contents'));

            finalhrefs.push(finalhref);
        });
    });

    console.log(finalhrefs);
}

getData();

//È®ÀÎ¿ë js
