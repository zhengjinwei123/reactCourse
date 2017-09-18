#coding=utf-8
__author__ = 'zhengjinwei'

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import re
import uHttp

class Spider:
    def __init__(self,userAgent=None):
        if(userAgent is None):
            userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'

        self.agent = userAgent
        self.headers = {
            'User-Agent':self.agent
        }
        self.content = None

    def get(self,url,decode=False):
        self.content = uHttp.get(url,decode,self.headers)
        return self
    def post(self,url,param):
        self.content = uHttp.post(url,param)
        return self

    def data(self,content=None):
        if content is None:
            return self.content
        else:
            self.content = content

    def match(self,reg=None):
        if(reg is None):
            return self.data()

        if(self.content is None):
            return None
        else:
            pattern = re.compile(reg,re.S)
            items = re.findall(pattern,self.data())
            return items


        