using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FollowCam : MonoBehaviour {

    public Transform target;

    public float damping = 0.05f;

    protected Vector3 velocity;
    public Vector3 offset; 

	// Use this for initialization
	void Start () 
    {
        if( target != null )
        {
            offset = transform.position - target.transform.position;
        }
	}
	
    public void LateUpdate()
    {
        if( target != null )
        {
            Vector3 targetPos = target.transform.position + offset;
            targetPos.z = transform.position.z;

            transform.position = Vector3.SmoothDamp( transform.position, targetPos, ref velocity, damping ); 
        }
    }
	
}
