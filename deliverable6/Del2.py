import Leap, sys, thread, time, random
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib
import pickle
from sklearn import neighbors, datasets
import numpy as np

clf = pickle.load( open("userData/classifier.p", "rb") ) #Load the classifier
testData = np.zeros((1,30), dtype = "f")	#Initialize an empty vector of the values used by clf

controller = Leap.Controller() #create the controller class

matplotlib.interactive(True)  #initialize a 3d plot
fig = plt.figure( figsize=(12,8) )
ax = fig.add_subplot( 111, projection="3d" )
predictedText = ax.text(-250,-500,-100 , "number", fontsize = 45)
plt.draw()

def CenterData(X):
	allXCoordinates = X[0,::3]
	XmeanValue  = allXCoordinates.mean()
	X[0,::3] = allXCoordinates - XmeanValue

	allYCoordinates = X[0,1::3]
	YmeanValue  = allYCoordinates.mean()
	X[0,1::3] = allYCoordinates - YmeanValue

	allZCoordinates = X[0,2::3]
	ZmeanValue  = allZCoordinates.mean()
	X[0,2::3] = allZCoordinates - ZmeanValue

	return X

 #start infinite loop.
while True:

	frame = controller.frame()
	lines = []

	if (len(frame.hands) > 0):

		hand = frame.hands[0]
		k = 0
		for i in range(5):
			finger = hand.fingers[i]

			for j in range(4):
				if    (j == 0):
					bone = finger.bone(Leap.Bone.TYPE_METACARPAL)
				elif (j == 1):
					bone = finger.bone(Leap.Bone.TYPE_PROXIMAL)
				elif (j == 2):
					bone = finger.bone(Leap.Bone.TYPE_INTERMEDIATE)
				elif (j == 3):
					bone = finger.bone(Leap.Bone.TYPE_DISTAL)

				boneBase = bone.prev_joint
				boneTip = bone.next_joint

				xBase = boneBase[0]
				yBase = boneBase[1]
				zBase = boneBase[2]
				xTip  = boneTip[0]
				yTip  = boneTip[1]
				zTip  = boneTip[2]

				if ((j == 0) | (j ==3)):
					testData[0,k]      = xTip
					testData[0,k+1]  = yTip
					testData[0,k+2] = zTip
					k = k + 3

				lines.append(ax.plot([-xBase,-xTip],[zBase,zTip],[yBase,yTip],"r"))

		testData = CenterData(testData)
		predictedClass = clf.predict(testData)
		predictedNumber =  str(int(predictedClass[0]))
		predictedText.set_text(predictedNumber)

		ax.set_xlim(-260,260)
		ax.set_ylim(0,500)
		ax.set_zlim(0,500)
		ax.view_init(azim=90)
		plt.draw()
		while ( len(lines) > 0 ):
			ln = lines.pop()
			ln.pop(0).remove()
			del ln
			ln = []
