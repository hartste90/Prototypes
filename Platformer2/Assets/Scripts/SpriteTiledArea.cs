using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpriteTiledArea : MonoBehaviour {

    public SpriteRenderer tilePrefab;
    public Sprite[] sprites;
    public Vector2 size;

	// Use this for initialization
	void Start () {
        Vector2 tileSize = tilePrefab.bounds.size;
        for( float x = 0; x < size.x; x += tileSize.x )
        {
            for( float y = 0; y < size.y; y += tileSize.y )
            {
                SpriteRenderer rend = Instantiate<SpriteRenderer>( tilePrefab );
                rend.sprite = sprites[ Random.Range( 0, sprites.Length ) ];
                rend.transform.parent = transform;

                float halfwidth = size.x / 2.0f;
                float halfTileWidth = tileSize.x / 2.0f;
                float halfHeight = size.y / 2.0f;
                float halfTileHeight = tileSize.y / 2.0f;
                rend.transform.localPosition = new Vector3( x - (halfwidth + halfTileWidth),
                    y - halfHeight + halfTileHeight, 0);
            }
        }
		
	}
}
