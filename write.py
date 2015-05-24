
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

games = {}
for i in range(len(date_sum)):
	if date_sum[i] not in games:
		games[date_sum[i]] = [0, 0]

	games[date_sum[i]][0] += int(win[i])
	games[date_sum[i]][1] += int(lost[i])

data = []

for key, val in games.iteritems():
	data.append((key, val[0], val[1]))

data = sorted(data, key = lambda x : int(x[0][0:2]) + 31 * int(x[0][3:5]) + 31 * 12 * int(x[0][6:]))

n=len(data)
f = open("data.csv", "w")
for i in range(n):
	f.write("{},{},{}\n".format(str(data[i][0]), data[i][1], data[i][2]))

f.close()