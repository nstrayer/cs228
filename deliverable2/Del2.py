import Leap, sys, thread, time, random
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib

controller = Leap.Controller() #create the controller class

matplotlib.interactive(True)  #initialize a 3d plot
fig = plt.figure( figsize=(12,8) )
ax = fig.add_subplot( 111, projection="3d" )
plt.draw()

 #start infinite loop. 
while True:
	
	frame = controller.frame()
	lines = []


	if (len(frame.hands) > 0):

		hand = frame.hands[0]

		for i in range(0,5):
			finger = hand.fingers[i]

			for j in range(0,3):
				if (j == 0):
					bone = finger.bone(Leap.Bone.TYPE_METACARPAL)
				elif (j == 1): 
					bone = finger.bone(Leap.Bone.TYPE_PROXIMAL)
				elif (j == 2): 
					bone = finger.bone(Leap.Bone.TYPE_INTERMEDIATE)
				elif (j == 3): 
					bone = finger.bone(Leap.Bone.TYPE_DISTAL)

				#bone = finger.bone(Leap.Bone.TYPE_DISTAL)
				boneBase = bone.prev_joint
				boneTip = bone.next_joint

				xBase = boneBase[0]
				yBase = boneBase[1]
				zBase = boneBase[2]
				xTip  = boneTip[0]
				yTip  = boneTip[1]
				zTip  = boneTip[2]
				print zTip

				#lines.append(ax.plot([xBase,xTip],[yBase,yTip],[zBase,zTip],"r"))
				lines.append(ax.plot([-xBase,-xTip],[zBase,zTip],[yBase,yTip],"r"))


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







		# fingers = hand.fingers
		
		# for finger in hand.fingers:
		# 	if finger.type() == 1:
		# 		indexFinger = finger
		# 	else:
		# 		pass

		# indexDistalPhalange     = indexFinger.bone(Leap.Bone.TYPE_DISTAL)
		# indexDistalPhalangeTip  = indexDistalPhalange.next_joint
		# indexDistalPhalangeBase = indexDistalPhalange.prev_joint

		# xBase = indexDistalPhalangeBase[0]
		# yBase = indexDistalPhalangeBase[1]
		# zBase = indexDistalPhalangeBase[2]
		# xTip  = indexDistalPhalangeTip[0]
		# yTip  = indexDistalPhalangeTip[1]
		# zTip  = indexDistalPhalangeTip[2]


		# lines.append(ax.plot([xBase,xTip],[yBase,yTip],[zBase,zTip],"r"))
		# plt.draw()
		# while ( len(lines) > 0 ):
		# 	ln = lines.pop()
		# 	ln.pop(0).remove()
		# 	del ln
		# 	ln = []
