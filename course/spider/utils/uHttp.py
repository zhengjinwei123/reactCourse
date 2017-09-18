# coding=utf-8
__author__ = 'zhengjinwei'

import sys

reload(sys)
sys.setdefaultencoding('utf-8')

import urllib2
import requests
import stack


def post(url,postData):
    resp = requests.post(url,data=postData)
    return resp.text

def get(url,decode=False,headerParam=None):
    if headerParam is None:
        stack.throw_error("headerParam is None")
    req = urllib2.Request(url,headers=headerParam)
    resp = urllib2.urlopen(req)
    if(decode == True):
        return resp.read().decode('utf-8')
    else:
        return resp.read()

