import numpy as np
import pickle
from sklearn import neighbors, datasets

def loadGesture(fileName):
	name = "userData/" + fileName + ".p"
	f = open(name,"r") # Open the file
	data = pickle.load(f)
	f.close()
	return data

# Load in all of the data! Super messy! Yay! ----------------------------------

train0  = loadGesture("Bongard_train0")
test0    = loadGesture("Bongard_test0")

train1  = loadGesture("Bongard_train1")
test1    = loadGesture("Bongard_test1")

train2  = loadGesture("Bongard_train2")
test2    = loadGesture("Bongard_test2")

train3  = loadGesture("Bishop_train3")
test3    = loadGesture("Bishop_test3")

train4  = loadGesture("Bishop_train4")
test4    = loadGesture("Bishop_test4")

train5  = loadGesture("train5")
test5    = loadGesture("test5")

train6  = loadGesture("Buckingham_train6")
test6    = loadGesture("Buckingham_test6")

train7  = loadGesture("Bongard_train7")
test7    = loadGesture("Bongard_test7")

train8  = loadGesture("train8")
test8    = loadGesture("test8")

train9  = loadGesture("Sullivan_train9")
test9    = loadGesture("Sullivan_test9")

# ------------------------------------------------------------------------------------------------

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

train0  = CenterData(ReduceData(train0))
test0    = CenterData(ReduceData(test0))

train1  = CenterData(ReduceData(train1))
test1    = CenterData(ReduceData(test1))

train2  = CenterData(ReduceData(train2))
test2    = CenterData(ReduceData(test2))

train3  = CenterData(ReduceData(train3))
test3    = CenterData(ReduceData(test3))

train4  = CenterData(ReduceData(train4))
test4    = CenterData(ReduceData(test4))

train5  = CenterData(ReduceData(train5))
test5    = CenterData(ReduceData(test5))

train6  = CenterData(ReduceData(train6))
test6    = CenterData(ReduceData(test6))

train7  = CenterData(ReduceData(train7))
test7    = CenterData(ReduceData(test7))

train8  = CenterData(ReduceData(train8))
test8    = CenterData(ReduceData(test8))

train9  = CenterData(ReduceData(train9))
test9    = CenterData(ReduceData(test9))


def ReshapeData(set0, set1, set2, set3, set4, set5, set6, set7, set8, set9):
	X = np.zeros((10000,5* 2 *3), dtype = "f") #Changed the 2000 to 3000
	Y = np.zeros(10000, dtype = "f" )        #Empty array for ID
	for i in range(1000):
		n = 0
		for j in range(5):
			for k in range(2):
				for m in range(3):
					X[i,n]          = set0[j,k,m,i] #Transform train5
					Y[i]                = 0

					X[i+1000,n] = set1[j,k,m,i]
					Y[i+1000]       = 1

					X[i+2000,n] = set2[j,k,m,i]
					Y[i+2000]       = 2

					X[i+3000,n] = set3[j,k,m,i]
					Y[i+3000]       = 3

					X[i+4000,n] = set4[j,k,m,i]
					Y[i+4000]       = 4

					X[i+5000,n] = set5[j,k,m,i]
					Y[i+5000]       = 5

					X[i+6000,n] = set6[j,k,m,i]
					Y[i+6000]       = 6

					X[i+7000,n] = set7[j,k,m,i]
					Y[i+7000]       = 7

					X[i+8000,n] = set8[j,k,m,i]
					Y[i+8000]       = 8

					X[i+9000,n] = set9[j,k,m,i]
					Y[i+9000]       = 9

					n += 1
	return (X,Y)

trainX,trainY = ReshapeData(train0, train1,train2,train3,train4,train5,train6, train7, train8, train9)
testX,testY    = ReshapeData(  test0,  test1,  test2,  test3 ,test4,  test5,  test6,   test7,   test8,  test9 )

clf = neighbors.KNeighborsClassifier(15) #Create KNN classifier
clf.fit(trainX,trainY)					 #Train it

numCorrect = 0
for i in range(2000):
	prediction = int( clf.predict( testX[i,:] ) )

	if (prediction == testY[i]):
		numCorrect += 1

percentCorrect = float(numCorrect)/ 2000.00
print percentCorrect

pickle.dump(clf, open("userData/classifier.p", "wb"))
