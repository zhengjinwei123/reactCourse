#coding=utf-8
__author__ = 'zhengjinwei'

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from pymongo import MongoClient
import stack

class MongoUtils:
    def __init__(self,host,port=None):
        if(port is None):
            port = 27017
        else:
            port = int(port)

        print(host)
        self.conn = MongoClient(host,port)
        self.database = None
        self.set = None

    def db(self,dbName):
        self.database = self.conn[dbName]

    def collection(self,collection):
        if self.database is None:
            stack.throw_error("please call db(dbName) first")
        self.set = self.database[collection]
        return self.set
