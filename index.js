const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
//add module 'request'
const request = require("request");

const DomParser = require('dom-parser');
const parser = new DomParser();

const firstUrl = "https://www.ppomppu.co.kr/zboard/zboard.php?id=coupon"

const getHtml = async () => {
    try {
        return await axios({
            url: firstUrl,
            method: "GET",
            responseType: "arraybuffer"
        });
    } catch (error) {
        console.error(error);
    }
};

const getContent = async (link) => {
    try {
        return await axios({
            url: link,
            method: "GET",
            responseType: "arraybuffer"
        });
    } catch (error) {
        console.error(error);
    }
};

const parsing = async () => {
    let html = await getHtml();

    let $ = cheerio.load(iconv.decode(html.data, 'EUC-KR'));
    const $articleList = $(".list0");
    const $articleList2 = $(".list1");

    let articles = [];
    let hrefs = [];
    let finalhrefs = [];

    $articleList.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if (title.includes('네이버페이')) {
            articles.push(title);

            let href = $(node).find('.list_vspace a').toString();
            href = href.substring(href.indexOf('</a>') + 4,);
            href = "www.ppomppu.co.kr/zboard/" + href.substring(9, href.indexOf('>') - 1).replaceAll("&amp;", "&");

            hrefs.push(href);

            href = "https://" + href;

            //go to second link
            request(href, function (err, res, body) {
                $ = cheerio.load(body);
                const bodyList = $("table tr").map(function (i, element) {
                    finalhref = String($(element).find('.board-contents'));

                    finalhrefs.push(finalhref);
                });
            });

        }
    })
    $articleList2.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if (title.includes('네이버페이')) {
            articles.push(title);

            let href = $(node).find('.list_vspace a').toString();
            href = href.substring(href.indexOf('</a>') + 4,);
            href = "www.ppomppu.co.kr/zboard/" + href.substring(9, href.indexOf('>') - 1).replaceAll("&amp;", "&");

            hrefs.push(href);

            href = "https://" + href;

            //go to second link
            request(href, function (err, res, body) {
                $ = cheerio.load(body);
                const bodyList = $("table tr").map(function (i, element) {
                    finalhref = String($(element).find('.board-contents'));

                    finalhrefs.push(finalhref);
                });
            });
            //confirmed going into the second link
            //해당 페이지 내의 크롤링에 문제

        }
    })

    console.log(articles);
    console.log(hrefs);
    console.log(finalhrefs);
}

parsing();