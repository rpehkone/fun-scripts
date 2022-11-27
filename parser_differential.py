#!/usr/bin/python3
from termcolor import colored
import random
import os

def binary_colordiff(file1, file2):
	A = open(file1, "rb").read()
	B = open(file2, "rb").read()
	app = []
	tmp = []
	def add_tmp():
		nonlocal app, tmp
		app.append("|  ")
		app += tmp
		tmp = []
	for i in range(max(len(A), len(B))):
		if i % 8 == 0 and i != 0:
			app.append(" ")
			tmp.append(" ")
		if i % 0x10 == 0:
			if i != 0:
				add_tmp()
				app.append("\n")
			app.append("%8X : " % i)
		dA = ("%02X" % A[i]) if i < len(A) else "--"
		dB = ("%02X" % B[i]) if i < len(B) else "--"
		if dA != dB:
			app.append(colored(dA, 'green')+' ')
			tmp.append(colored(dB, 'green')+' ')
		else:
			app.append(dA+' ')
			tmp.append(dB+' ')
	app.append(' ')
	add_tmp()
	print(''.join(app))

def flip_byte(in_bytes):
	i = random.randint(0, len(in_bytes))
	c = random.randint(0, 0xff)
	c = c.to_bytes(1, 'big')
	return in_bytes[:i] + c + in_bytes[i + 1:]

def compare(file1, file2):
	with open(file1) as f1, open(file2) as f2:
			return f1.read()==f2.read()

def check_output():
	os.system("(./licence_fuzz; ./licence_fuzz wrong_password; ./licence_fuzz password) > fuzz_out")
	return compare("orig_out", "fuzz_out")

def check_gdb():
	os.system("echo disassemble -n main | lldb licence_fuzz > gdb_fuzz_out")
	return compare("gdb_orig_out", "gdb_fuzz_out")

def copy_binary():
	os.system("rm -rf licence_fuzz")
	os.system("cp licence licence_fuzz")
	with open("licence", "rb") as orig, open("licence_fuzz", "wb") as new:
		new.write(flip_byte(orig.read()))

os.system("gcc parser_differential_licence.c -o licence")
os.system("cp licence licence_original")
os.system("(./licence; ./licence wrong_password; ./licence password) > orig_out")
os.system("echo disassemble -n main | lldb licence > gdb_orig_out")

#if there is a change in main function, and no segv there will be a diff
#better implementation would be to find single byte diffs and save those programs,
#then at end add those programs together while still comparing output

diffs_found = 0
while True:
	copy_binary()
	if check_output() and not check_gdb():
		os.system("cat gdb_fuzz_out")
		os.system("cp licence_fuzz licence")
		diffs_found += 1
		if diffs_found == 100:
			binary_colordiff("licence", "licence_original")
			os.system("hexdump -C licence_original > binary1.txt")
			os.system("hexdump -C licence > binary2.txt")
			os.system("wdiff binary1.txt binary2.txt | colordiff")
			os.system("rm licence licence_original licence_fuzz binary1.txt binary2.txt fuzz_out orig_out gdb_fuzz_out gdb_orig_out")
			exit()
