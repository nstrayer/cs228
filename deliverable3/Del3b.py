import numpy as np 

class Reader:
	def __init__(self):

		self.fileName = "userData/gesture.dat"
		self.f = open(self.fileName,"r")
		self.gestureData = np.load(self.f)
		self.f.close()

		self.numberOfGesturesSaved = 0

	def PrintData(self):
		print self.gestureData

reader = Reader()
reader.PrintData()