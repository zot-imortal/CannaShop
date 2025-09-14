

def addNumber():
  number = int(input("Enter a number: "))
  if number == 0:
   print("we are done")
  else:
    print ("next number")
    addNumber()#we have error here because we forgot to call the function

addNumber()