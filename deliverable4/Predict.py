import numpy as np 
import matplotlib.pyplot as plt 
from sklearn import neighbors, datasets
iris = datasets.load_iris()


trainX =   iris.data[::2, 1:3]
trainY = iris.target[::2]

testX =   iris.data[1::2, 1:3]
testY = iris.target[1::2]

colors      = np.zeros((3,3), dtype = "f") # Part 16
colors[0,:] = (  1, 0.5, 0.5)
colors[1,:] = (0.5,   1, 0.5)
colors[2,:] = (0.5, 0.5,   1)


clf = neighbors.KNeighborsClassifier(15) # Part 23, set up KNN 
clf.fit(trainX, trainY)                  # and train. 

plt.figure() # 9a

[numItems, numFeatures] = iris.data.shape

for i in range(numItems/2):
	itemClass = int(trainY[i])        # (part 19) Grabs the species ->
	currColor = colors[itemClass, :]  # Uses the colors defined to assign it to a color
	plt.scatter(trainX[i,0], trainX[i,1], facecolor = currColor, s = 50, lw = 2)

numberCorrect = 0

for i in range(numItems/2):
	prediction = int( clf.predict( testX[i,:] ) ) #part 27
	edgeColor  = colors[prediction,:]
	itemClass  = int(testY[i])         # (part 26) 
	currColor  = colors[itemClass, :]
	if (prediction == itemClass):
		numberCorrect += 1

	plt.scatter(testX[i,0], testX[i,1], facecolor = currColor, \
		edgecolor = edgeColor, s = 50, lw = 2)

percentCorrect = (float(numberCorrect)/len(testX)) * 100.00 
print "The algorithm got %.2f percent of the guesses right." % percentCorrect

plt.xlabel("Sepal Width")
plt.ylabel("Petal Length")
plt.title("Iris dataset visualization. Accuracy: %.2f" %percentCorrect)

plt.show()
#plt.savefig("deliverable4Results.png")