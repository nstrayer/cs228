import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib
import time

class Reader:
	def __init__(self):
		
		matplotlib.interactive(True)  # Initialize a 3d plot

		self.lines = []
		self.fig = plt.figure( figsize=(12,8) ) # Make a figure
		self.ax = self.fig.add_subplot( 111, projection="3d" ) # 3d yo.
		self.ax.view_init(azim=90)
		plt.draw()

		self.fileName = "userData/numberOfGesturesSaved.dat"
		self.f = open(self.fileName,"r")
		self.numberOfGesturesSaved = int(self.f.read())
		self.f.close()

	def PrintGesture(self,i):
		fileName = "userData/gesture" + str(i) + ".dat" 
		f = open(fileName,"r") # Open the file
		gestureData = np.load(f)
		f.close()

		#print gestureData # Print ".dat" file. 
		for i in range(5):
			for j in range(4):
				xBase = gestureData[i,j,0] 
				yBase = gestureData[i,j,1] 
				zBase = gestureData[i,j,2]
				xTip  = gestureData[i,j,3] 
				yTip  = gestureData[i,j,4]
				zTip  = gestureData[i,j,5]

				self.lines.append(self.ax.plot([-xBase,-xTip],[zBase,zTip],[yBase,yTip],"b"))
				
			time.sleep(0.5)
		plt.draw()

		while ( len(self.lines) > 0 ): # Get rid of old positions. 
			ln = self.lines.pop()
			ln.pop(0).remove()
			del ln
			ln = []

	def PrintData(self):
		for i in range(self.numberOfGesturesSaved):
			self.PrintGesture(i)

		print self.numberOfGesturesSaved

	def RunForever(self):
		while True: 
			self.PrintData()

reader = Reader()
reader.RunForever()