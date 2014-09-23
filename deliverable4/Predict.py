import numpy as np 
import matplotlib.pyplot as plt 
from sklearn import datasets

iris = datasets.load_iris()

# print iris.data[:,0:2]
# print iris.target

trainX = iris.data[::2, 0:2]
trainY = iris.target[::2]

plt.figure()
# x = iris.data[:,0] #for part 9
# y = iris.data[:,1]
x = trainX[:,0]
y = trainX[:,1]
plt.scatter(x,y,c = trainY)
plt.show()


# print trainX
# print iris.data