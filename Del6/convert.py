import numpy as np
import pickle
files = ["test5", "train5", "test8", "train8"]

for file in files:
   data = np.load("userData/" + file + ".dat")
   pickle.dump(data, open("userData/" + file + ".p", "wb"))
   print "converted" + file
