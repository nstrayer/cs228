import numpy as np
from sklearn import neighbors, datasets

def loadGesture(fileName):
	name = "userData/" + fileName + ".dat" 
	f = open(name,"r") # Open the file
	data = np.load(f)
	f.close()
	return data

train5 = loadGesture("train5")
test5  = loadGesture("test5")
train8 = loadGesture("train8")
test8  = loadGesture("test8")

#First result  = 0.7685
#Second result = 0.956
#Third result  = 0.9835

def ReduceData(X):
	X = np.delete(X,1,1) #delete first middle joint of finger
	X = np.delete(X,1,1) #delete second middle joint
	X = np.delete(X,0,2) #Delete the info on the base of the 
	X = np.delete(X,0,2) #bones, each call of np.delete takes
	X = np.delete(X,0,2) #away a coordinate, x->y->z of base.
	return X

def CenterData(X):
	allXCoordinates = X[:,:,0,:]
	XmeanValue  = allXCoordinates.mean()
	X[:,:,0,:] = allXCoordinates - XmeanValue

	allYCoordinates = X[:,:,1,:]
	YmeanValue  = allYCoordinates.mean()
	X[:,:,1,:] = allYCoordinates - YmeanValue  

	allZCoordinates = X[:,:,2,:]
	ZmeanValue  = allZCoordinates.mean()
	X[:,:,2,:] = allZCoordinates - ZmeanValue

	return X


def ReshapeData(set1, set2):
	X = np.zeros((2000,5*2*3), dtype = "f") #Make empty matrix to dump transform into
	Y = np.zeros(2000, dtype = "f" )        #Empty array for ID
	for i in range(1000):
		n = 0
		for j in range(5):
			for k in range(2):
				for m in range(3):
					X[i,n]      = set1[j,k,m,i] #Transform train5
					Y[i]        = 0             #Kinda silly but ok
					X[i+1000,n] = set2[j,k,m,i] #Transform train8
					Y[i+1000]   = 1             #1 = 8, because math
					n += 1
	return (X,Y)

train5 = CenterData(ReduceData(train5))
train8 = CenterData(ReduceData(train8))
test5  = CenterData(ReduceData(test5))
test8  = CenterData(ReduceData(test8))

trainX,trainY = ReshapeData(train5, train8) #Call Reshape on Reduced data
testX,testY   = ReshapeData(test5 , test8)

clf = neighbors.KNeighborsClassifier(15) #Create KNN classifier
clf.fit(trainX,trainY)					 #Train it

numCorrect = 0
for i in range(2000):
	prediction = int( clf.predict( testX[i,:] ) )
	
	if (prediction == testY[i]):
		numCorrect += 1

percentCorrect = float(numCorrect)/ 2000.00
print percentCorrect
# print trainX
# print trainX.shape
# print trainY
# print trainY.shape
# print testX[1,:]
# print testX.shape