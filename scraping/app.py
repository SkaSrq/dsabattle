from urllib import request
from flask import Flask, jsonify, request
from datetime import datetime
import time
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

app = Flask(__name__)


@app.route('/leetcode/<slug>', methods=['POST'])
def hello(slug):
    # DRIVER_PATH = "/usr/local/bin/chromedriver"
    DRIVER_PATH = '/Users/shariqueaman/Downloads/chromedriver105'

    # print(f'checking coupon for {row}')
    chrome_options = Options()
    chrome_options.headless = True
    chrome_options.add_argument("--window-size=1920,1200")
    driver = webdriver.Chrome(options=chrome_options,
                              executable_path=DRIVER_PATH)
    req = request.json
    print(req)
    print(slug)

    list = []
    print(req)
    # for question in req:
    # # print()
    #     driver.get("https://leetcode.com/problems/"+question.get('titleSlug'))
    #     content = {'title': question.get('title'), "titleSlug": question.get('titleSlug'), "questionId": question.get(
    #         'questionId'), "difficulty": question.get('difficulty'), "categoryTitle": question.get('categoryTitle')}
    #     content.update()
    #     time.sleep(3)
    #     questionHtml = driver.find_element(
    #         by=By.CSS_SELECTOR, value='.description__24sA').get_attribute('innerHTML')
    #     # print(questionHtml)
    #     content['questionHtml'] = questionHtml
    #     # list.append(content)

    driver.get("https://leetcode.com/problems/"+slug)
    time.sleep(1)
    # questionHtml = driver.find_element(
    #     by=By.CSS_SELECTOR, value='.description__24sA').get_attribute('innerHTML')

    questionName = driver.find_element(
        by=By.CSS_SELECTOR, value='.css-101rr4k').get_attribute('innerHTML')
    print(questionName)
    questionHtml = driver.find_element(
        by=By.CSS_SELECTOR, value='.content__u3I1.question-content__JfgR').get_attribute('innerHTML')
    # print(questionHtml)
    # content['questionHtml'] = questionHtml
    return questionName+questionHtml
