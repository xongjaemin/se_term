const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const DomParser = require('dom-parser');
const parser = new DomParser();

const firstUrl = "https://www.ppomppu.co.kr/zboard/zboard.php?id=coupon"

const getHtml = async() => {
    try{
        return await axios({
            url: firstUrl,
            method: "GET",
            responseType: "arraybuffer"
        });
    }catch(error){
        console.error(error);
    }
};

const getContent = async(link) => {
    try{
        return await axios({
            url: link,
            method: "GET",
            responseType: "arraybuffer"
        });
    }catch(error){
        console.error(error);
    }
};

const parsing = async()=>{
    const html = await getHtml();
    //getHref();

    const $ = cheerio.load(iconv.decode(html.data,'EUC-KR'));
    const $articleList = $(".list0");
    const $articleList2 = $(".list1");

    let articles = [];
    let hrefs = [];
    $articleList.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if(title.includes('네이버페이')){
            articles.push(title);

            let href = $(node).find('.list_vspace a').toString();
            href = href.substring(href.indexOf('</a>')+4,);
            href = "www.ppomppu.co.kr/zboard/" + href.substring(9, href.indexOf('>')-1).replaceAll("&amp;", "&");
            
            hrefs.push(href);
        }
    })
    $articleList2.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if(title.includes('네이버페이')){
            articles.push(title);

            let href = $(node).find('.list_vspace a').toString();
            href = href.substring(href.indexOf('</a>')+4,);
            href = "www.ppomppu.co.kr/zboard/" + href.substring(9, href.indexOf('>')-1).replaceAll("&amp;", "&");
            
            hrefs.push(href);
        }
    })

    console.log(articles);
    console.log(hrefs);
}

parsing();