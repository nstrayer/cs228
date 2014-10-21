import Leap, sys, thread, time, random
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib
import numpy as np

class Deliverable: 
	
	def __init__(self):

		self.controller = Leap.Controller() # Create the controller class

		self.lines = [] # This is where the coordinates of the fingers will go 
		self.numberOfGestures = 1000
		self.gestureIndex = 0 #5-3

		self.gestureData = np.zeros( ( 5,4,6, self.numberOfGestures),dtype = "f") # Make a 3d matrix for storing gesture info #5-4

		self.previousNumberOfHands = 0
		self.currentNumberOfHands = 0

		matplotlib.interactive(True)  # Initialize a 3d plot

		self.fig = plt.figure( figsize=(12,8) ) # Make a figure
		self.ax = self.fig.add_subplot( 111, projection="3d" ) # 3d yo. 

		self.ax.set_xlim(-260,260)
		self.ax.set_ylim(0,500)
		self.ax.set_zlim(0,500)
		self.ax.view_init(azim=90)

		#plt.draw()
	def RecordingIsEnding(self):
		return (self.previousNumberOfHands == 2) & (self.currentNumberOfHands == 1)

	def HandleBone(self,i,j): # Select each bone in turn
		if (j == 0): 
			bone = self.finger.bone(Leap.Bone.TYPE_METACARPAL)
		elif (j == 1): 
			bone = self.finger.bone(Leap.Bone.TYPE_PROXIMAL)
		elif (j == 2): 
			bone = self.finger.bone(Leap.Bone.TYPE_INTERMEDIATE)
		elif (j == 3): 
			bone = self.finger.bone(Leap.Bone.TYPE_DISTAL)

		boneBase = bone.prev_joint 
		boneTip = bone.next_joint

		xBase = boneBase[0] # Get the coordinates of the line corrresponding to that bone. 
		yBase = boneBase[1]
		zBase = boneBase[2]
		xTip  = boneTip[0]
		yTip  = boneTip[1]
		zTip  = boneTip[2]

		if (self.currentNumberOfHands == 1): # If a hand is detected change color and
			lineColor = "r" 		         # line width to indicate recording. 
			lineWidth = 1
		else: 
			lineColor = "g"
			lineWidth = 4

		self.lines.append(self.ax.plot([-xBase,-xTip],[zBase,zTip],[yBase,yTip],lineColor, lw = lineWidth))

		if (self.currentNumberOfHands == 2):  #5-5
			self.gestureData[i,j,0, self.gestureIndex] = xBase
			self.gestureData[i,j,1, self.gestureIndex] = yBase
			self.gestureData[i,j,2, self.gestureIndex] = zBase
			self.gestureData[i,j,3, self.gestureIndex] = xTip
			self.gestureData[i,j,4, self.gestureIndex] = yTip
			self.gestureData[i,j,5, self.gestureIndex] = zTip

	def HandleFinger(self,i):
		
		self.finger = self.hand.fingers[i]

		for j in range(0,4): # select each bone in that hand
			self.HandleBone(i,j)

	def SaveGesture(self):
		fileName = "userData/gesture.dat" # Record the gesture info
		f = open(fileName,"w")
		np.save(f,self.gestureData)
		f.close()

	def HandleHands(self):
		
		self.previousNumberOfHands = self.currentNumberOfHands
		self.currentNumberOfHands  = len(self.frame.hands) # Get how many hands are in the frame. 

		self.hand = self.frame.hands[0]  # Select the first hand seen. 
		
		for i in range(0,5):   # Loop over all fingers on that hand
			self.HandleFinger(i)

		plt.draw() # Draw the lines/fingers for this frame. 
		
		while ( len(self.lines) > 0 ): # Get rid of old positions. 
			ln = self.lines.pop()
			ln.pop(0).remove()
			del ln
			ln = []


		if (self.currentNumberOfHands == 2):
			print "gesture " + str(self.gestureIndex) + " stored."
			self.gestureIndex += 1

			if (self.gestureIndex == self.numberOfGestures) : #5-7
				print(self.gestureData[:,:,:,0]) #5-8
				print(self.gestureData[:,:,:,99])
				self.SaveGesture()
				sys.exit(0)

	def RunOnce(self):

		self.frame = self.controller.frame() # Get the current frame from the leap

		if (len(self.frame.hands) > 0): # See if a hand is in the field of view
			self.HandleHands()
			
	def RunForever(self):
		
		while True:

			self.RunOnce()
			

deliverable = Deliverable() # Initialize the class
deliverable.RunForever() #Call the forever loop. 