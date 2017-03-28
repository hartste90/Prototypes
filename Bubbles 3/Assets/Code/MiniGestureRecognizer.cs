using System;
using System.Collections;
using UnityEngine;

public class MiniGestureRecognizer : MonoBehaviour 
{ 
     private bool swiping = false;
     private bool eventSent = false;
     private Vector2 lastPosition;
     
     void Update () {
         if (Input.touchCount == 0) 
             return;
 
         if (Input.GetTouch(0))
		 {
			 Debug.Log("Somethin");
             if (swiping == false)
			 {
                 swiping = true;
                 lastPosition = Input.GetTouch(0).position;
                 return;
             }
             else{
             	Vector2 direction = Input.GetTouch(0).position - lastPosition;
				if (Mathf.Abs(direction.x) > Mathf.Abs(direction.y))
				{
					if (direction.x > 0) 
						Debug.Log("Right");
					else
						Debug.Log("Left");                         
				}
				else
				{
					if (direction.y > 0)
					Debug.Log("Up");                            
					else
					Debug.Log("Down");                         
				}
			}
		
    	}
         else{
             swiping = false;
             eventSent = false;
         }
     }
 }