#coding=utf8
from bs4 import BeautifulSoup

import re
import os

games = []

# for c in range(4,3488):
for c in range(0,1):
	cur_page = str(c+1)
	doc = ""
	print os.path.join("parsed_data",cur_page+".html")
	f = open(os.path.join("parsed_data",cur_page+".html"), "r")
	for line in f:
		doc += line
	doc = doc.replace('center', 'p')
	f.close()
	soup = BeautifulSoup(doc, 'html5lib')
	# f=open('out.txt', 'w')
	# f.write (soup.prettify().encode('utf8'))
	# f.close()

	# data = soup.html.body.find_all('table',recursive=False)[1].tbody.tr.find_all('td',recursive=False)[1].p.p.contents[2].table.tbody.find_all('tr',recursive=False)
	win_data = soup.select('html > body > table > tbody > tr > td.central_td > table > tbody > tr > td > b > i')
	date_data = soup.select('html > body > table > tbody > tr > td.central_td > table > tbody > tr > td.txtmed')
	lost_data = soup.select('html > body > table > tbody > tr > td.central_td > table > tbody > tr > td > b')
	date = []
	win = []
	lost = []

	for i in range(len(date_data)):
		date.append(str(date_data[i]))

	for i in range(len(win_data)):
		win.append(str(win_data[i]))

	for i in range(len(win_data)):
		lost.append(str(lost_data[2 * i + 1]))

	# for i in range(1,len(data)-1):
	# 	date.append(str(data[i].td))
	# 	win.append(str(data[i].find_all('td',recursive=False)[1].b.i))
	# 	lost.append(str(data[i].find_all('td',recursive=False)[2].b))

	ww = []
	for w in date:
		p = re.findall(r'[0-9]{2}.[0-9]{2}.[0-9]{4} [0-9]{2}:[0-9]{2}',w)
		ww.append(p[0])

	date = ww

	ww = []
	for w in win:
		p = re.findall(r'\d+',w)
		ww.append(p[0])

	win = ww

	ww = []
	for w in lost:
		p = re.findall(r'\d+',w)
		ww.append(p[0])

	lost = ww

	# print date
	# print win
	# print lost

	# print len(date)
	# print len(win)
	# print len(lost)

	print c

	games.append({'date':date, 'win':win, 'lost':lost})

import json

f = open("games.json", "w")
f.write(json.dumps(games))
f.close()