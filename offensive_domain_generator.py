import fileinput

words = []
for line in fileinput.input():
	words.append(line)

file = open("tlds.txt")
domains = file.readlines()

for word in words:
	word = word.lower()
	for end in domains:
		end = end.lower()
		if word.endswith(end):
			lenght = len(end)
			if lenght < len(word) - 1:
				res = word[:-lenght] + '.' + end
				print(res.strip())
