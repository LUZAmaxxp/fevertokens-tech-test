# fevertokens-tech-test

hello sir , in this documentation i will to show you firstly how i created this project using pnpm

first in terminal i typed the command " corepack enable " followed by this command "corepack prepare pnpm@latest --activate" .

then i cloned my repository FEVERTOKENS-TECH-TEST where i created my next-project under the name " coincatalog " where i ran the commands " " pnpm install " for the dependencies and " pnpm run build "

##################################################### TASK 2 : ALGORITHMICS #################################################################
Python :
for i in range(1, 101):
output = ""
if i % 3 == 0:
output += "Hello"
if i % 5 == 0:
output += "World"
if i % 7 == 0:
output += "Yoo"
if output == "":
output = str(i)
print(output, end=", ")

C :
#include <stdio.h>

int main() {
for (int i = 1; i <= 100; i++) {
int printed = 0;

        if (i % 3 == 0) {
            printf("Hello");
            printed = 1;
        }
        if (i % 5 == 0) {
            printf("World");
            printed = 1;
        }
        if (i % 7 == 0) {
            printf("Yoo");
            printed = 1;
        }

        if (!printed) {
            printf("%d", i);
        }

        if (i < 100) {
            printf(", ");
        }
    }
    printf("\n");
    return 0;

}
##################################################### TASK 3 : LOGIC ########################################################################
