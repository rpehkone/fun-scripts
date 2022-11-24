import datetime
import time

print("\33[0;49;32m")#green

birth = 2000
life_expectency = 80#years
dead = datetime.datetime(birth + life_expectency,1,1,0,0,0,0)

while True:
	now = datetime.datetime.now()
	countdown = dead - now

	number_of_days = int(countdown.days)
	years = int(number_of_days / 365)
	months = int((number_of_days - years * 365) / 30)
	days = (number_of_days - years * 365 - months*30)
	min, sec = divmod(countdown.seconds, 60)
	hour, min = divmod(min, 60)

	out = " "
	out += str(years).zfill(2) + ":"
	out += str(months).zfill(2) + ":"
	out += str(days).zfill(2) + ":"
	out += str(hour).zfill(2) + ":"
	out += str(min).zfill(2) + ":"
	out += str(sec).zfill(2)
	print(out, end="\r", flush=True)
	time.sleep(1)
