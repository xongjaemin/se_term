const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
//add module 'request'
const request = require("request");

const DomParser = require('dom-parser');
const parser = new DomParser();

const firstUrl = "https://www.ppomppu.co.kr/zboard/zboard.php?id=coupon"

let linkJson = [];

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

const hrefParsing = async(title, href) => {
    let linkList = [];
    let hrefBody = await getContent(href);
    let $ = cheerio.load(iconv.decode(hrefBody.data, 'EUC-KR'));

    let boardContent = $(".board-contents a").text().toString();

    boardContent = boardContent.substring(boardContent.indexOf('http'));
    

    while(boardContent.indexOf('http') != -1){
        temp = boardContent.substring(5); //'https' 빼줌

        if(temp.indexOf('http') != -1){
            linkList.push('https' + temp.substring(0, temp.indexOf('http')));
        }
        else{
            linkList.push(boardContent);
        }
        temp = temp.substring(temp.indexOf('http'));

        boardContent = temp;
    }

    linkJson.push({title: title, links: linkList});

    console.log(linkJson);
}

const parsing = async () => {
    let html = await getHtml();

    let $ = cheerio.load(iconv.decode(html.data, 'EUC-KR'));
    const $articleList = $(".list0");
    const $articleList2 = $(".list1");
    
    let articles = [];
    let hrefs = [];

    $articleList.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if (title.includes('네이버페이')) {
            articles.push(title);

            let href = $(node).find('.list_vspace a').toString();
            href = href.substring(href.indexOf('</a>') + 4,);
            href = "www.ppomppu.co.kr/zboard/" + href.substring(9, href.indexOf('>') - 1).replaceAll("&amp;", "&");

            hrefs.push(href);

            href = "https://" + href;

            hrefParsing(title, href);
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

            hrefParsing(title, href);

        }
    })

    console.log(articles);
    console.log(hrefs);
}

parsing();