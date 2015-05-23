
import json

f = open("games.json", "r")
games = json.loads(''.join(line for line in f))

date = []
win = []
lost = []

for game in games:
	cur = game['date']
	for c in cur:
		date.append(c)
	cur = game['win']
	for c in cur:
		win.append(c)
	cur = game['lost']
	for c in cur:
		lost.append(c)

f.close()

date_sum = []
for dat in date:
	p = dat[:10]
	date_sum.append(p[3:5]+'/'+p[0:2]+'/'+p[6:10])
n=len(date)
f = open("data.csv", "w")
for i in range(n):
	f.write("{},{},{}\n".format(str(date_sum[n-i-1]), win[n-i-1], lost[n-i-1]))

f.close()