#include <stdio.h>
#include <string.h>

int main(int argc, char **argv)
{
	if (argc != 2)
		printf("give key\n");
	else
	{
		if (strcmp(argv[1], "password"))
			printf("invalid key\n");
		else
			printf("success\n");
	}
	return (0);
}
