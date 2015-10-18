import requests
import urllib2
from bs4 import BeautifulSoup
import re

date = []
win = []
lost = []

########################
#	login
########################

r = requests.get("https://www.olimpkz.com")

login = "667310"
passw = "Qwerty123321"

txt = r.text
psid = re.findall(r"(?i)<input type=hidden name='psid' value='([^>]+)'>",txt)
asid = re.findall(r"(?i)<input type=hidden name='asid' value='([^>]+)'>",txt)

keys = {
	'login': login,
	'passw': passw,	
	'psid': psid,
	'asid': asid,
}

r = requests.post("https://www.olimpkz.com/index.php", data=keys)

##########################
#	history page redirect
##########################

r = requests.get("https://www.olimpkz.com/index.php?page=history", cookies=r.cookies)
soup = BeautifulSoup(r.text, 'html5lib')

# parse data using CSS selectors

win_data = soup.select('html > body > table > tbody > tr > td.central_td > center > center > table > tbody > tr > td > b > i')
lost_data = soup.select('html > body > table > tbody > tr > td.central_td > center > center > table > tbody > tr > td > b')
date_data = soup.select('html > body > table > tbody > tr > td.central_td > center > center > table > tbody > tr > td.txtmed')


# populate data

for i in range(len(date_data)):
	date.append(str(date_data[i]))

for i in range(len(win_data)):
	win.append(str(win_data[i]))

for i in range(len(win_data)):
	lost.append(str(lost_data[2 * i + 1]))

























# prettify data
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


print win
print lost
print date