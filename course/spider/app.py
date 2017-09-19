#coding=utf-8
__author__ = 'zhengjinwei'

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from utils import mongo
import settings
from utils import spider
from utils import stack

m = mongo.MongoUtils(settings.cfg["mongo"]["host"],settings.cfg["mongo"]["port"])
m.db("db_course")
m.collection("subjects").ensure_index('grade', unique=False)
# m.collection("subjects").insert({"name":"zhangsan","age":18})

mySpider = spider.Spider()
# 小学题库网址
url = settings.cfg['url']
mySpider.get(url)
matchDivList = mySpider.match('''.*?<div class="tk-menu">(.*?)<div class="tk-con">''')
if(len(matchDivList) <= 0):
    pass
else:
    strTarget = matchDivList[0]
    mySpider.data(strTarget)
    # print(strTarget)
    error = None
    dataList = []
    try:
        titles = mySpider.match('''<h3.*?><a href="(.*?)">(.*?)</a><i></i></h3>''')

        for item in titles:
            _data = []
            for i in range(0,len(item)):
                _data.append(item[i])

            dataList.append(_data)

        # print(dataList)
    except Exception,e:
        error = e.message

    if error is not None:
        print("error->"+error)
        exit(1)
    else:
        for i in range(0,len(dataList)):
            classUrl = dataList[i][0]
            className = dataList[i][1]

            mySpider.get(classUrl)

            matchDivList = mySpider.match('''<div class="itembox" id="box\d+">\r\n\t{1,}<h3><a href=".*?".*?><i class="zsd-i\d+"></i>.*?</a></h3>\r\n\t{1,}<dl class="clearfix"> <dt><a href="(.*?)" target="_blank" title=".*?"><img src="(.*?)" [^\r\n].*?</dl>\r\n\r\n\t{1,}<ul class="ft14">\r\n\t{1,}<li>[^\r\n]*?</a></li>\r\n\t{0,}<li>[^\r\n].*?</a></li>\r\n\r\n\t{1,}</ul>\r\n\t{1,}</div>''')

            subjectList = []
            if(len(matchDivList) <= 0):
                pass
            else:
                count = len(matchDivList)
                for j in range(0,count):
                    detailUrl = matchDivList[j][0]
                    titleImg = matchDivList[j][1]
                    mySpider.get(detailUrl)
                    matchImgList = mySpider.match('''<img alt="" src="(.*?)" style=".*?" />''')
                    if(len(matchImgList) == 0):
                        pass
                    else:
                        for k in range(0,len(matchImgList)):
                            print(className+"----"+matchImgList[k])
                            m.collection("subjects").insert({
                                "grade": className.decode('gbk'),
                                "url": matchImgList[k]
                            })







