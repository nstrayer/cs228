import Leap, sys, thread, time, random
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib

controller = Leap.Controller() #create the controller class

matplotlib.interactive(True)  #initialize a 3d plot
fig = plt.figure( figsize=(12,8) )
ax = fig.add_subplot( 111, projection="3d" )
plt.draw()

while True: #start infinite loop. 
	frame = controller.frame()
	lines = []
        if (len(frame.hands) > 0):

            hand = frame.hands[0]
            fingers = hand.fingers

            for finger in hand.fingers: #supa hackey and dumb
                if finger.type() == 1:
                    indexFinger = finger
                else: 
                    pass

            indexDistalPhalange    = indexFinger.bone(Leap.Bone.TYPE_DISTAL) #may need to rename this to ...ofIndexFinger later on...
            indexDistalPhalangeTip = indexDistalPhalange.next_joint
            print "tip of bone: "
            print indexDistalPhalangeTip
            indexDistalPhalangeBase = indexDistalPhalange.prev_joint 
            print "base of bone: " 
            print indexDistalPhalangeBase
            xBase = indexDistalPhalangeBase[0]
            yBase = indexDistalPhalangeBase[1]
            zBase = indexDistalPhalangeBase[2]
            xTip  = indexDistalPhalangeTip[0]
            yTip  = indexDistalPhalangeTip[1]
            zTip  = indexDistalPhalangeTip[2]

            lines.append(ax.plot([xBase,xTip],[yBase,yTip],[zBase,zTip],"r"))
            plt.draw()
