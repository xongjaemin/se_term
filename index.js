const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

const getHtml = async() => {
    try{
        return await axios({
            url: "https://www.ppomppu.co.kr/zboard/zboard.php?id=coupon",
            method: "GET",
            responseType: "arraybuffer"
        });
    }catch(error){
        console.error(error);
    }
};

const parsing = async()=>{
    const html = await getHtml();
    
    const $ = cheerio.load(iconv.decode(html.data,'EUC-KR'));
    const $articleList = $(".list0");
    const $articleList2 = $(".list1");
    let articles = [];
    $articleList.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if(title.includes('네이버페이'))
            articles.push(title);
    })
    $articleList2.each((idx, node) => {
        const title = $(node).find('.list_title').text().toString();
        if(title.includes('네이버페이'))
            articles.push(title);
    })

    console.log(articles);
}

parsing();
