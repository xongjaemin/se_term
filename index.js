const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const DomParser = require('dom-parser');

const express = require('express'); // module to connect server
const router = express.Router();

const firstUrl = "https://www.ppomppu.co.kr/zboard/zboard.php?id=coupon" //site url that have link about naver point
const secondUrl = "https://www.fmkorea.com/freedeal" //site url that have link about naver point

let linkJson = [];

// get html url function to use site number 1
const getHtml = async (targetUrl) => { 
    try {
        return await axios({
            url: targetUrl,
            method: "GET",
            responseType: "arraybuffer"
        });
    } catch (error) {
        console.error(error);
    }
};

// get html url function to use site number 2
const getHtml2 = async (targetUrl) => {
    try{
        return await axios.get(targetUrl);
    } catch(error){
        console.log(error);
    }
}

// get content function to use site number 1
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

// get content function to use site number 2
const getContent2 = async (link) => {
    try{
        return await axios.get(link);
    }catch(error){
        console.log(error);
    }
}

// push link function
const hrefParsing = async(title, href) => {
    let linkList = [];
    let hrefBody = await getContent(href);
    let $ = cheerio.load(iconv.decode(hrefBody.data, 'EUC-KR'));
    let boardContent = $(".board-contents a").text().toString();
    
    boardContent = boardContent.substring(boardContent.indexOf('http'));

    while(boardContent.indexOf('http') != -1){
        temp = boardContent.substring(5);

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

// push link function
const hrefParsing2 = async(title, href) => {
    let linkList = [];
    let hrefBody = await getContent2(href);

    let $ = cheerio.load(hrefBody.data)

    let boardContent = $("article a").text();

    console.log(boardContent);
    
    while(boardContent.indexOf('http') != -1){
        temp = boardContent.substring(5);

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
}

const init2 = async() =>{ // Crawl data from site number 2
    let html = await getHtml2(secondUrl);

    let $ = cheerio.load(html.data);
    const $articleList3 = $(".hotdeal_var8");


    $articleList3.each((idx, node)=>{
        const title = $(node).find('a').text().toString();
        if (title.includes('???????????????')){ // search tag about ???????????????

            title_substr = title.substring(4);
            title_substr = title_substr.slice(0,-4);

            let href = $(node).find('.hotdeal_var8 a').toString();
            href = href.substring(href.indexOf('href')+6, href.indexOf('">'));

            href = "https://www.fmkorea.com" + href

            hrefParsing2(title_substr, href);
        }
    })
}

const init = async () => { // Crawl data from site number 1
    let html = await getHtml(firstUrl);

    let $ = cheerio.load(iconv.decode(html.data, 'EUC-KR'));
    const $articleList = $(".list0");
    const $articleList2 = $(".list1");
    
    let articles = [];
    let hrefs = [];

    $articleList.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if (title.includes('???????????????')) { // serach tag about ???????????????
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
        if (title.includes('???????????????')) {
            articles.push(title);
            let href = $(node).find('.list_vspace a').toString();
            href = href.substring(href.indexOf('</a>') + 4,);
            href = "www.ppomppu.co.kr/zboard/" + href.substring(9, href.indexOf('>') - 1).replaceAll("&amp;", "&");

            hrefs.push(href);
            href = "https://" + href;

            hrefParsing(title, href);

        }
    })

    init2();
}

init();

router.get('/links', (req, res)=>{
    res.send(linkJson);
});

module.exports = router;